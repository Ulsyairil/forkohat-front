import expressRateLimiter from 'express-rate-limiter'

export default function rateLimit(options) {
    return expressRateLimiter({
        windowMs: options.windowMs || 1 * 60 * 1000, // 1 minutes
        max: options.max || 10, // limit each IP to 10 requests per windowMs
        message: options.message || 'Too many requests from this IP, please try again later!',
    })
}