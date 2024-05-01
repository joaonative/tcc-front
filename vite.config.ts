import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "robots.txt",
          dest: "",
        },
      ],
    }),
  ],
});
