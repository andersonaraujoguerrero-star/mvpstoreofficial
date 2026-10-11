require('dotenv').config();
const express = require('express');
const session = require('express-session');
const Database = require('better-sqlite3');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const E = process.env;
const PORT = E.PORT || 3000;
const BASE_URL = (E.BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, '');
const STORE = E.STORE_NAME || 'MVP STORE OFFICIAL';
const ADMINS = (E.ADMIN_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
const PP_BASE = E.PAYPAL_ENV === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

// ---------- carpetas ----------
const DATA = path.join(__dirname, 'data');
const UP_IMG = path.join(DATA, 'images');      // publicas
const UP_FILE = path.join(DATA, 'files');      // privadas (resources .zip)
const UP_REC = path.join(DATA, 'receipts');    // privadas (comprobantes)
[DATA, UP_IMG, UP_FILE, UP_REC].forEach(d => fs.mkdirSync(d, { recursive: true }));

// ---------- base de datos ----------
const db = new Database(path.join(DATA, 'store.db'));
db.pragma('journal_mode = WAL');
db.exec(`
CREATE TABLE IF NOT EXISTS users(
  discord_id TEXT PRIMARY KEY, username TEXT, avatar TEXT, has_logged INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP, last_login TEXT);
CREATE TABLE IF NOT EXISTS products(
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, category TEXT DEFAULT 'scripts',
  version TEXT DEFAULT 'v1.0.0', price REAL DEFAULT 0, image TEXT, file TEXT,
  desc_es TEXT DEFAULT '', desc_pt TEXT DEFAULT '', desc_en TEXT DEFAULT '',
  active INTEGER DEFAULT 1, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS licenses(
  id INTEGER PRIMARY KEY AUTOINCREMENT, discord_id TEXT NOT NULL, product_id INTEGER NOT NULL,
  server_ip TEXT, ip_changed_at TEXT, active INTEGER DEFAULT 1, source TEXT DEFAULT 'purchase',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP, UNIQUE(discord_id, product_id));
CREATE TABLE IF NOT EXISTS orders(
  id INTEGER PRIMARY KEY AUTOINCREMENT, discord_id TEXT NOT NULL, product_id INTEGER NOT NULL,
  method TEXT, status TEXT DEFAULT 'pending', amount REAL, receipt TEXT, paypal_order_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP);
`);

// ---------- app ----------
const app = express();
if (E.TRUST_PROXY) app.set('trust proxy', Number(E.TRUST_PROXY) || 1);
app.use(express.json());
app.use(session({
  secret: E.SESSION_SECRET || crypto.randomBytes(16).toString('hex'),
  resave: false, saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: BASE_URL.startsWith('https'), maxAge: 30 * 864e5 }
}));
app.use('/uploads/images', express.static(UP_IMG, { maxAge: '7d' }));
app.use(express.static(path.join(__dirname, 'public')));

const mk = dir => multer({
  storage: multer.diskStorage({
    destination: dir,
    filename: (_, f, cb) => cb(null, crypto.randomBytes(12).toString('hex') + path.extname(f.originalname).toLowerCase())
  }),
  limits: { fileSize: 200 * 1024 * 1024 }
});
const upProduct = mk(path.join(DATA, 'tmp')); fs.mkdirSync(path.join(DATA, 'tmp'), { recursive: true });
const upReceipt = mk(UP_REC);

const wrap = fn => (req, res) => Promise.resolve(fn(req, res)).catch(e => { console.error(e); res.status(500).json({ error: 'server_error' }); });
const needLogin = (req, res, next) => req.session.user ? next() : res.status(401).json({ error: 'login_required' });
const needAdmin = (req, res, next) => (req.session.user && ADMINS.includes(req.session.user.id)) ? next() : res.status(403).json({ error: 'forbidden' });
const isDiscordId = s => /^\d{15,22}$/.test(String(s || ''));
const cleanIp = ip => String(ip || '').replace('::ffff:', '').trim();
const isIPv4 = s => /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(s);

