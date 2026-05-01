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
import {formatDateLocal, getEndTimeString, getWeekDays} from "../../utils/getEndTimeString.js";
import {getTimeString} from "../../utils/getEndTimeString.js";

const HOURS = Array.from({length: 24}, (_, i) => i)
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOUR_HEIGHT = 120

const ScheduleList = () => {
    const [weekOffset, setWeekOffset] = useState(0)
    const [creatingLesson, setCreatingLesson] = useState(false)
    const [editingLesson, setEditingLesson] = useState(null)
    const {lessonsIsLoading, lessonsByDate} = useMyLessons()
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
    const {myStudents} = useMyStudents()

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    })

    if (lessonsIsLoading) return <Loading message="Loading your shedule.."/>

    const days = getWeekDays(weekOffset)
    const firstDay = days[0]
    const lastDay = days[6]

    function renderScheduleCards() {
        return Array.from({length: 7}, (_, i) => {
            const dayKey = formatDateLocal(days[i])
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
        const dayKey = formatDateLocal(days[dayIndex])
        const dayLessons = lessonsByDate[dayKey] || []

        return dayLessons.map(lesson => {
            const day = new Date(lesson.date)
            const hours = day.getHours()
            const minutes = day.getMinutes()
            const top = (hours + minutes / 60) * HOUR_HEIGHT
            const height = ((lesson.duration / 60) * HOUR_HEIGHT)
            const isDurationShort = lesson.duration <= 25
            const isDurationShortest = lesson.duration <= 19

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
                        lesson={lesson}
                        studentName={getNameById(lesson.student_id, myStudents)}
                        key={lesson.id}
                        beginTime={getTimeString(lesson.date)}
                        endTime={getEndTimeString(lesson.date, lesson.duration)}
                        paddingTop={isDurationShort ? "5px" : null}
                        onClick={() => {
                            setEditingLesson(lesson)
                            console.log(lesson)
                        }}
                        className="gridLessonCard"
                        isDurationShort={isDurationShort}
                        isDurationShortest={isDurationShortest}
                        textPosition={!isDurationShort ? 'start' : "center"}
                    />
                </div>
            )
        })
    }

    return (
        <div className="scheduleContainer">
            <aside className="scheduleNavigation">
                <div className="scheduleHeader">
                    <h1 className="scheduleTitle">My Schedule</h1>
                    <h2 className="current-week">{firstDay.toLocaleDateString()} - {lastDay.toLocaleDateString()}</h2>
                </div>
                <div className="weeks-switcher">
                    <Button className="week-switch-button prev" onClick={() => setWeekOffset(weekOffset - 1)}>{isDesktop ? "⬅ Prev" : "Previous week"}</Button>
                    <Button className="week-switch-button next" onClick={() => setWeekOffset(weekOffset + 1)}>{isDesktop ? "Next ⮕" : "Next week"}</Button>
                    <Button className="add-lesson-btn" onClick={() => setCreatingLesson(true)}>{isDesktop ? "Add lesson" : "+"}</Button>
                </div>
            </aside>
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

                        {(days).map((day, i) => (
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
        </div>
    )
}

export default ScheduleList