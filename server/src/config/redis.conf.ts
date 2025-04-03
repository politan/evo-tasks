import { createClient } from 'redis';
import dotenv from "dotenv";

dotenv.config();

export const redisClient = createClient({
    url: process.env.REDIS_URL!
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis connection established');
    } catch (error) {
        console.error('Redis connection error:', error);
    }
};

export const testConnection = async () => {
    await redisClient.set('klucz1', 'wartość1');
    const value = await redisClient.get('klucz1');

    console.log('VALUE: ');
    console.log(value);

    redisClient.on('error', (err) => {
        console.error('Redis connection error:', err);
    });
    redisClient.on('connect', () => {
        console.log('Redis connection established');
    });
}