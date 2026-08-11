import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Explicitly tell Vite to bundle these packages
    include: ["@react-pdf/renderer", "tslib"],
  },
});
