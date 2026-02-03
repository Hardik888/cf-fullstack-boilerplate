export const isDevelopment = process.env.NODE_ENV === "development";
export const isStaging = process.env.NODE_ENV === "staging";
export const isProduction = process.env.NODE_ENV === "production";


export const APP_URL = isDevelopment
    ? "http://localhost:3000"
    : isStaging
        ? "https://"
        : "https://";

// API URLs
export const API_URL = isDevelopment
    ? "http://localhost:4000/trpc"
    : isStaging
        ? "https:///trpc"
        : "https:///trpc";

// Auth URLs
export const AUTH_URL = isDevelopment
    ? "http://localhost:4000"
    : isStaging
        ? "https://dev-api.zapify.pro"
        : "https://api.zapify.pro";

export const DISCORD_URL = "https://discord.com/channels/@me";

// Environment helpers
export const ENV = {
    isDevelopment,
    isStaging,
    isProduction,
    current: process.env.NODE_ENV || "development",
};
