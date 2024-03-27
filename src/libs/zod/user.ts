import { z } from "zod";


export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
    login: z.string().min(1).max(255),
    isAdmin: z.boolean(),
});

export type UserRequest = z.infer<typeof userRequestSchema>;
export const userRequestSchema = z.object({
    login: UserSchema.shape.login,
    password: z.string(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
export const userResponseSchema = z.object({
    user: UserSchema,
    token: z.string(),
});


