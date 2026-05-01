import useMyLessons from "../../hooks/useMyLessons.js";
import {
    formatDateLocal,
    getDateString, getTime, getTimeString,
    getWeekDays,
    getWeekdayString
} from "../../utils/getEndTimeString.js";
import LessonCard from "../LessonCard/LessonCard.jsx";
import "./ProfileSummary.css"
import getNameById from "../../utils/getName.js";
import useMyStudents from "../../hooks/useMyStudents.js";

const ProfileSummary = () => {

    const {myStudents} = useMyStudents();
    const { lessonsByDate} = useMyLessons()
    const currentDay = formatDateLocal(new Date())
    const todayLessons = lessonsByDate[currentDay] || []

    const weekdays = getWeekDays(0)

    const weekLessonsCount = () => {
        let count = 0

        for (let weekday of weekdays) {
            weekday = formatDateLocal(weekday)
            const dayLessons = lessonsByDate[weekday]
            if (dayLessons) {
                count += dayLessons.length
            }
        }

        return count
    }

    const totalDayLessonsDuration = () => {
        let totalhours = 0

        if(lessonsByDate[currentDay]){
            for (const lesson of lessonsByDate[currentDay]) {
                totalhours += lesson.duration
            }
        }

        return Math.round(totalhours / 60 * 10) / 10
    }

    return (
        <main className="profileSummaryContainer">
            <div className="statsCard">
                <h3 className="statsTitle">
                    <div className="statsIconWrapper" style={{background: "#D9E8FCFF"}}>
                        <img src="../../../public/calendarBlue.svg"/>
                    </div>
                    Today's Lessons
                </h3>
                <p className="statsValue">{todayLessons.length}</p>
                <p className="statsInfo">{totalDayLessonsDuration()} hours total</p>
            </div>

            <div className="statsCard">
                <h3 className="statsTitle">
                    <div className="statsIconWrapper" style={{background: "#f1e6fd"}}>
                    <img src="../../../public/purplePeople.svg"/>
                    </div>
                    This week
                </h3>
                <p className="statsValue">{weekLessonsCount()}</p>
                <p className="statsInfo">lessons scheduled</p>
            </div>

            <div className="todaysSchedule">
                <h2 className="todaysScheduleTitle">
                    <img className="todaysScheduleIcon" src="../../../public/calendarBlack.svg"/>
                    Today's schedule - {`${getWeekdayString(new Date)}, ${getDateString(new Date)}`}
                </h2>
                {todayLessons.length !== 0 ? todayLessons.map(lesson => (
                        <div className="todayLessonCard">
                            <div className="iconWrapper" style={{background: lesson.card_color}}>
                                <img src="../../../public/bookIcon.svg"/>
                            </div>
                            <div className="lessonTopic">{lesson.topic}</div>
                            <div className="name">{getNameById(lesson.student_id, myStudents)}</div>
                            <div className="beginTime">{getTimeString(lesson.date)}</div>
                            <div className="lessonDurationAndPrice">{`${lesson.duration} min • ${lesson.price}`}</div>
                        </div>))
                : (
                    <div className="emptyDayScheduleMessage">You don't have lessons today</div>
                    )}
            </div>
        </main>
    )
}

export default ProfileSummary