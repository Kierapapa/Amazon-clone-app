module.exports = {
    MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost:27017/amazonDB",
    JWT_SECRET: process.env.JWT_SECRET || "somethingsecret"
}