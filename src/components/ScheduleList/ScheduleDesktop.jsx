import {formatDateLocal, getEndTimeString, getTimeString} from "../../utils/getEndTimeString.ts";
import getNameById from "../../utils/getName.ts";
import LessonCard from "../LessonCard/LessonCard.jsx";
import useMyLessons from "../../hooks/useMyLessons.ts";
import {HOUR_HEIGHT, HOURS, WEEK_DAYS} from "./scheduleConstants.js";
import {useMyStudents} from "../../hooks/useMyStudents.ts";

const ScheduleDesktop = ({days, setEditingLesson, isTeacher, creatingLesson}) => {
    const {lessonsByDate} = useMyLessons()
    const {myStudents} = useMyStudents()

    function renderDesktopSchedule(dayIndex) {
        const dayKey = formatDateLocal(days[dayIndex])
        const dayLessons = lessonsByDate[dayKey] || []

        console.log(dayLessons)

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
                        lesson={lesson.originalLesson ? lesson.originalLesson : lesson}
                        studentName={getNameById(lesson.student_id, myStudents)}
                        key={lesson.isSplit ? `${lesson.id}-${lesson.splitPart}` : lesson.id}
                        beginTime={getTimeString(lesson.date)}
                        endTime={getEndTimeString(lesson.date, lesson.duration)}
                        paddingTop={isDurationShort ? "5px" : null}
                        onClick ={isTeacher ? () => setEditingLesson(lesson.originalLesson ?? lesson) : null}
                        className="gridLessonCard"
                        isDurationShort={isDurationShort}
                        isDurationShortest={isDurationShortest}
                        textPosition={!isDurationShort ? 'start' : "center"}
                        creatingLesson={creatingLesson}
                    />
                </div>
            )
        })
    }

    const currentDay = new Date()
    console.log(currentDay)

    return (
        <main className="scheduleMain scheduleDesktop">
            <div className="calendarHeader">
                <div className="timeCorner" />
                {days.map((day, i) => (
                    <div className="dayHeader" key={i}>
                        <span className="dayName">{WEEK_DAYS[i]}</span>
                        <span className={days[i].toDateString() === currentDay.toDateString() ? "currentDay" : "dayNumber"}>{days[i].getDate()}</span>
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
    )
}

export default ScheduleDesktop