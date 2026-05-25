import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  root: "frontend",
  envDir: "frontend",
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    outDir: "../dist/frontend",
    emptyOutDir: true,
  },
});
