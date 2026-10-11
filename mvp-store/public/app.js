/* ===== Traducciones: es / pt (Brasil) / en ===== */
const I18N = {
  es: {
    products: 'Productos', account: 'Mi cuenta', admin: 'Admin', login: 'Iniciar sesión', logout: 'Salir',
    catalog: 'Catálogo', home: 'Inicio', hero: 'Skins, mapas y sistemas listos para llevar tu servidor de MTA:SA al siguiente nivel.',
    search: 'Buscar skins, scripts, mapas...', all: 'Todos', scripts: 'Scripts', mapas: 'Mapas', planos: 'Planos', skins: 'Skins', free: 'Gratis',
    sort_new: 'Más nuevos', sort_low: 'Precio: menor a mayor', sort_high: 'Precio: mayor a menor',
    buy: 'Comprar', claim: 'Reclamar', loginToBuy: 'Login', none: 'No hay productos en esta categoría.',
    pay: 'Pagar', total: 'Total', method: 'Método de pago', paypal: 'PayPal', banreserva: 'Banreserva', popular: 'Popular',
    transfer_hint: 'Haz la transferencia por el monto indicado y sube el comprobante. Activaremos tu producto cuando se confirme.',
    amount_dop: 'Monto aproximado en RD$', receipt: 'Comprobante de pago', send_receipt: 'Enviar comprobante',
    receipt_sent: 'Comprobante enviado. Te avisaremos cuando se apruebe.', paid_ok: '¡Pago completado! Ya puedes descargar tu producto.',
    my_products: 'Mis productos', my_sub: 'Descarga tus resources y registra la IP de tu servidor para activarlos.',
    download: 'Descargar', server_ip: 'IP del servidor', save_ip: 'Guardar IP', ip_set: 'IP registrada', ip_missing: 'Sin IP: el resource no encenderá',
    ip_hint: 'El resource solo funciona en este servidor. Puedes cambiar la IP una vez cada 7 días.', ip_saved: 'IP guardada',
    your_key: 'Tu key (ID de Discord)', no_licenses: 'Aún no tienes productos.', see_store: 'Ver tienda', pending_orders: 'Pagos por transferencia',
    pending: 'Pendiente', paid: 'Aprobado', rejected: 'Rechazado',
    clients: 'Clientes', orders: 'Pagos', add_product: 'Nuevo producto', add_license: 'Agregar licencia', edit: 'Editar', remove: 'Quitar', remove_all: 'Quitar todo',
    discord_id: 'ID del usuario de Discord', product: 'Producto', select_product: 'Selecciona un producto', cancel: 'Cancelar', add: 'Agregar', save: 'Guardar', close: 'Cerrar',
    no_login: 'SIN LOGIN', n_products: 'producto(s)', active_clients: 'Clientes activos', active_licenses: 'Licencias activas', pending_pay: 'Pagos pendientes',
    name: 'Nombre', category: 'Categoría', version: 'Versión', price: 'Precio (USD)', image: 'Imagen', file: 'Archivo del resource (.zip)', keep_file: 'Deja vacío para mantener el actual',
    desc: 'Descripción', visible: 'Visible en la tienda', yes: 'Sí', no: 'No', reset_ip: 'Reset IP', approve: 'Aprobar', reject: 'Rechazar', view: 'Ver comprobante',
    done: 'Listo', confirm: '¿Seguro?', copied: 'Copiado', login_first: 'Inicia sesión con Discord para continuar.',
    errors: { login_required: 'Inicia sesión primero', bad_ip: 'IP inválida (ej: 123.45.67.89)', ip_cooldown: 'Solo puedes cambiar la IP una vez cada 7 días', bad_discord_id: 'ID de Discord inválido', receipt_required: 'Sube el comprobante', not_completed: 'El pago no se completó', default: 'Ocurrió un error' }
  },
  pt: {
    products: 'Produtos', account: 'Minha conta', admin: 'Admin', login: 'Entrar', logout: 'Sair',
    catalog: 'Catálogo', home: 'Início', hero: 'Skins, mapas e sistemas prontos para levar seu servidor de MTA:SA ao próximo nível.',
    search: 'Buscar skins, scripts, mapas...', all: 'Todos', scripts: 'Scripts', mapas: 'Mapas', planos: 'Plantas', skins: 'Skins', free: 'Grátis',
    sort_new: 'Mais recentes', sort_low: 'Preço: menor para maior', sort_high: 'Preço: maior para menor',
    buy: 'Comprar', claim: 'Resgatar', loginToBuy: 'Login', none: 'Não há produtos nesta categoria.',
    pay: 'Pagar', total: 'Total', method: 'Forma de pagamento', paypal: 'PayPal', banreserva: 'Banreserva', popular: 'Popular',
    transfer_hint: 'Faça a transferência no valor indicado e envie o comprovante. Ativaremos seu produto após a confirmação.',
    amount_dop: 'Valor aproximado em RD$', receipt: 'Comprovante de pagamento', send_receipt: 'Enviar comprovante',
    receipt_sent: 'Comprovante enviado. Avisaremos quando for aprovado.', paid_ok: 'Pagamento concluído! Você já pode baixar seu produto.',
    my_products: 'Meus produtos', my_sub: 'Baixe seus resources e registre o IP do seu servidor para ativá-los.',
    download: 'Baixar', server_ip: 'IP do servidor', save_ip: 'Salvar IP', ip_set: 'IP registrado', ip_missing: 'Sem IP: o resource não vai ligar',
    ip_hint: 'O resource só funciona neste servidor. Você pode trocar o IP uma vez a cada 7 dias.', ip_saved: 'IP salvo',
    your_key: 'Sua key (ID do Discord)', no_licenses: 'Você ainda não tem produtos.', see_store: 'Ver loja', pending_orders: 'Pagamentos por transferência',
    pending: 'Pendente', paid: 'Aprovado', rejected: 'Recusado',
    clients: 'Clientes', orders: 'Pagamentos', add_product: 'Novo produto', add_license: 'Adicionar licença', edit: 'Editar', remove: 'Remover', remove_all: 'Remover tudo',
    discord_id: 'ID do Usuário Discord', product: 'Produto', select_product: 'Selecione um produto', cancel: 'Cancelar', add: 'Adicionar', save: 'Salvar', close: 'Fechar',
    no_login: 'SEM LOGIN', n_products: 'produto(s)', active_clients: 'Clientes ativos', active_licenses: 'Licenças ativas', pending_pay: 'Pagamentos pendentes',
    name: 'Nome', category: 'Categoria', version: 'Versão', price: 'Preço (USD)', image: 'Imagem', file: 'Arquivo do resource (.zip)', keep_file: 'Deixe vazio para manter o atual',
    desc: 'Descrição', visible: 'Visível na loja', yes: 'Sim', no: 'Não', reset_ip: 'Resetar IP', approve: 'Aprovar', reject: 'Recusar', view: 'Ver comprovante',
    done: 'Pronto', confirm: 'Tem certeza?', copied: 'Copiado', login_first: 'Entre com o Discord para continuar.',
    errors: { login_required: 'Faça login primeiro', bad_ip: 'IP inválido (ex: 123.45.67.89)', ip_cooldown: 'Você só pode trocar o IP uma vez a cada 7 dias', bad_discord_id: 'ID do Discord inválido', receipt_required: 'Envie o comprovante', not_completed: 'O pagamento não foi concluído', default: 'Ocorreu um erro' }
  },
  en: {
    products: 'Products', account: 'My account', admin: 'Admin', login: 'Log in', logout: 'Log out',
    catalog: 'Catalog', home: 'Home', hero: 'Skins, maps and systems ready to take your MTA:SA server to the next level.',
    search: 'Search skins, scripts, maps...', all: 'All', scripts: 'Scripts', mapas: 'Maps', planos: 'Blueprints', skins: 'Skins', free: 'Free',
    sort_new: 'Newest', sort_low: 'Price: low to high', sort_high: 'Price: high to low',
    buy: 'Buy', claim: 'Claim', loginToBuy: 'Login', none: 'No products in this category.',
    pay: 'Pay', total: 'Total', method: 'Payment method', paypal: 'PayPal', banreserva: 'Banreserva', popular: 'Popular',
    transfer_hint: 'Make the transfer for the amount shown and upload the receipt. We will activate your product once it is confirmed.',
    amount_dop: 'Approximate amount in RD$', receipt: 'Payment receipt', send_receipt: 'Send receipt',
    receipt_sent: 'Receipt sent. We will let you know once it is approved.', paid_ok: 'Payment complete! You can now download your product.',
    my_products: 'My products', my_sub: 'Download your resources and register your server IP to activate them.',
    download: 'Download', server_ip: 'Server IP', save_ip: 'Save IP', ip_set: 'IP registered', ip_missing: 'No IP: the resource will not start',
    ip_hint: 'The resource only works on this server. You can change the IP once every 7 days.', ip_saved: 'IP saved',
    your_key: 'Your key (Discord ID)', no_licenses: 'You have no products yet.', see_store: 'Browse store', pending_orders: 'Bank transfer payments',
    pending: 'Pending', paid: 'Approved', rejected: 'Rejected',
    clients: 'Clients', orders: 'Payments', add_product: 'New product', add_license: 'Add license', edit: 'Edit', remove: 'Remove', remove_all: 'Remove all',
    discord_id: 'Discord User ID', product: 'Product', select_product: 'Select a product', cancel: 'Cancel', add: 'Add', save: 'Save', close: 'Close',
    no_login: 'NO LOGIN', n_products: 'product(s)', active_clients: 'Active clients', active_licenses: 'Active licenses', pending_pay: 'Pending payments',
    name: 'Name', category: 'Category', version: 'Version', price: 'Price (USD)', image: 'Image', file: 'Resource file (.zip)', keep_file: 'Leave empty to keep the current one',
    desc: 'Description', visible: 'Visible in store', yes: 'Yes', no: 'No', reset_ip: 'Reset IP', approve: 'Approve', reject: 'Reject', view: 'View receipt',
    done: 'Done', confirm: 'Are you sure?', copied: 'Copied', login_first: 'Log in with Discord to continue.',
    errors: { login_required: 'Log in first', bad_ip: 'Invalid IP (e.g. 123.45.67.89)', ip_cooldown: 'You can only change the IP once every 7 days', bad_discord_id: 'Invalid Discord ID', receipt_required: 'Upload the receipt', not_completed: 'Payment was not completed', default: 'Something went wrong' }
  }
};

