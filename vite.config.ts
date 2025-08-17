import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4000,

    // ✅ Libere o domínio do Cloudflare Tunnel
    // Se quiser permitir qualquer subdomínio do trycloudflare:
    allowedHosts: ['ride-walking-sn-orange.trycloudflare.com'],
    // ou, para liberar só o host que apareceu no seu terminal:
    // allowedHosts: ['renew-catherine-standings-did.trycloudflare.com'],

    // (opcional) ajuda o HMR atrás de HTTPS
    // hmr: { protocol: 'wss', port: 443 }
  },
})
