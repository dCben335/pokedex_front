import { z } from "zod";




export type User = z.infer<typeof userSchema>;
export const userSchema = z.object({
    login: z.string(),
    isAdmin: z.boolean(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
export const userResponseSchema = z.object({
    user: userSchema,
    token: z.string(),
});

export type UserRequest = z.infer<typeof userRequestSchema>;
export const userRequestSchema = z.object({
    login: z.string(),
    password: z.string(),
});