// ---------- Discord ----------
async function fetchDiscordUser(id) {
  if (!E.DISCORD_BOT_TOKEN) return null;
  try {
    const r = await fetch(`https://discord.com/api/v10/users/${id}`, { headers: { Authorization: `Bot ${E.DISCORD_BOT_TOKEN}` } });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}
async function ensureUser(id) {
  let u = db.prepare('SELECT * FROM users WHERE discord_id=?').get(id);
  if (!u) {
    db.prepare('INSERT INTO users(discord_id) VALUES(?)').run(id);
    u = db.prepare('SELECT * FROM users WHERE discord_id=?').get(id);
  }
  if (!u.username) {
    const d = await fetchDiscordUser(id);
    if (d) db.prepare('UPDATE users SET username=?, avatar=? WHERE discord_id=?').run(d.global_name || d.username, d.avatar, id);
  }
}
async function sendLog(discordId, product, amount, method) {
  if (!E.WEBHOOK_URL) return;
  const embed = {
    title: 'Compra Realizada Exitosamente',
    description: `Nueva compra realizada en **${STORE}**.`,
    color: 0xfacc15,
    fields: [
      { name: 'Cliente', value: `<@${discordId}>` },
      { name: 'Producto(s)', value: `• ${product.name}` },
      { name: 'Total Pagado', value: `$${Number(amount).toFixed(2).replace(/\.00$/, '')} USD` },
      { name: 'Método', value: method || '-' }
    ],
    timestamp: new Date().toISOString()
  };
  if (product.image) embed.image = { url: `${BASE_URL}/uploads/images/${product.image}` };
  try {
    await fetch(E.WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ embeds: [embed] }) });
  } catch (e) { console.error('webhook', e.message); }
}

async function grant(discordId, productId, source) {
  await ensureUser(discordId);
  const ex = db.prepare('SELECT id FROM licenses WHERE discord_id=? AND product_id=?').get(discordId, productId);
  if (ex) db.prepare('UPDATE licenses SET active=1, source=? WHERE id=?').run(source, ex.id);
  else db.prepare('INSERT INTO licenses(discord_id,product_id,source) VALUES(?,?,?)').run(discordId, productId, source);
}

// ---------- auth ----------
app.get('/auth/discord', (req, res) => {
  const state = crypto.randomBytes(12).toString('hex');
  req.session.oauth = state;
  const q = new URLSearchParams({ client_id: E.DISCORD_CLIENT_ID, response_type: 'code', scope: 'identify', redirect_uri: `${BASE_URL}/auth/callback`, state });
  res.redirect(`https://discord.com/oauth2/authorize?${q}`);
});
app.get('/auth/callback', wrap(async (req, res) => {
  const { code, state } = req.query;
  if (!code || state !== req.session.oauth) return res.redirect('/#/products');
  const tr = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ client_id: E.DISCORD_CLIENT_ID, client_secret: E.DISCORD_CLIENT_SECRET, grant_type: 'authorization_code', code, redirect_uri: `${BASE_URL}/auth/callback` })
  });
  const tok = await tr.json();
  if (!tok.access_token) return res.redirect('/#/products');
  const u = await (await fetch('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${tok.access_token}` } })).json();
  db.prepare(`INSERT INTO users(discord_id,username,avatar,has_logged,last_login) VALUES(?,?,?,1,CURRENT_TIMESTAMP)
    ON CONFLICT(discord_id) DO UPDATE SET username=excluded.username, avatar=excluded.avatar, has_logged=1, last_login=CURRENT_TIMESTAMP`)
    .run(u.id, u.global_name || u.username, u.avatar);
  req.session.user = { id: u.id, name: u.global_name || u.username, avatar: u.avatar };
  req.session.save(() => res.redirect('/#/account'));
}));
app.get('/auth/logout', (req, res) => req.session.destroy(() => res.redirect('/')));

app.get('/api/me', (req, res) => {
  const u = req.session.user;
  res.json(u ? { ...u, admin: ADMINS.includes(u.id) } : null);
});
app.get('/api/config', (req, res) => res.json({
  store: STORE, paypalClientId: E.PAYPAL_CLIENT_ID || null,
  usdToDop: Number(E.USD_TO_DOP) || 58, banreserva: E.BANRESERVA_INFO || '', popular: E.POPULAR_INFO || ''
}));

// ---------- productos (publico) ----------
const pubProduct = p => ({ id: p.id, name: p.name, category: p.category, version: p.version, price: p.price, image: p.image, desc_es: p.desc_es, desc_pt: p.desc_pt, desc_en: p.desc_en });
app.get('/api/products', (req, res) => {
  res.json(db.prepare('SELECT * FROM products WHERE active=1 ORDER BY id DESC').all().map(pubProduct));
});

