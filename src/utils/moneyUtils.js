export function formatMoney(cents) {
    return ((cents ?? 0) / 100).toFixed(2)
}

export function getDollarsPart(cents) {
    return Math.trunc((cents ?? 0) / 100)
}

export function getCentsPart(cents) {
    return Math.abs((cents ?? 0) % 100).toString().padStart(2, "0")
}

// dollars (from the UI) -> cents (for the server)
export function dollarsToCents(dollars) {
    return Math.round(Number(dollars) * 100)
}
