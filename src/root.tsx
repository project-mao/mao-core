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
import { Footer, Navbar } from "./components/daisy"
import { getVersionString } from "./mao"
import chalk from "chalk"
import { isServer } from "solid-js/web"

console.log("")
console.log(chalk.magenta.bold("Project MaO") + " " + getVersionString() + "\n" + ">>> Running on " + (isServer ? "server" : "client") + " build")
console.log("")

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
                        <Navbar/>
                        <Routes>
                            <FileRoutes/>
                        </Routes>
                        <Footer/>
                    </ErrorBoundary>
                </Suspense>
                <Scripts/>
            </Body>
    </Html>
  );
}
