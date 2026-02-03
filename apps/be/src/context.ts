import { DatabaseService } from "./db";

export const createContext = ({ env }: { env: Env }) => {
    const appDB = new DatabaseService(env.DB);
    return {
        env,
        db: { appDB },
    };
};

export const createTrpcContext = ({ env }: { env: Env }) => {
    const appDB = new DatabaseService(env.DB);
    return {
        env,
        db: { appDB },
    };
}

export type AppContext = ReturnType<typeof createContext>;
export type UserContext = ReturnType<typeof createTrpcContext>;