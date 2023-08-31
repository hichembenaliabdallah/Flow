import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title is too short" })
    .max(12, { message: "Title should have a maximum of 125 characters" }),
  subredditId: z.string(),
  content: z.any(),
});
export type PostCreationRequest = z.infer<typeof PostValidator>;
