import { StartServer, createHandler, renderAsync } from "solid-start/entry-server"
import * as dotenv from "dotenv"
import { info } from "~/lib/log"
import { AUTH_COLLECTION, getDB } from "~/lib/db/database"
import chalk from "chalk"
import { User, createUser, getUserFromSession } from "~/lib/db/auth"
import { redirect } from "solid-start"

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
            const user = await getUserFromSession(event.request.headers.get("Cookie")?.replaceAll(" ", "").split("=")[1] ?? "")
            if(pathname != "/auth/login" && !pathname.includes("/_m")) {
                if(user == null) {
                    return redirect("/auth/login")
                }
            } else {
                if(pathname == "/auth/login" && user != null) {
                    return redirect("/")
                }
            }
            return forward(event)
        };
    },
    renderAsync(event => <StartServer event={event} />)
)