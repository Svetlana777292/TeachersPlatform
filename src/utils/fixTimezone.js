const fixTimezone = (dateString) => {
    const date = new Date(dateString)
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset())
    return date
}

export default fixTimezone
