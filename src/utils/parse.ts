import { ZodSchema } from "zod";

export const parseWithZodSchema = <T>(schema: ZodSchema<T>, data: unknown): T | { error: string } => {
    const parsedResponse = schema.safeParse(data);
    if (parsedResponse.success) return parsedResponse.data;
    return { error: "The data from the server doesn't match the schema" };
}