export function formatMoney(cents: number): string {
    return ((cents ?? 0) / 100).toFixed(2)
}

export function getDollarsPart(cents: number): number {
    return Math.trunc((cents ?? 0) / 100)
}

export function getCentsPart(cents: number): string {
    return Math.abs((cents ?? 0) % 100).toString().padStart(2, "0")
}

export function dollarsToCents(dollars: number): number {
    return Math.round(Number(dollars) * 100)
}