// ---------- area del cliente ----------
app.get('/api/my/licenses', needLogin, (req, res) => {
  const rows = db.prepare(`SELECT l.id, l.server_ip, l.ip_changed_at, l.active, l.created_at, p.id AS product_id, p.name, p.image, p.version, p.category,
    p.desc_es, p.desc_pt, p.desc_en, (p.file IS NOT NULL) AS has_file
    FROM licenses l JOIN products p ON p.id=l.product_id WHERE l.discord_id=? AND l.active=1 ORDER BY l.id DESC`).all(req.session.user.id);
  res.json(rows);
});
app.post('/api/my/licenses/:id/ip', needLogin, (req, res) => {
  const ip = String(req.body.ip || '').trim();
  if (!isIPv4(ip)) return res.status(400).json({ error: 'bad_ip' });
  const l = db.prepare('SELECT * FROM licenses WHERE id=? AND discord_id=? AND active=1').get(req.params.id, req.session.user.id);
  if (!l) return res.status(404).json({ error: 'not_found' });
  // Cambio de IP limitado a 1 vez cada 7 dias (evita que la compartan con varios servidores)
  if (l.server_ip && l.ip_changed_at && Date.now() - new Date(l.ip_changed_at + 'Z').getTime() < 7 * 864e5)
    return res.status(429).json({ error: 'ip_cooldown' });
  db.prepare('UPDATE licenses SET server_ip=?, ip_changed_at=CURRENT_TIMESTAMP WHERE id=?').run(ip, l.id);
  res.json({ ok: true });
});
app.get('/api/download/:productId', needLogin, (req, res) => {
  const l = db.prepare('SELECT 1 FROM licenses WHERE discord_id=? AND product_id=? AND active=1').get(req.session.user.id, req.params.productId);
  if (!l) return res.status(403).json({ error: 'no_license' });
  const p = db.prepare('SELECT * FROM products WHERE id=?').get(req.params.productId);
  if (!p || !p.file) return res.status(404).json({ error: 'no_file' });
  res.download(path.join(UP_FILE, p.file), `${p.name.replace(/[^\w\- ]/g, '')}${path.extname(p.file)}`);
});

// ---------- pagos ----------
app.post('/api/claim/:id', needLogin, wrap(async (req, res) => {
  const p = db.prepare('SELECT * FROM products WHERE id=? AND active=1').get(req.params.id);
  if (!p || p.price > 0) return res.status(400).json({ error: 'not_free' });
  await grant(req.session.user.id, p.id, 'free');
  res.json({ ok: true });
}));

