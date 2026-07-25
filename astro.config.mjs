// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.gradd.sn",
  output: "static",
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@styles": "/src/styles",
        "@components": "/src/components",
        "@layouts": "/src/components/layouts",
      },
    },
  },
});