/* ===== utilidades ===== */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let lang = localStorage.getItem('lang') || (navigator.language.startsWith('pt') ? 'pt' : navigator.language.startsWith('en') ? 'en' : 'es');
const t = k => I18N[lang][k] ?? I18N.es[k] ?? k;
const S = { me: null, cfg: {}, products: [], cat: 'all', q: '', sort: 'new' };

async function api(url, opts = {}) {
  if (opts.json) { opts.headers = { 'Content-Type': 'application/json' }; opts.body = JSON.stringify(opts.json); }
  const r = await fetch(url, opts);
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(I18N[lang].errors[d.error] || d.error || I18N[lang].errors.default);
  return d;
}
function toast(msg, err) {
  const el = $('#toast'); el.textContent = msg; el.className = 'show' + (err ? ' err' : '');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.className = '', 3200);
}
const guard = fn => async (...a) => { try { await fn(...a); } catch (e) { toast(e.message, true); } };
const avatarUrl = (id, av) => av ? `https://cdn.discordapp.com/avatars/${id}/${av}.png?size=96` : 'https://cdn.discordapp.com/embed/avatars/0.png';
const pdesc = p => p['desc_' + lang] || p.desc_es || p.desc_en || p.desc_pt || '';
const thumb = p => `<div class="thumb" style="${p.image ? `background-image:url(/uploads/images/${esc(p.image)})` : ''}">`;
const discIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A17 17 0 0 0 16 3l-.5 1a15 15 0 0 0-5 0L10 3a17 17 0 0 0-4.300 1.400C3 8.500 2.300 12.500 2.600 16.400A17 17 0 0 0 7.800 19l1.100-1.800a11 11 0 0 1-1.700-.8l.4-.3a12 12 0 0 0 10.800 0l.4.3c-.5.300-1.100.6-1.700.8l1.100 1.800a17 17 0 0 0 5.200-2.600c.4-4.600-.7-8.600-3.100-12zM9.100 14c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2zm5.800 0c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2z"/></svg>';

