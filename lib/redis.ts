import { Redis } from "@upstash/redis";

export const redisDB = Redis.fromEnv();
