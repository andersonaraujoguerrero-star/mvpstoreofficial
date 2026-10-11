# MVP STORE OFFICIAL – tienda de resources para MTA:SA

Login con Discord, catálogo con imágenes y descripciones (ES / PT-BR / EN), pagos (PayPal + Banreserva + Popular),
área del cliente con descarga, licencia atada a la IP del servidor, panel admin y logs a Discord.

## 1. Instalar (necesitas Node 18+)
```bash
npm install
cp .env.example .env     # y llena los datos
npm start
```
Para producción usa `pm2 start server.js --name mvp-store` detrás de Nginx con HTTPS (Let's Encrypt) o Cloudflare.

## 2. Discord
1. https://discord.com/developers/applications → New Application.
2. OAuth2 → Redirects: `https://TU-DOMINIO/auth/callback` → copia Client ID y Secret al `.env`.
3. (Opcional) Bot → copia el token a `DISCORD_BOT_TOKEN` para ver nombre/avatar de clientes agregados solo por ID.
4. Canal de logs → Configuración → Integraciones → Webhooks → copia la URL a `WEBHOOK_URL`.
5. Pon tu ID de Discord en `ADMIN_IDS` (activa Modo desarrollador para copiarlo).

## 3. Pagos
- **PayPal**: crea una app en developer.paypal.com, llena `PAYPAL_CLIENT_ID` y `PAYPAL_SECRET`. Usa `PAYPAL_ENV=sandbox` para probar y `live` cuando vayas en serio.
- **Banreserva / Popular**: no tienen API pública para comercios pequeños, así que el flujo es transferencia + comprobante.
  El cliente sube la captura, tú la ves en Admin → Pagos y das **Aprobar**. Al aprobar se activa la licencia y se envía el log a Discord.
  Edita los datos de tus cuentas en `BANRESERVA_INFO` y `POPULAR_INFO` (separados por `|`).

## 4. Fondo y logo
- Fondo: `public/img/bg.jpg`  ·  Logo: `public/img/logo.png`

## 5. Flujo de uso
- **Subir producto**: Admin → Productos → Nuevo (imagen, .zip, precio, descripción en 3 idiomas).
- **Venta por privado**: Admin → Clientes → Agregar licencia → ID de Discord + producto.
  El cliente aparece como "SIN LOGIN" hasta que entre; cuando inicie sesión con ese ID ya verá su producto.
- **Quitar cliente**: botón Quitar (una licencia) o Quitar todo.
- **Cliente**: Mi cuenta → descarga el resource y guarda la IP de su servidor.

## 6. Proteger tus resources (licencia por IP)
Copia `mta-example/mvp_check/license.lua` dentro de CADA resource que vendas, con su `PRODUCT_ID`.
El cliente solo pone su ID de Discord. El resource llama a `/api/verify`; el sitio compara la IP **real**
de la conexión con la IP registrada y, si no coincide, el resource se detiene.

### Límites que debes conocer
- Un script Lua en texto plano se puede editar para quitar la verificación. Ofusca/compila siempre los
  .lua antes de subirlos (https://luac.mtasa.com) y no dejes el check en un solo lugar.
- El archivo no se puede "bloquear" una vez descargado; lo que sí controlas es que no encienda en otra IP.
- La key es el ID de Discord (como pediste). Como un ID no es secreto, la protección real es la IP.
  Si quieres más seguridad, se puede generar una key aleatoria por licencia.
- Cambio de IP: el cliente puede cambiarla 1 vez cada 7 días; tú puedes resetearla desde el panel.
- Las sesiones usan memoria (se cierran al reiniciar). Para muchos usuarios cambia a un session store persistente.
