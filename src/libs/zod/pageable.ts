import { z } from "zod";

export const SortSchema = z.object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean(),
});


export const PageableSchema = z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    sort: SortSchema,
    offset: z.number(),
    unpaged: z.boolean(),
    paged: z.boolean(),
});

