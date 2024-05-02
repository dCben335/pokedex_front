import { z } from "zod";

//regex allow spaces
export type User = z.infer<typeof userSchema>;
export const userSchema = z.object({
    login: z.string().min(1).max(255).regex(/^[a-zA-Z0-9 -]+$/, { message: "Only letters, numbers, spaces and hyphens are allowed" }),
    isAdmin: z.boolean(),
});

export type UserRequest = z.infer<typeof userRequestSchema>;
export const userRequestSchema = z.object({
    login: userSchema.shape.login,
    password: z.string().min(1).max(255),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
export const userResponseSchema = z.object({
    user: userSchema,
    token: z.string(),
});


