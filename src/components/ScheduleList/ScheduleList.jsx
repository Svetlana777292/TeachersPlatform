import Button from "../Button/Button.jsx";
import {useEffect, useState} from "react";
import "./ScheduleList.css"
import CreateLessonWindow from "../CreateLessonWindow/CreateLessonWindow.jsx";
import ScheduleDayCard from "../ScheduleDayCard/ScheduleDayCard.jsx";
import useMyLessons from "../../hooks/useMyLessons.js";
import Loading from "../Loading/Loading.jsx";
import LessonCard from "../LessonCard/LessonCard.jsx";
import getNameById from "../../utils/getName.js";
import useMyStudents from "../../hooks/useMyStudents.js";
import fixTimezone from "../../utils/fixTimezone.js";

const HOURS = Array.from({length: 24}, (_, i) => i)
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOUR_HEIGHT = 100

const ScheduleList = () => {
    const [weekOffset, setWeekOffset] = useState(0)
    const [creatingLesson, setCreatingLesson] = useState(false)
    const [editingLesson, setEditingLesson] = useState(null)
    const {lessonsIsLoading, myLessons} = useMyLessons()
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
    const {myStudents} = useMyStudents()

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    })

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
                    dayLabel={`${WEEK_DAYS[i]},  ${days[i].toLocaleDateString()}`}
                    key={dayKey}

                />
            )
        })
    }

    function renderDesktopSchedule(dayIndex) {
        const dayKey = formatDateUTC(days[dayIndex])
        const dayLessons = lessonsByDate[dayKey] || []

        return dayLessons.map(lesson => {
            const day = fixTimezone(new Date(lesson.date))
            const hours = day.getHours()
            const minutes = day.getMinutes()
            const top = (hours + minutes / 60) * HOUR_HEIGHT
            const height = ((lesson.duration / 60) * HOUR_HEIGHT)

            return (
                <div
                    key={lesson.id}
                    style={{
                        position: "absolute",
                        top: `${top}px`,
                        height: `${height}px`,
                        right: "2px",
                        left: "2px"
                    }}
                >
                    <LessonCard
                        color={lesson.card_color}
                        title={lesson.topic}
                        studentName={getNameById(lesson.student_id, myStudents)}
                        key={lesson.id}
                        beginTime={lesson.date.slice(11, 16)}
                        duration={`${lesson.duration} min`}
                        price={lesson.price}
                        onClick={() => {
                            setEditingLesson(lesson)
                            console.log(lesson)
                        }}
                        className="gridLessonCard"
                    />
                </div>
            )
        })
    }

    return (
        <>
            <div className="scheduleNavigation">
                <div className="scheduleHeader">
                    <h1 className="scheduleTitle">My Schedule</h1>
                    <h2 className="current-week">{firstDay.toLocaleDateString()} - {lastDay.toLocaleDateString()}</h2>
                </div>
                <div className="weeks-switcher">
                    <Button className="week-switch-button" onClick={() => setWeekOffset(weekOffset - 1)}>Previous week</Button>
                    <Button className="week-switch-button" onClick={() => setWeekOffset(weekOffset + 1)}>Next week</Button>
                    <Button className="add-lesson-btn" onClick={() => setCreatingLesson(true)}>+</Button>
                </div>
            </div>
            { !isDesktop ? (
                <main className="scheduleMain sheduleMobile">
                    {renderScheduleCards()}
                </main>
            ) : (
                <main className="scheduleMain scheduleDesktop">
                    <div className="calendarHeader">
                        <div className="timeCorner" />
                            {days.map((day, i) => (
                                <div className="dayHeader" key={i}>
                                    <span className="dayName">{WEEK_DAYS[i]}</span>
                                    <span className="dayNumber">{days[i].getDate()}</span>
                                </div>
                            ))}
                    </div>

                    <div className="calendarBody">
                        <div className="timeColumn">
                            {HOURS.map(hour => (
                                <div className="timeSlot" key={hour} style={{height: `${HOUR_HEIGHT}px`}}>
                                    {String(hour).padStart(2, "0")}:00
                                </div>
                                )
                            )}
                        </div>

                        {days.map((day, i) => (
                            <div className="dayColumn" key={i}>
                                {HOURS.map(hour => (
                                    <div className="hourCell" key={hour} style={{height: `${HOUR_HEIGHT}px`}}/>
                                ))}
                                {renderDesktopSchedule(i)}
                            </div>
                        ))}
                    </div>
                </main>
            )}
            <CreateLessonWindow
                method="POST"
                apiPath="lessons"
                isOpen={creatingLesson}
                onClose={() => setCreatingLesson(false)}
                title="Create Lesson"
                onSubmitText="Create Lesson"
            />
            <CreateLessonWindow
                method="PATCH"
                apiPath={`lessons/${editingLesson?.id}`}
                key={editingLesson?.key}
                isOpen={editingLesson !== null}
                onClose={() => setEditingLesson(null)}
                title="Edit Lesson"
                onSubmitText="Save changes"
                fieldsValues={editingLesson}
                isEditing={editingLesson !== null}
            />
        </>
    )
}

export default ScheduleList