function openModal(title, body, footer = '') {
  closeModal();
  const o = document.createElement('div'); o.className = 'ov'; o.id = 'ov';
  o.innerHTML = `<div class="modal" role="dialog" aria-modal="true"><header><h2>${title}</h2><button class="x" data-close aria-label="${t('close')}">✕</button></header><div class="mb">${body}</div>${footer ? `<footer>${footer}</footer>` : ''}</div>`;
  o.addEventListener('mousedown', e => { if (e.target === o || e.target.closest('[data-close]')) closeModal(); });
  document.body.appendChild(o);
  return o;
}
const closeModal = () => $('#ov')?.remove();

/* ===== navegación / layout ===== */
function renderNav() {
  const h = location.hash.replace('#/', '') || 'products';
  const L = [['products', t('products')]];
  if (S.me) L.push(['account', t('account')]);
  if (S.me?.admin) L.push(['admin', t('admin')]);
  $('#links').innerHTML = L.map(([k, v]) => `<a href="#/${k}" class="${h === k ? 'on' : ''}">${v}</a>`).join('');
  $('#auth').innerHTML = S.me
    ? `<span class="row"><img class="avatar" src="${avatarUrl(S.me.id, S.me.avatar)}" alt=""><a class="btn sm" href="/auth/logout">${t('logout')}</a></span>`
    : `<a class="btn disc" href="/auth/discord">${discIcon} ${t('login')}</a>`;
  $('#lang').value = lang; document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
}
$('#lang').onchange = e => { lang = e.target.value; localStorage.setItem('lang', lang); route(); };
window.addEventListener('hashchange', route);

