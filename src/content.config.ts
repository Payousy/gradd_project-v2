import { defineCollection, z } from "astro:content";

export const collections = {
  actualites: defineCollection({
    schema: z.object({
      title: z.string(),
      date: z.date(),
      excerpt: z.string(),
      published: z.boolean().default(true),
    }),
  }),

  actions: defineCollection({
    schema: z.object({
      title: z.string(),
      type: z.string(),
      territoire: z.string().optional(),
      published: z.boolean().default(true),
    }),
  }),
};
