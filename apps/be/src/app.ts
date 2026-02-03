import { trpcServer } from '@hono/trpc-server'
import { createApp } from './app.utils'
import { createContext } from './context';
import { appRouter } from './trpc/app';
import { cors } from 'hono/cors';

const app = createApp();


app.use(
    "*",
    cors({
        origin: [
            "http://localhost:3000",
        ],
        allowMethods: ["POST", "GET", "OPTIONS", "PUT", "DELETE", "PATCH"],
        allowHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        exposeHeaders: ["Content-Length", "Content-Type"],
        credentials: true,
        maxAge: 3600,
    }),
);


app.use(async (c, next) => {
    const context = createContext({ env: c.env });
    c.set('context', context)
    await next()
})


app.use(
    '/trpc/*',
    trpcServer({
        router: appRouter,
    })
)
export default app