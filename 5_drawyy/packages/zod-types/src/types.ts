import { z } from "zod";

export const SignupSchema = z.object({
   uname: z.string().min(3).max(20),
   password: z.string(),
   email: z.string(),
});

export const SigninSchema = z.object({
   uname: z.string().min(3).max(20),
   password: z.string(),
});

export const CreateRoomSchema = z.object({
   slug: z.string().min(3).max(20),
});
