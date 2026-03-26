import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {

    //The user's ip address can be the unique identifier or the string of choice
    const identifier = req.ip || "global-limit"; //ideally this would be a userId to better to limit per user, not globally
    try {
        const {success, reset} = await ratelimit.limit(identifier)
        //reset timer for rate limit for frontend
        const secondsLeft = Math.floor((reset - Date.now()) / 1000)

        if(!success) {
            return res.status(429).json({
                message: "Too many requests, please try again later! 🛑",
                resetIn: `Resets in: ${secondsLeft}s`
            })
        }

        next();
    } catch (error) {
        console.error(`Redis Rate Limit Error: ${error}`)
        next();
    }
};

export default rateLimiter;