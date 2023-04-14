import { StartServer, createHandler, renderAsync } from "solid-start/entry-server"
import * as dotenv from "dotenv"
import { info } from "~/lib/log"
import { AUTH_COLLECTION, getDB } from "~/lib/db/database"
import chalk from "chalk"
import { User, createUser, getUserFromSession } from "~/lib/db/auth"
import { redirect } from "solid-start"

const protectedPaths = [
    "/"
]

info("Configuring dotenv")
dotenv.config()

if(await getDB().collection(AUTH_COLLECTION).countDocuments() == 0) {
    info("No users exist, creating new admin user")
    info("--> Username: " + chalk.greenBright.bold("admin"))
    info("--> Password: " + chalk.greenBright.bold("admin"))
    createUser("admin", "admin")
    info("I created the first user on " + new Date(Date.now()) + "!")
    info(chalk.redBright.bold("Please make sure to change the password and/or username!"))
}

export default createHandler(
    ({ forward }) => {
        return async event => {
            const pathname = new URL(event.request.url).pathname
            if(
                pathname != "/auth/login" && !pathname.includes("/_m")
            ) {
                const user = await getUserFromSession(event.request.headers.get("Cookie") ?? "")
                console.log("User: " + user)
                if(user == null) {
                    console.log("Yes")
                    return redirect("/auth/login")
                }
            }
            return forward(event)
        };
    },
    renderAsync(event => <StartServer event={event} />)
)