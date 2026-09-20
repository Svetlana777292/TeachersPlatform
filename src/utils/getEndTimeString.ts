export function formatDateLocal(date: Date): string{
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

export function getDateString(date: Date): string {
    const dateString: string = formatDateLocal(date)
    const dateArr: string[] = dateString.split("-")

    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
}

export function getWeekdayString(date: Date): string {
    const WEEKDAYS: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const day: number = date.getDay()
    return WEEKDAYS[day]
}

export const getEndTime = (dateString: string, durationMinutes: number): Date => {
    const date = new Date(dateString)
    return new Date(date.getTime() + durationMinutes * 60 * 1000)
}

export const getEndTimeString = (dateString: string, durationMinutes: number): string => {
    const endTime: Date = getEndTime(dateString, durationMinutes)

    return `${String(endTime.getHours()).padStart(2, "0")}:${String(endTime.getMinutes()).padStart(2, "0")}`
}

export const getTime = (dateString: string): Date => {
    const date: Date = new Date(dateString)
    return new Date(date.getTime())
}

export const getTimeString = (dateString: string): string => {
    const beginTime: Date = getTime(dateString)

    return `${String(beginTime.getHours()).padStart(2, "0")}:${String(beginTime.getMinutes()).padStart(2, "0")}`
}

export function getMonday(weekOffset: number): Date {
    const todayDate = new Date()
    let weekDay: number = todayDate.getDay()
    if(weekDay === 0) {
        weekDay = 7
    }

    const mondayDate = new Date(todayDate)
    mondayDate.setDate(todayDate.getDate() - weekDay + 1 + 7 * weekOffset)
    return mondayDate
}

export function getWeekDays(weekOffset: number): Date[] {
    const mondayDate: Date = getMonday(weekOffset)
    return Array.from({length: 7}, (_, i: number) => {
        const day = new Date(mondayDate)
        day.setDate(mondayDate.getDate() + i)
        return day
    })
}

export function toISOStringWithTZ(date: Date): string {
    const pad = (n: number) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    const offsetMin: number = -date.getTimezoneOffset();
    const sign = offsetMin >= 0 ? "+" : "-";

    return date.getFullYear() +
        "-" + pad(date.getMonth() + 1) +
        "-" + pad(date.getDate()) +
        "T" + pad(date.getHours()) +
        ":" + pad(date.getMinutes()) +
        ":" + pad(date.getSeconds()) +
        sign + pad(offsetMin / 60) +
        ":" + pad(offsetMin % 60);
}