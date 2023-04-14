// @refresh reload
import { Suspense } from "solid-js"
import {
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Meta,
    Routes,
    Scripts,
    Title,
} from "solid-start"
import "./root.css"
import { getVersionString } from "./lib/mao"
import chalk from "chalk"
import { isServer } from "solid-js/web"
import { info } from "./lib/log"

const str = chalk.magenta.bold("Project MaO") + " " + chalk.greenBright(getVersionString()) + "\n" + "================> Running on " + (isServer ? "server" : "client") + " build"

info("-".repeat(str.length - 25))
info(str)
info("-".repeat(str.length - 25))

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Title>MaO {getVersionString()}</Title>
                <Meta charset="utf-8" />
                <Meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Body>
                <Suspense>
                    <ErrorBoundary>
                        <Routes>
                            <FileRoutes/>
                        </Routes>
                    </ErrorBoundary>
                </Suspense>
                <Scripts/>
            </Body>
    </Html>
  );
}
