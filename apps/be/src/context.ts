export const createContext = ({ env }: { env: Env }) => {
    return {
        env,
    };
};

export const createTrpcContext = ({ env }: { env: Env }) => {
    return {
        env,
    };
}

export type AppContext = ReturnType<typeof createContext>;
export type UserContext = ReturnType<typeof createTrpcContext>;