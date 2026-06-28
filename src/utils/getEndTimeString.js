export function formatDateLocal(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

export function getDateString(date) {
    date = formatDateLocal(date)
    const dateArr = date.split("-")

    return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`
}

export function getWeekdayString(date) {
    const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const day = date.getDay()
    return WEEKDAYS[day]
}

export const getEndTime = (dateString, durationMinutes) => {
    const date = new Date(dateString)
    return new Date(date.getTime() + durationMinutes * 60 * 1000)
}

export const getEndTimeString = (dateString, durationMinutes) => {
    const endTime = getEndTime(dateString, durationMinutes)

    return `${String(endTime.getHours()).padStart(2, "0")}:${String(endTime.getMinutes()).padStart(2, "0")}`
}

export const getTime = (dateString) => {
    const date = new Date(dateString)
    return new Date(date.getTime())
}

export const getTimeString = (dateString) => {
    const beginTime = getTime(dateString)

    return `${String(beginTime.getHours()).padStart(2, "0")}:${String(beginTime.getMinutes()).padStart(2, "0")}`
}

export function getMonday(weekOffset) {
    const todayDate = new Date()
    let weekDay = todayDate.getDay()
    if(weekDay === 0) {
        weekDay = 7
    }

    const mondayDate = new Date(todayDate)
    mondayDate.setDate(todayDate.getDate() - weekDay + 1 + 7 * weekOffset)
    return mondayDate
}

export function getWeekDays(weekOffset) {
    const mondayDate = getMonday(weekOffset)
    return Array.from({length: 7}, (_, i) => {
        const day = new Date(mondayDate)
        day.setDate(mondayDate.getDate() + i)
        return day
    })
}

export function toISOStringWithTZ(date) {
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    const offsetMin = -date.getTimezoneOffset();   // e.g. +180 for UTC+3
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