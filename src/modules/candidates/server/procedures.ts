import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { candidate } from "@/db/schema";
import { createCandidateSchema, updateCandidateSchema } from "../schemas";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const candidatesRouter = createTRPCRouter({

    getOne: baseProcedure.input(z.object({
        id: z.string(),
    })).query(async ({ input }) => {
        const existingCandidate = await db
        .select()
        .from(candidate)
        .where(eq(candidate.id, input.id));

//        await new Promise((resolve) => setTimeout(resolve, 5000));
//        throw new TRPCError({code: "BAD_REQUEST"});
        
        return existingCandidate;
    }),


    // TODO: Change to protectedProcedure 
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(candidate);

//        await new Promise((resolve) => setTimeout(resolve, 5000));
//        throw new TRPCError({code: "BAD_REQUEST"});
        
        return data;
    }),

    create: protectedProcedure.input(createCandidateSchema).mutation(async ({ input, ctx }) => {
        const createdCandidate = await db.insert(candidate).values({
            ...input,
            userId: ctx.auth.user.id,
        }).returning();
        return createdCandidate;
    }),

    update: protectedProcedure.input(z.object({
        id: z.string(),
        data: updateCandidateSchema
    })).mutation(async ({ input, ctx }) => {
        const updatedCandidate = await db.update(candidate).set(input.data).where(eq(candidate.id, input.id)).returning();
        return updatedCandidate;
    }),

    delete: protectedProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({ input, ctx }) => {
        const deletedCandidate = await db.delete(candidate).where(eq(candidate.id, input.id)).returning();
        return deletedCandidate;
    }),
});