async function ppToken() {
  const r = await fetch(`${PP_BASE}/v1/oauth2/token`, {
    method: 'POST', headers: { Authorization: 'Basic ' + Buffer.from(`${E.PAYPAL_CLIENT_ID}:${E.PAYPAL_SECRET}`).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials'
  });
  return (await r.json()).access_token;
}
app.post('/api/pay/paypal/create', needLogin, wrap(async (req, res) => {
  const p = db.prepare('SELECT * FROM products WHERE id=? AND active=1').get(req.body.productId);
  if (!p || p.price <= 0) return res.status(400).json({ error: 'bad_product' });
  const token = await ppToken();
  const r = await fetch(`${PP_BASE}/v2/checkout/orders`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ intent: 'CAPTURE', purchase_units: [{ description: p.name.slice(0, 120), amount: { currency_code: 'USD', value: p.price.toFixed(2) } }] })
  });
  const o = await r.json();
  if (!o.id) return res.status(502).json({ error: 'paypal_error' });
  db.prepare('INSERT INTO orders(discord_id,product_id,method,status,amount,paypal_order_id) VALUES(?,?,?,?,?,?)')
    .run(req.session.user.id, p.id, 'paypal', 'pending', p.price, o.id);
  res.json({ id: o.id });
}));
app.post('/api/pay/paypal/capture', needLogin, wrap(async (req, res) => {
  const ord = db.prepare('SELECT * FROM orders WHERE paypal_order_id=? AND discord_id=?').get(req.body.orderID, req.session.user.id);
  if (!ord) return res.status(404).json({ error: 'not_found' });
  if (ord.status === 'paid') return res.json({ ok: true });
  const token = await ppToken();
  const r = await fetch(`${PP_BASE}/v2/checkout/orders/${ord.paypal_order_id}/capture`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  const c = await r.json();
  const cap = c.purchase_units?.[0]?.payments?.captures?.[0];
  if (c.status !== 'COMPLETED' || !cap || Math.abs(parseFloat(cap.amount.value) - ord.amount) > 0.01) return res.status(402).json({ error: 'not_completed' });
  db.prepare("UPDATE orders SET status='paid' WHERE id=?").run(ord.id);
  const p = db.prepare('SELECT * FROM products WHERE id=?').get(ord.product_id);
  await grant(ord.discord_id, p.id, 'paypal');
  sendLog(ord.discord_id, p, ord.amount, 'PayPal');
  res.json({ ok: true });
}));

// Banreserva / Popular: transferencia + comprobante, el admin aprueba
app.post('/api/pay/manual', needLogin, upReceipt.single('receipt'), wrap(async (req, res) => {
  const method = req.body.method;
  const p = db.prepare('SELECT * FROM products WHERE id=? AND active=1').get(req.body.productId);
  if (!['banreserva', 'popular'].includes(method) || !p || p.price <= 0) return res.status(400).json({ error: 'bad_request' });
  if (!req.file) return res.status(400).json({ error: 'receipt_required' });
  db.prepare('INSERT INTO orders(discord_id,product_id,method,status,amount,receipt) VALUES(?,?,?,?,?,?)')
    .run(req.session.user.id, p.id, method, 'pending', p.price, req.file.filename);
  res.json({ ok: true });
}));
app.get('/api/my/orders', needLogin, (req, res) => {
  res.json(db.prepare(`SELECT o.id,o.method,o.status,o.amount,o.created_at,p.name FROM orders o JOIN products p ON p.id=o.product_id
    WHERE o.discord_id=? AND o.method IN ('banreserva','popular') ORDER BY o.id DESC LIMIT 20`).all(req.session.user.id));
});

// ---------- verificacion para el resource MTA ----------
// El servidor MTA llama aqui con fetchRemote. La IP que se compara es la IP REAL
// de la conexion (req.ip), no una que el cliente pueda inventar.
app.get('/api/verify', (req, res) => {
  const { discord, product } = req.query;
  if (!isDiscordId(discord) || !product) return res.json({ ok: false, reason: 'bad_request' });
  const l = db.prepare('SELECT * FROM licenses WHERE discord_id=? AND product_id=? AND active=1').get(discord, product);
  if (!l) return res.json({ ok: false, reason: 'no_license' });
  if (!l.server_ip) return res.json({ ok: false, reason: 'ip_not_set' });
  if (l.server_ip !== cleanIp(req.ip)) return res.json({ ok: false, reason: 'ip_mismatch' });
  res.json({ ok: true });
});

// ---------- admin ----------
app.get('/api/admin/products', needAdmin, (req, res) => res.json(db.prepare('SELECT * FROM products ORDER BY id DESC').all()));
const productFields = b => ({
  name: String(b.name || '').trim(), category: ['scripts', 'mapas', 'planos', 'skins'].includes(b.category) ? b.category : 'scripts',
  version: String(b.version || 'v1.0.0').trim(), price: Math.max(0, parseFloat(b.price) || 0),
  desc_es: b.desc_es || '', desc_pt: b.desc_pt || '', desc_en: b.desc_en || '', active: b.active === '0' ? 0 : 1
});
const moveUploads = (files, p) => {
  const out = {};
  if (files?.image?.[0]) { fs.renameSync(files.image[0].path, path.join(UP_IMG, path.basename(files.image[0].path))); out.image = path.basename(files.image[0].path); }
  if (files?.file?.[0]) { fs.renameSync(files.file[0].path, path.join(UP_FILE, path.basename(files.file[0].path))); out.file = path.basename(files.file[0].path); }
  return out;
};
const fieldsUp = upProduct.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]);
app.post('/api/admin/products', needAdmin, fieldsUp, (req, res) => {
  const f = productFields(req.body); if (!f.name) return res.status(400).json({ error: 'name_required' });
  const up = moveUploads(req.files);
  const r = db.prepare('INSERT INTO products(name,category,version,price,image,file,desc_es,desc_pt,desc_en,active) VALUES(?,?,?,?,?,?,?,?,?,?)')
    .run(f.name, f.category, f.version, f.price, up.image || null, up.file || null, f.desc_es, f.desc_pt, f.desc_en, f.active);
  res.json({ id: r.lastInsertRowid });
});
app.put('/api/admin/products/:id', needAdmin, fieldsUp, (req, res) => {
  const old = db.prepare('SELECT * FROM products WHERE id=?').get(req.params.id);
  if (!old) return res.status(404).json({ error: 'not_found' });
  const f = productFields(req.body); const up = moveUploads(req.files);
  db.prepare('UPDATE products SET name=?,category=?,version=?,price=?,image=?,file=?,desc_es=?,desc_pt=?,desc_en=?,active=? WHERE id=?')
    .run(f.name || old.name, f.category, f.version, f.price, up.image || old.image, up.file || old.file, f.desc_es, f.desc_pt, f.desc_en, f.active, old.id);
  if (up.image && old.image) fs.rm(path.join(UP_IMG, old.image), () => { });
  if (up.file && old.file) fs.rm(path.join(UP_FILE, old.file), () => { });
  res.json({ ok: true });
});
app.delete('/api/admin/products/:id', needAdmin, (req, res) => {
  // Se desactiva en vez de borrar para no romper las licencias existentes
  db.prepare('UPDATE products SET active=0 WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

app.get('/api/admin/clients', needAdmin, (req, res) => {
  const rows = db.prepare(`SELECT u.discord_id, u.username, u.avatar, u.has_logged, l.id AS license_id, l.server_ip, l.source, l.created_at,
    p.id AS product_id, p.name AS product FROM users u JOIN licenses l ON l.discord_id=u.discord_id AND l.active=1
    JOIN products p ON p.id=l.product_id ORDER BY l.id DESC`).all();
  const map = new Map();
  for (const r of rows) {
    if (!map.has(r.discord_id)) map.set(r.discord_id, { discord_id: r.discord_id, username: r.username, avatar: r.avatar, has_logged: r.has_logged, licenses: [] });
    map.get(r.discord_id).licenses.push({ id: r.license_id, product_id: r.product_id, product: r.product, server_ip: r.server_ip, source: r.source, created_at: r.created_at });
  }
  res.json([...map.values()]);
});
app.post('/api/admin/grant', needAdmin, wrap(async (req, res) => {
  const { discordId, productId } = req.body;
  if (!isDiscordId(discordId)) return res.status(400).json({ error: 'bad_discord_id' });
  const p = db.prepare('SELECT * FROM products WHERE id=?').get(productId);
  if (!p) return res.status(404).json({ error: 'not_found' });
  await grant(discordId, p.id, 'admin');
  res.json({ ok: true });
}));
app.delete('/api/admin/licenses/:id', needAdmin, (req, res) => {
  db.prepare('UPDATE licenses SET active=0 WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});
app.delete('/api/admin/clients/:discordId', needAdmin, (req, res) => {
  db.prepare('UPDATE licenses SET active=0 WHERE discord_id=?').run(req.params.discordId);
  res.json({ ok: true });
});
app.post('/api/admin/licenses/:id/reset-ip', needAdmin, (req, res) => {
  db.prepare('UPDATE licenses SET server_ip=NULL, ip_changed_at=NULL WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

app.get('/api/admin/orders', needAdmin, (req, res) => {
  res.json(db.prepare(`SELECT o.*, p.name AS product, u.username FROM orders o JOIN products p ON p.id=o.product_id
    LEFT JOIN users u ON u.discord_id=o.discord_id WHERE o.method IN ('banreserva','popular') ORDER BY (o.status='pending') DESC, o.id DESC LIMIT 100`).all());
});
app.get('/api/admin/receipt/:file', needAdmin, (req, res) => res.sendFile(path.join(UP_REC, path.basename(req.params.file))));
app.post('/api/admin/orders/:id/:action', needAdmin, wrap(async (req, res) => {
  const o = db.prepare("SELECT * FROM orders WHERE id=? AND status='pending'").get(req.params.id);
  if (!o) return res.status(404).json({ error: 'not_found' });
  if (req.params.action === 'approve') {
    db.prepare("UPDATE orders SET status='paid' WHERE id=?").run(o.id);
    const p = db.prepare('SELECT * FROM products WHERE id=?').get(o.product_id);
    await grant(o.discord_id, p.id, o.method);
    sendLog(o.discord_id, p, o.amount, o.method === 'popular' ? 'Banco Popular' : 'Banreserva');
  } else db.prepare("UPDATE orders SET status='rejected' WHERE id=?").run(o.id);
  res.json({ ok: true });
}));
app.get('/api/admin/stats', needAdmin, (req, res) => res.json({
  clients: db.prepare('SELECT COUNT(DISTINCT discord_id) c FROM licenses WHERE active=1').get().c,
  licenses: db.prepare('SELECT COUNT(*) c FROM licenses WHERE active=1').get().c,
  pending: db.prepare("SELECT COUNT(*) c FROM orders WHERE status='pending' AND method!='paypal'").get().c
}));

app.listen(PORT, () => console.log(`${STORE} corriendo en ${BASE_URL} (puerto ${PORT})`));
