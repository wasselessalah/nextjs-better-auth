import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

const client =
  global._mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 10,
  });

if (process.env.NODE_ENV !== "production") {
  global._mongoClient = client;
}

let db: Db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db();
    console.log("✅ MongoDB Connected");
  }

  return db;
}