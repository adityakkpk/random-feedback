import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Content Must be of at least 10 characters")
    .max(300, "Content must be at most 300 characters"),
});
