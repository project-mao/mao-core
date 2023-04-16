import chalk from "chalk"
import { setCookie } from "typescript-cookie"
import { APIEvent, createRouteAction } from "solid-start"
import { createServerData$, redirect } from "solid-start/server"
import { loginUser } from "~/lib/db/auth"
import { info } from "~/lib/log"
import { getVersionString } from "~/lib/mao"

export default function LoginPage() {
    const nodeVersion = createServerData$(() => process.versions.node)()!
    const [_, { Form }] = createRouteAction(async (formData: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const username = formData.get("username")
        const password = formData.get("password")
        if(username && password) {
            const sessionID: string | null = await loginUser(username.toString(), password.toString())
            if(sessionID) {
                info("Session ID is " + chalk.greenBright.bold(sessionID)) 
                setCookie("sessionID", sessionID, {
                    path: "/",
                    sameSite: "lax"
                })
                return redirect("/", {
                    headers: {
                        "Set-Cookie": `sessionID=${sessionID}`
                    }
                })
            }
        }
    })
    return (
        <main class="h-screen bg-gradient-to-r from-purple-500 to-pink-500 select-none">
            <div class="h-screen lg:w-[27vw] bg-[color:rgb(var(--background-rgb))] p-[1.5vw] flex flex-col justify-center">
                <div class="grid w-full justify-center align-middle">
                    <h1 class="text-6xl font-mono text-center">MaO</h1>
                    <br/>
                    <label class="label">
                        <span class="label-text">Username</span>
                    </label>
                    <Form class="grid w-full justify-center align-middle">
                        <input type="text" placeholder="gsayson" class="input input-bordered md:w-[65vw] lg:w-max" name="username"/>
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password1234" class="input input-bordered w-[65vw] lg:w-max" name="password"/>
                        <br/>
                        <input class="btn bg-primary" type="submit" value="login"/>
                    </Form>
                    <div class="absolute bottom-4 left-4">
                        <label class="text-center text-gray-400">MaO {getVersionString()} on NodeJS {nodeVersion}</label>
                    </div>
                </div>
            </div>
        </main>
    )
}