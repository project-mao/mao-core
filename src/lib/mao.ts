export const VERSION = "1.0.0"
export const RELEASE: "prod" | "dev" = "dev"

export function getVersionString() {
    return VERSION + " (" + RELEASE + ")"
}