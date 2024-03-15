import { z } from "zod";

export const SortSchema = z.object({
    empty: z.boolean(),
    unsorted: z.boolean(),
    sorted: z.boolean(),
});


export const PageableSchema = z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    sort: SortSchema,
    offset: z.number(),
    paged: z.boolean(),
    unpaged: z.boolean(),
});