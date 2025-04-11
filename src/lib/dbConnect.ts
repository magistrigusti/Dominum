import mongoose from "mongoose";
import { getEnvOrThrow } from "../utils/getEnvOrThrow";

const MONGO_URI = getEnvOrThrow("MONGO_URL");

if (!MONGO_URI || !MONGO_URI.startsWith("mongodb")) {
  throw new Error("❌ Переменная окружения MONGO_URL указана некорректно");
}

declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

async function dbConnect(): Promise<typeof mongoose> {
  if (global.mongooseCache.conn) return global.mongooseCache.conn;

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default dbConnect;
