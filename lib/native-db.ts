// lib/native-db.ts
import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI!;
if (!MONGO_URI) throw new Error("MONGODB_URI is not set");

declare global {
  // cache in dev to avoid multiple connections
  var __nativeMongo: { client?: MongoClient; db?: Db } | undefined;
}

const globalCache =
  (global as any).__nativeMongo || ((global as any).__nativeMongo = {});

export async function getNativeClient(): Promise<MongoClient> {
  if (globalCache.client) return globalCache.client;
  globalCache.client = new MongoClient(MONGO_URI);
  await globalCache.client.connect();
  return globalCache.client;
}

export async function getNativeDb(): Promise<Db> {
  if (globalCache.db) return globalCache.db;
  const client = await getNativeClient();
  
  globalCache.db = client.db();
  return globalCache.db;
}
