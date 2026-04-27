export const getScheduleTime = (dateString, durationMinutes) => {
    const date = new Date(dateString)
    const endTime = new Date(date.getTime() + durationMinutes * 60 * 1000)

    return `${String(endTime.getHours()).padStart(2, "0")}:${String(endTime.getMinutes()).padStart(2, "0")}`
}

export const getBeginTime = (dateString) => {
    const date = new Date(dateString)
    const beginTime = new Date(date.getTime())

    return `${String(beginTime.getHours()).padStart(2, "0")}:${String(beginTime.getMinutes()).padStart(2, "0")}`
}