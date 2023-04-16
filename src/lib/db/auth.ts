import { isServer } from "solid-js/web"
import { AUTH_COLLECTION, SESSION_COLLECTION, getDB } from "~/lib/db/database"
import { nanoid } from "nanoid"
import { info } from "~/lib/log"
import chalk from "chalk"
import server$ from "solid-start/server"
import { argon2Verify, argon2id } from "hash-wasm"

export interface User {
    /**
     * The username of the user.
     */
    username: string,
    /**
     * The user's password as a hash.
     */
    password: string
}

export async function initSession(sessionID: string, username: string) {
    if(isServer) {
        await server$(async (sessionID: string, username: string) => {
            info("Generating new session with ID " + chalk.greenBright(sessionID))
            getDB().collection(SESSION_COLLECTION).insertOne({
                sessionID: sessionID,
                user: username
            })
        })(sessionID, username)
    }
}

/**
 * Logs a user in.
 * @param username The username of the user.
 * @param password The password of the user.
 * @returns the sessionID if the user successfully logged in, else null.
 */
export async function loginUser(username: string, password: string): Promise<string | null> {
    info("Logging into user " + chalk.greenBright(username))
    if(isServer) {
        info((await server$(async () => {
            const authCol = getDB().collection(AUTH_COLLECTION)
            return authCol.findOne({ username: username })
        })())!.password)
    }
    const success = await server$(async (username: string, password: string) => {
        info("Argon V")
        try {
            const authCol = getDB().collection(AUTH_COLLECTION)
            const user: User | null = (await authCol.findOne({ username: username })) as unknown as User | null
            if(user) {
                info("Argon " + user)
                return argon2Verify({
                    password: password,
                    hash: user.password
                })
            } else {
                return false
            }
        } catch(err: any) {
            return false // there is no such user
        }
    })(username, password)
    if(!success) {
        info("Login into user " + chalk.greenBright(username) + " is " + chalk.redBright("unsuccessful"))
        return null
    } else {
        info("Login into user " + chalk.greenBright(username) + " is " + chalk.greenBright("successful"))
        const id = nanoid(36)
        await server$(async (username: string, id: string) => {
            await initSession(id, username)
        })(username, id)
        return id
    }
}

/**
 * Creates a new user. This does not check whether a user with the same username exists.
 * @param user The username of the user.
 * @param password The password of the user.
 */
export async function createUser(username: string, password: string) {
    server$(async (user: string, password: string) => {
        const authCol = getDB().collection(AUTH_COLLECTION)
        authCol.insertOne({
            username: user,
            password: await argon2id({
                password: password,
                salt: (await import("crypto")).randomBytes(64),
                parallelism: 1, // owasp recommendations
                iterations: 2, // owasp recommendations
                memorySize: 19923, // owasp recommendations
                hashLength: 32,
                outputType: 'encoded',
            })
        } as User)
    })(username, password)
}

/**
 * Returns a user, given the session ID.
 * @param session The session ID.
 */
export async function getUserFromSession(session: string): Promise<string | null> {
    return await server$(async (session: string) => {
        const sessCol = getDB().collection(SESSION_COLLECTION)
        const sessionObject = await sessCol.findOne({
            sessionID: session
        }) as unknown as { user: string } | null
        return sessionObject ? sessionObject.user : null
    })(session)
}