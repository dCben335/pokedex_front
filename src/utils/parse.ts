import { ZodSchema } from "zod";

export const parseWithZodSchema = <T>(schema: ZodSchema<T>, data: unknown) => {
    const parsedResponse = schema.safeParse(data);
    if (parsedResponse.success) return parsedResponse.data;
    return { error: "The data from the server doesn't match the zod schema" };
}