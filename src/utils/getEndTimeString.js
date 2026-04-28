export const getEndTime = (dateString, durationMinutes) => {
    const date = new Date(dateString)
    return new Date(date.getTime() + durationMinutes * 60 * 1000)
}

export const getEndTimeString = (dateString, durationMinutes) => {
    const endTime = getEndTime(dateString, durationMinutes)

    return `${String(endTime.getHours()).padStart(2, "0")}:${String(endTime.getMinutes()).padStart(2, "0")}`
}

export const getBeginTime = (dateString) => {
    const date = new Date(dateString)
    return new Date(date.getTime())
}

export const getBeginTimeString = (dateString) => {
    const beginTime = getBeginTime(dateString)

    return `${String(beginTime.getHours()).padStart(2, "0")}:${String(beginTime.getMinutes()).padStart(2, "0")}`
}