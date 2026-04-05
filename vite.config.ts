import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['chat.quickchat.local'],
    // use when hrm is not working (only for devlopment)
    //  hmr: {
    //   host: 'chat.quickchat.local',
    // },
  },
});
