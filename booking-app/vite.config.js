import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/destination": "http://localhost:4000",
      "/hotels": "http://localhost:4000",
      "/booking": "http://localhost:4000",
    },
  },
});
