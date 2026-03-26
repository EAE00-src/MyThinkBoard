import dotenv from "dotenv"
dotenv.config();
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
})
//rateLimiter that allows "10" requests every "20" seconds
    //analytics can be seen on the Redis dashboard
const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "20 s"),
    analytics: true
})

export default ratelimit;