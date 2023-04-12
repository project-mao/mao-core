export const VERSION = "1.0.0"
export const RELEASE: "prod" | "dev" = "dev"

export function getVersionString() {
    return VERSION + " (" + RELEASE + ")"
}

export const PAGE_CSS = "text-center mx-auto p-4 flex min-h-screen flex-col items-center"