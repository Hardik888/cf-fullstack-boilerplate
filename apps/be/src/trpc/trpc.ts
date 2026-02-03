import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

import type { UserContext } from "../context";

const t = initTRPC.context<UserContext>().create({
    transformer: SuperJSON,
});

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    return next({
        ctx: {
            ...ctx,
        },
    });
});