async function route() {
  renderNav();
  const h = location.hash.replace('#/', '') || 'products';
  if (h === 'account') return S.me ? viewAccount() : (location.hash = '#/products');
  if (h === 'admin') return S.me?.admin ? viewAdmin() : (location.hash = '#/products');
  return viewStore();
}

/* ===== tienda ===== */
async function viewStore() {
  if (!S.products.length) S.products = await api('/api/products');
  const counts = c => S.products.filter(p => c === 'all' ? true : c === 'free' ? p.price <= 0 : p.category === c).length;
  const cats = ['all', 'skins', 'scripts', 'mapas', 'planos', 'free'];
  $('#app').innerHTML = `
  <section class="hero"><div class="crumb">${t('home')} › <b>${t('catalog')}</b></div><h1>${t('products')}</h1><p>${t('hero')}</p></section>
  <div class="wrap"><div class="toolbar"><div class="tools">
    <input id="q" type="search" placeholder="${t('search')}" value="${esc(S.q)}">
    <select id="sort"><option value="new">${t('sort_new')}</option><option value="low">${t('sort_low')}</option><option value="high">${t('sort_high')}</option></select>
  </div><div class="chips">${cats.map(c => `<button class="chip ${S.cat === c ? 'on' : ''}" data-cat="${c}">${t(c)}<i>${counts(c)}</i></button>`).join('')}</div></div>
  <div class="grid" id="grid"></div></div>`;
  $('#sort').value = S.sort;
  $('#q').oninput = e => { S.q = e.target.value; drawGrid(); };
  $('#sort').onchange = e => { S.sort = e.target.value; drawGrid(); };
  document.querySelectorAll('.chip').forEach(b => b.onclick = () => { S.cat = b.dataset.cat; viewStore(); });
  drawGrid();
}
function drawGrid() {
  let list = S.products.filter(p => (S.cat === 'all' || (S.cat === 'free' ? p.price <= 0 : p.category === S.cat)) && p.name.toLowerCase().includes(S.q.toLowerCase()));
  if (S.sort === 'low') list.sort((a, b) => a.price - b.price); else if (S.sort === 'high') list.sort((a, b) => b.price - a.price);
  $('#grid').innerHTML = list.length ? list.map(p => `
    <article class="card">${thumb(p)}<span class="tag">${t(p.category)}</span>${p.price <= 0 ? `<span class="tag free">${t('free')}</span>` : ''}</div>
      <div class="body"><div class="meta">MTA:SA <span>${esc(p.version)}</span></div><h3>${esc(p.name)}</h3><p class="desc">${esc(pdesc(p))}</p>
      <div class="foot">${p.price <= 0 ? `<div class="price free">${t('free').toUpperCase()}</div>` : `<div class="price">$${p.price.toFixed(2)}<small>RD$${Math.round(p.price * S.cfg.usdToDop).toLocaleString()}</small></div>`}
      ${S.me ? `<button class="btn green" data-buy="${p.id}">${p.price <= 0 ? t('claim') : t('buy')}</button>` : `<a class="btn disc" href="/auth/discord">${discIcon} ${t('loginToBuy')}</a>`}</div></div></article>`).join('')
    : `<div class="empty">${t('none')}</div>`;
  document.querySelectorAll('[data-buy]').forEach(b => b.onclick = () => buyFlow(S.products.find(p => p.id == b.dataset.buy)));
}

