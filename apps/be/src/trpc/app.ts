import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import superjson from 'superjson'

const t = initTRPC.create({
    transformer: superjson,
})

const publicProcedure = t.procedure
const router = t.router

export const appRouter = router({
    hello: publicProcedure.input(z.object({ name: z.string() })).query(({ input }) => {
        return `Hello ${input.name}!`
    }),
})

export type AppRouter = typeof appRouter

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>; 