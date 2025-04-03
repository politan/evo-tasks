import express, { Request, Response } from "express";
import { supabase } from "./config/supabase.conf";

import { connectRedis, testConnection, redisClient } from "./config/redis.conf";

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  console.log("Request received");
  res.send("Hello World 234213213213!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

supabase
  .from("tasks")
  .select("*")
  .then(({ data, error }) => {
    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      console.log("Tasks:", data);
    }
  });

async function connectToRedis() {
  await connectRedis();
  await testConnection();

  await getCachedTasks();
}

const getCachedTasks = async () => {
  try {
    const tasks = await redisClient.get('tasks');
    if (tasks) {
      return JSON.parse(tasks);
    } else {
        console.error('no tasks found in reddit!');
    }
  } catch (error) {
    console.error('Error fetching cached tasks:', error);
  }
  return null;
};

connectToRedis().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
