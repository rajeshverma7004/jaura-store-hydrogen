import { reactRouter } from "@react-router/dev/vite";
import { vercelPreset } from "@react-router/vercel/vite"; // Add this
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    reactRouter({
      presets: [vercelPreset()], // Add this
    }),
    // ... any other plugins like hydrogen()
  ],
});
