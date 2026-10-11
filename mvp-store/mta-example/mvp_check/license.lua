-- ============================================================
--  Verificacion de licencia MVP STORE OFFICIAL (poner en CADA resource)
--  El cliente solo cambia DISCORD_ID por su ID de Discord.
-- ============================================================
local SITE_URL   = "https://TU-DOMINIO.com/api/verify"
local PRODUCT_ID = 1                       -- ID del producto (lo ves en el panel admin)
local DISCORD_ID = "PON_AQUI_TU_ID_DE_DISCORD"
local RECHECK_MS = 30 * 60 * 1000          -- vuelve a verificar cada 30 min

local function stopWithReason(reason)
    outputDebugString("[MVP] Licencia invalida (" .. tostring(reason) .. "). Resource detenido.", 1)
    local res = getThisResource()
    setTimer(function() stopResource(res) end, 50, 1)
end

local function check()
    local url = SITE_URL .. "?discord=" .. DISCORD_ID .. "&product=" .. PRODUCT_ID
    fetchRemote(url, function(data, err)
        if err ~= 0 then
            -- Sin conexion al sitio: no te quedes sin servidor, solo avisa
            outputDebugString("[MVP] No se pudo verificar la licencia (error " .. err .. ")", 2)
            return
        end
        if not data:find('"ok":true', 1, true) then
            stopWithReason(data:match('"reason":"(.-)"') or "unknown")
        end
    end)
end

addEventHandler("onResourceStart", resourceRoot, function()
    check()
    setTimer(check, RECHECK_MS, 0)
end)
