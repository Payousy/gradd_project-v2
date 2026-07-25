import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const collections = {
  actualites: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/actualites" }),
    schema: z.object({
      title: z.string(),
      date: z.date(),
      excerpt: z.string(),
      published: z.boolean().default(true),
    }),
  }),

  actions: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/actions" }),
    schema: z.object({
      title: z.string(),
      type: z.string(),
      territoire: z.string().optional(),
      published: z.boolean().default(true),
    }),
  }),
  team: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
    schema: z.object({
      name: z.string(),
      role: z.string(),
      sectors: z.array(z.string()).default([]),
      order: z.number().default(99),
      published: z.boolean().default(true),
    }),
  }),
};
