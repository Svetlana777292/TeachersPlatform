import Button from "../Button/Button.jsx";
import {useState} from "react";
import "./ScheduleList.css"
import CreateLessonWindow from "../CreateLessonWindow/CreateLessonWindow.jsx";
import ScheduleDayCard from "../ScheduleDayCard/ScheduleDayCard.jsx";
import useMyLessons from "../../hooks/useMyLessons.js";
import Loading from "../Loading/Loading.jsx";

const ScheduleList = () => {
    const [weekOffset, setWeekOffset] = useState(0)
    const [creatingLesson, setCreatingLesson] = useState(false)
    const {lessonsIsLoading, myLessons} = useMyLessons()

    if (lessonsIsLoading) return <Loading message="Loading your shedule.."/>

    function getMonday(weekOffset) {
        const todayDate = new Date()
        let weekDay = todayDate.getDay()
        if(weekDay === 0) {
            weekDay = 7
        }

        const mondayDate = new Date(todayDate)
        mondayDate.setDate(todayDate.getDate() - weekDay + 1 + 7 * weekOffset)
        return mondayDate
    }

    function getWeekDays(weekOffset) {
        const mondayDate = getMonday(weekOffset)
        return Array.from({length: 7}, (_, i) => {
            const day = new Date(mondayDate)
            day.setDate(mondayDate.getDate() + i)
            return day
        })

    }

    function formatDateUTC(date) {
        const year = date.getUTCFullYear()
        const month = String(date.getUTCMonth() + 1).padStart(2, "0")
        const day = String(date.getUTCDate()).padStart(2, "0")

        return `${year}-${month}-${day}`
    }


    const days = getWeekDays(weekOffset)
    const firstDay = days[0]
    const lastDay = days[6]
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    const lessonsByDate = myLessons.reduce((acc, lesson) => {
        const dateKey = formatDateUTC(new Date(lesson.date))

        if(!acc[dateKey]) {
            acc[dateKey] = []
        }

        acc[dateKey].push(lesson)
        return acc
    }, {})



    function renderScheduleCards() {
        return Array.from({length: 7}, (_, i) => {
            const dayKey = formatDateUTC(days[i])
            const dayLessons = lessonsByDate[dayKey] || []
            dayLessons.sort((a, b) => new Date(a.date) - new Date(b.date))

            return (
                <ScheduleDayCard
                    lessons={dayLessons}
                    dayLabel={`${weekDays[i]},  ${days[i].toLocaleDateString()}`}
                    key={dayKey}
                />
            )
        })
    }

    return (
        <>
            <h1 className="schedule-title">My Schedule</h1>
            <h2 className="current-week">{firstDay.toLocaleDateString()} - {lastDay.toLocaleDateString()}</h2>
            <div className="weeks-switcher">
                <Button className="week-switch-button" onClick={() => setWeekOffset(weekOffset - 1)}>Previous week</Button>
                <Button className="week-switch-button" onClick={() => setWeekOffset(weekOffset + 1)}>Next week</Button>
                <Button className="add-lesson-btn" onClick={() => setCreatingLesson(true)}>+</Button>
            </div>
            {renderScheduleCards()}
            <CreateLessonWindow
                method="POST"
                apiPath="lessons"
                isOpen={creatingLesson}
                onClose={() => setCreatingLesson(false)}
                title="Create Lesson"
                onSubmitText="Create Lesson"
            />
        </>
    )
}

export default ScheduleList