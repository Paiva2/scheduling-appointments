import IORedis from "ioredis";

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST ?? "localhost",
  port: 6379,
  password: process.env.REDIS_PASSWORD ?? "development",
  maxRetriesPerRequest: null,
});

export default redisConnection;
