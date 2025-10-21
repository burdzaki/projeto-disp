import { defineConfig } from 'vite';
import { plugin as markdown } from 'vite-plugin-markdown';

export default defineConfig({
  /base: '/',
  server: {
    host: '0.0.0.0',
    port: 4000,

    //change the subdomain for the Cloudflare Tunnel
    allowedHosts: ['ride-walking-sn-orange.trycloudflare.com'],
    
  },
  plugins: [markdown()],
})
