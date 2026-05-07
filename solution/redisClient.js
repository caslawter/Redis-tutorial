const { createClient } = require("redis");

const redisClient = createClient();
redisClient.on("error", (err) => console.error("Redis client error:", err));

const connectClient = async () => {
    await redisClient.connect();
    console.log("Connected to Redis");
};

const disconnectClient = async () => {
    await redisClient.quit();
    console.log("Redis disconnected");
};

module.exports = { redisClient, connectClient, disconnectClient };