/* ===== compra ===== */
let ppLoading;
function loadPayPal() {
  if (window.paypal) return Promise.resolve();
  return ppLoading ??= new Promise((ok, no) => {
    const s = document.createElement('script'); s.src = `https://www.paypal.com/sdk/js?client-id=${S.cfg.paypalClientId}&currency=USD`;
    s.onload = ok; s.onerror = no; document.head.appendChild(s);
  });
}
const buyFlow = guard(async p => {
  if (p.price <= 0) { await api(`/api/claim/${p.id}`, { method: 'POST' }); toast(t('paid_ok')); location.hash = '#/account'; return; }
  const methods = [...(S.cfg.paypalClientId ? ['paypal'] : []), 'banreserva', 'popular'];
  const o = openModal(esc(p.name), `
    <div class="row" style="justify-content:space-between"><span>${t('total')}</span><b class="price" style="font-size:34px">$${p.price.toFixed(2)} USD</b></div>
    <div><div class="hint" style="margin:0 0 8px">${t('method')}</div><div class="pm">${methods.map(m => `<button class="btn" data-m="${m}">${t(m)}</button>`).join('')}</div></div>
    <div id="pay"></div>`);
  const pick = async m => {
    o.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === m));
    const box = $('#pay', o);
    if (m === 'paypal') {
      box.innerHTML = '<div id="pp"></div>';
      await loadPayPal();
      paypal.Buttons({
        createOrder: async () => (await api('/api/pay/paypal/create', { method: 'POST', json: { productId: p.id } })).id,
        onApprove: async d => { try { await api('/api/pay/paypal/capture', { method: 'POST', json: { orderID: d.orderID } }); closeModal(); toast(t('paid_ok')); location.hash = '#/account'; } catch (e) { toast(e.message, true); } },
        onError: () => toast(I18N[lang].errors.default, true)
      }).render('#pp');
    } else {
      const info = S.cfg[m] || '';
      box.innerHTML = `<p class="hint" style="margin:0 0 10px">${t('transfer_hint')}</p><div class="box">${esc(info.split('|').map(s => s.trim()).join('\n'))}</div>
        <p class="hint">${t('amount_dop')}: <b>RD$${Math.round(p.price * S.cfg.usdToDop).toLocaleString()}</b> · ${t('your_key')}: <span class="key">${S.me.id}</span></p>
        <label>${t('receipt')}<input type="file" id="rc" accept="image/*,.pdf"></label>
        <button class="btn green" id="sr" style="margin-top:6px">${t('send_receipt')}</button>`;
      $('#sr', o).onclick = guard(async () => {
        const f = $('#rc', o).files[0]; if (!f) throw new Error(I18N[lang].errors.receipt_required);
        const fd = new FormData(); fd.append('productId', p.id); fd.append('method', m); fd.append('receipt', f);
        await api('/api/pay/manual', { method: 'POST', body: fd }); closeModal(); toast(t('receipt_sent')); location.hash = '#/account';
      });
    }
  };
  o.querySelectorAll('[data-m]').forEach(b => b.onclick = guard(() => pick(b.dataset.m)));
  pick(methods[0]);
});

