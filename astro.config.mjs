// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@styles": "/src/styles",
        "@components": "/src/components",
        "@layouts": "/src/layouts",
      },
    },
  },
});
