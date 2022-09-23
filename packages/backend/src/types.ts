import { z } from 'zod';

export const deleteSchema = z.object({
    nameDeletion: z.string(),
});
export const addOrUpdateSchema = z
    .object({
        name: z.string(),
        system: z.string(),
        beans: z.number(),
        difficulty: z.string(),
        creator: z.string(),
        assigned: z.boolean(),
    })
    .passthrough();

export const getSchema = z.literal('');

export type GetRequest = z.infer<typeof getSchema>;
export type DeleteRequest = z.infer<typeof deleteSchema>;
export type AddOrUpdateRequest = z.infer<typeof addOrUpdateSchema>;