/* ===== area del cliente ===== */
async function viewAccount() {
  const [lics, orders] = await Promise.all([api('/api/my/licenses'), api('/api/my/orders')]);
  $('#app').innerHTML = `<div class="wrap"><h1 class="page-title">${t('my_products')}</h1><p class="sub">${t('my_sub')}</p>
    <p class="hint" style="margin:-14px 0 24px">${t('your_key')}: <span class="key" data-copy="${S.me.id}">${S.me.id}</span></p>
    ${lics.length ? lics.map(l => `<div class="lic">${thumb(l)}</div>
      <div><h3>${esc(l.name)}</h3><div class="meta">MTA:SA <span>${esc(l.version)}</span> ${l.server_ip ? `<span class="badge ok">${t('ip_set')}</span>` : `<span class="badge">${t('ip_missing')}</span>`}</div>
        <div class="ipform"><input data-ip="${l.id}" placeholder="${t('server_ip')} (123.45.67.89)" value="${esc(l.server_ip || '')}"><button class="btn sm" data-saveip="${l.id}">${t('save_ip')}</button></div>
        <div class="hint">${t('ip_hint')}</div></div>
      ${l.has_file ? `<a class="btn green" href="/api/download/${l.product_id}">${t('download')}</a>` : ''}</div>`).join('')
      : `<div class="empty">${t('no_licenses')}<br><br><a class="btn green" href="#/products">${t('see_store')}</a></div>`}
    ${orders.length ? `<h2 class="page-title" style="font-size:32px">${t('pending_orders')}</h2><div class="tw"><table>${orders.map(o => `<tr><td>${esc(o.name)}</td><td>${t(o.method)}</td><td>$${o.amount.toFixed(2)}</td><td><span class="badge ${o.status === 'paid' ? 'ok' : o.status === 'rejected' ? 'bad' : ''}">${t(o.status)}</span></td></tr>`).join('')}</table></div>` : ''}</div>`;
  document.querySelectorAll('[data-saveip]').forEach(b => b.onclick = guard(async () => {
    await api(`/api/my/licenses/${b.dataset.saveip}/ip`, { method: 'POST', json: { ip: $(`[data-ip="${b.dataset.saveip}"]`).value } });
    toast(t('ip_saved')); viewAccount();
  }));
  document.querySelectorAll('[data-copy]').forEach(b => b.onclick = () => { navigator.clipboard?.writeText(b.dataset.copy); toast(t('copied')); });
}

