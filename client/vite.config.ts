import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  server: {
    proxy: {
      "/api": "https://localhost:7072" // adjust to your .NET backend port
    },
    https: true
  }
});
