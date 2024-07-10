import { faker } from "@faker-js/faker";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

interface Post {
  id: string;
  title: string;
  description: string;
  prep: string;
  bake: string;
  total: string;
  yield: string;
  thumbnail: string;
}

const createPost = (): Post => {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    prep: "10 mins",
    bake: "1 hr to 1hr 15 mins",
    total: "1 hr 10 mins",
    yield: "1 loaf, 12 generous servings",
    thumbnail: "https://picsum.photos/300/400",
  };
};

const existedPosts = Array(10)
  .fill(null)
  .map(() => createPost());

const posts = existedPosts;

let post = {
  id: 1,
  name: "Hello World",
};

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      post = { id: post.id + 1, name: input.name };
      return post;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ input }) => {
      const post = posts.find(({ id }) => id === input.id);
      return post ?? null;
    }),
  getList: publicProcedure.query(async () => {
    return posts;
  }),
});
