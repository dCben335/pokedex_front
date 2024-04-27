import { z } from "zod";


export const portSchema = z.object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean(),
});


export const pageableSchema = z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    sort: portSchema,
    offset: z.number(),
    unpaged: z.boolean(),
    paged: z.boolean(),
});

