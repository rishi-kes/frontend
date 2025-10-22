import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ FINAL CONFIG for subdomain localhost (e.g. collection.localhost)
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // 👈 Allow access from local network or custom domain
    port: 5173,           // 👈 Default Vite port
    strictPort: true,     // 👈 Prevent random port assignment
    cors: true,
  },
  preview: {
    host: true,
    port: 5173,
  },
});