/* ===== panel admin ===== */
let adminTab = 'clients';
async function viewAdmin() {
  const [st, products] = await Promise.all([api('/api/admin/stats'), api('/api/admin/products')]);
  $('#app').innerHTML = `<div class="wrap"><h1 class="page-title">${t('admin')}</h1>
    <div class="stats"><div class="stat"><b>${st.clients}</b>${t('active_clients')}</div><div class="stat"><b>${st.licenses}</b>${t('active_licenses')}</div><div class="stat"><b>${st.pending}</b>${t('pending_pay')}</div></div>
    <div class="tabs">${['clients', 'products', 'orders'].map(k => `<button class="chip ${adminTab === k ? 'on' : ''}" data-tab="${k}">${t(k)}</button>`).join('')}</div><div id="tab"></div></div>`;
  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { adminTab = b.dataset.tab; viewAdmin(); });
  ({ clients: adminClients, products: adminProducts, orders: adminOrders })[adminTab](products);
}
async function adminClients(products) {
  const cl = await api('/api/admin/clients');
  $('#tab').innerHTML = `<p><button class="btn green" id="addlic">+ ${t('add_license')}</button></p><div class="clients">${cl.map(c => `<div class="client">
    <div class="head"><img class="avatar" src="${avatarUrl(c.discord_id, c.avatar)}" alt=""><div><b>${c.has_logged ? esc(c.username) : t('no_login')}</b><span class="key" data-copy="${c.discord_id}">${c.discord_id}</span></div></div>
    <ul>${c.licenses.map(l => `<li><span>${esc(l.product)}<br><small>${esc(l.server_ip || '— sin IP —')}</small></span><span class="row" style="gap:6px">
      ${l.server_ip ? `<button class="btn sm" data-resetip="${l.id}">${t('reset_ip')}</button>` : ''}<button class="btn sm danger" data-rm="${l.id}">${t('remove')}</button></span></li>`).join('')}</ul>
    <button class="btn sm danger" data-rmall="${c.discord_id}">${t('remove_all')}</button></div>`).join('')}</div>`;
  $('#addlic').onclick = () => {
    const o = openModal(t('add_license'), `<label>${t('discord_id')}<input id="did" placeholder="Ej: 123456789012345678" inputmode="numeric"></label>
      <label>${t('product')}<select id="pid"><option value="">${t('select_product')}</option>${products.filter(p => p.active).map(p => `<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></label>`,
      `<button class="btn" data-close>${t('cancel')}</button><button class="btn disc" id="go">+ ${t('add')}</button>`);
    $('#go', o).onclick = guard(async () => { await api('/api/admin/grant', { method: 'POST', json: { discordId: $('#did', o).value.trim(), productId: $('#pid', o).value } }); closeModal(); toast(t('done')); viewAdmin(); });
  };
  const act = (sel, url, method = 'POST') => document.querySelectorAll(sel).forEach(b => b.onclick = guard(async () => {
    if (method === 'DELETE' && !confirm(t('confirm'))) return;
    await api(url(b), { method }); viewAdmin();
  }));
  act('[data-rm]', b => `/api/admin/licenses/${b.dataset.rm}`, 'DELETE');
  act('[data-rmall]', b => `/api/admin/clients/${b.dataset.rmall}`, 'DELETE');
  act('[data-resetip]', b => `/api/admin/licenses/${b.dataset.resetip}/reset-ip`);
  document.querySelectorAll('[data-copy]').forEach(b => b.onclick = () => { navigator.clipboard?.writeText(b.dataset.copy); toast(t('copied')); });
}
function adminProducts(products) {
  $('#tab').innerHTML = `<p><button class="btn green" id="newp">+ ${t('add_product')}</button></p><div class="grid">${products.map(p => `<article class="card" style="${p.active ? '' : 'opacity:.5'}">${thumb(p)}<span class="tag">${t(p.category)}</span></div>
    <div class="body"><h3>${esc(p.name)}</h3><div class="meta"><span>${esc(p.version)}</span> ${p.price > 0 ? '$' + p.price.toFixed(2) : t('free')} ${p.file ? '' : '⚠ sin archivo'}</div>
    <div class="foot"><button class="btn sm" data-edit="${p.id}">${t('edit')}</button>${p.active ? `<button class="btn sm danger" data-del="${p.id}">${t('remove')}</button>` : ''}</div></div></article>`).join('')}</div>`;
  const form = p => {
    p = p || { category: 'scripts', version: 'v1.0.0', price: 0, active: 1 };
    const o = openModal(p.id ? t('edit') : t('add_product'), `
      <label>${t('name')}<input name="name" value="${esc(p.name || '')}"></label>
      <div class="row"><label style="flex:1">${t('category')}<select name="category">${['skins', 'scripts', 'mapas', 'planos'].map(c => `<option value="${c}" ${p.category === c ? 'selected' : ''}>${t(c)}</option>`).join('')}</select></label>
      <label style="width:110px">${t('version')}<input name="version" value="${esc(p.version)}"></label><label style="width:110px">${t('price')}<input name="price" type="number" min="0" step="0.01" value="${p.price}"></label></div>
      <label>${t('image')}<input type="file" name="image" accept="image/*"></label>
      <label>${t('file')}<input type="file" name="file" accept=".zip,.rar,.7z">${p.id ? `<span class="hint">${t('keep_file')}</span>` : ''}</label>
      <label>${t('desc')} 🇩🇴 ES<textarea name="desc_es">${esc(p.desc_es || '')}</textarea></label>
      <label>${t('desc')} 🇧🇷 PT<textarea name="desc_pt">${esc(p.desc_pt || '')}</textarea></label>
      <label>${t('desc')} 🇺🇸 EN<textarea name="desc_en">${esc(p.desc_en || '')}</textarea></label>
      <label>${t('visible')}<select name="active"><option value="1" ${p.active ? 'selected' : ''}>${t('yes')}</option><option value="0" ${p.active ? '' : 'selected'}>${t('no')}</option></select></label>`,
      `<button class="btn" data-close>${t('cancel')}</button><button class="btn green" id="sv">${t('save')}</button>`);
    $('#sv', o).onclick = guard(async () => {
      const fd = new FormData(); o.querySelectorAll('[name]').forEach(el => { if (el.type === 'file') { if (el.files[0]) fd.append(el.name, el.files[0]); } else fd.append(el.name, el.value); });
      await api(p.id ? `/api/admin/products/${p.id}` : '/api/admin/products', { method: p.id ? 'PUT' : 'POST', body: fd });
      S.products = []; closeModal(); toast(t('done')); viewAdmin();
    });
  };
  $('#newp').onclick = () => form();
  document.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => form(products.find(p => p.id == b.dataset.edit)));
  document.querySelectorAll('[data-del]').forEach(b => b.onclick = guard(async () => { if (!confirm(t('confirm'))) return; await api(`/api/admin/products/${b.dataset.del}`, { method: 'DELETE' }); S.products = []; viewAdmin(); }));
}
async function adminOrders() {
  const os = await api('/api/admin/orders');
  $('#tab').innerHTML = `<div class="tw"><table><tr><th>#</th><th>${t('discord_id')}</th><th>${t('product')}</th><th>${t('method')}</th><th>USD</th><th></th></tr>${os.map(o => `<tr>
    <td>${o.id}</td><td>${esc(o.username || '')}<br><span class="key">${o.discord_id}</span></td><td>${esc(o.product)}</td><td>${t(o.method)}</td><td>$${o.amount.toFixed(2)}</td>
    <td>${o.status === 'pending' ? `<span class="row" style="gap:6px"><a class="btn sm" target="_blank" href="/api/admin/receipt/${o.receipt}">${t('view')}</a><button class="btn sm green" data-ap="${o.id}">${t('approve')}</button><button class="btn sm danger" data-rj="${o.id}">${t('reject')}</button></span>` : `<span class="badge ${o.status === 'paid' ? 'ok' : 'bad'}">${t(o.status)}</span>`}</td></tr>`).join('')}</table></div>`;
  [['ap', 'approve'], ['rj', 'reject']].forEach(([a, act]) => document.querySelectorAll(`[data-${a}]`).forEach(b => b.onclick = guard(async () => { await api(`/api/admin/orders/${b.dataset[a]}/${act}`, { method: 'POST' }); viewAdmin(); })));
}

/* ===== inicio ===== */
(async () => {
  [S.me, S.cfg] = await Promise.all([api('/api/me'), api('/api/config')]);
  document.title = S.cfg.store;
  route();
})();
