import chalk from "chalk"

function getDateNow(): Date {
    return new Date(Date.now())
}

function getDateString(): string {
    const date = getDateNow()
    const hours = date.getHours()
    const hoursMod12 = hours % 12
    return String(hoursMod12).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0") + " " + (hours > 12 ? "pm" : "am")
}

export function info(message?: any) {
    console.info(chalk.grey(getDateString())+ " " + chalk.cyan.bold("[mao]") + " " + message);
}

export function warn(message?: any) {
    console.warn(chalk.grey(getDateString()) + " " + chalk.cyan.bold("[mao]") + " " + message)
}