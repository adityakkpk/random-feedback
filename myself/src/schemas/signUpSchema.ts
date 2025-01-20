import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be at most 20 characters long");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email("Please use a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
