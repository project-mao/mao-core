import { Db, MongoClient } from "mongodb"
import { isServer } from "solid-js/web"

export const AUTH_COLLECTION = "mao-auth"
export const SESSION_COLLECTION = "mao-session"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

const db = await MongoClient.connect(uri);

/**
 * 
 * @returns the MongoDB client.
 * @throws
 */
export function getDB(): Db {
    return db.db(process.env.MONGODB_DB)
}