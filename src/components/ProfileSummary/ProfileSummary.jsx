import {
    getDateString, getTimeString,
    getWeekdayString
} from "../../utils/getEndTimeString.js";
import "./ProfileSummary.css"
import getNameById from "../../utils/getName.js";
import useMyStudents from "../../hooks/useMyStudents.js";
import CalendarIcon from "../../../public/CalendarIcon.jsx";
import PeopleIcon from "../../../public/PeopleIcon.jsx";
import {useSummary} from "../../hooks/useSummary.js";

const ProfileSummary = () => {

    const {myStudents} = useMyStudents()
    const {upcomingLesson,todayLessons, weekLessonsCount, totalDayLessonsDuration,} = useSummary()

    return (
        <main className="profileSummaryContainer">
            <section className="statistics">
                <div className="statsCard">
                    <h3 className="statsTitle">
                        <div className="statsIconWrapper" style={{background: "#D9E8FCFF"}}>
                            <CalendarIcon className="calendarStatsIcon"/>
                        </div>
                        Today's Lessons
                    </h3>
                    {todayLessons.length !== 0
                        ? (<>
                            <p className="statsValue">{todayLessons.length}</p>
                            <p className="statsInfo">{totalDayLessonsDuration} hours total</p>
                        </>)
                        : (
                            <p className="emptyScheduleMessage">You don't have lessons today</p>
                        )
                }
                </div>

                <div className="statsCard">
                    <h3 className="statsTitle">
                        <div className="statsIconWrapper" style={{background: "#f1e6fd"}}>
                        <PeopleIcon className="weekLessonsStatsIcon"/>
                        </div>
                        This week
                    </h3>
                    {weekLessonsCount !== 0
                        ? (<>
                            <p className="statsValue">{weekLessonsCount}</p>
                            <p className="statsInfo">lesson scheduled</p>
                        </>)
                        : (
                            <p className="emptyScheduleMessage">You don't have lessons this week</p>
                        )
                    }
                </div>

                <div className="statsCard">
                    <h3 className="statsTitle">
                        <div className="statsIconWrapper" style={{background: "#f1e6fd"}}>
                            <PeopleIcon className="weekLessonsStatsIcon"/>
                        </div>
                        Next lesson
                    </h3>
                    {upcomingLesson
                        ? (<>
                            <p className="statsValue">{getTimeString(upcomingLesson.date)}</p>
                            <p className="statsInfo">{`${getWeekdayString(new Date(upcomingLesson.date))}, ${getDateString(new Date(upcomingLesson.date))}`}</p>
                            <p className="statsInfo">{getNameById(upcomingLesson.student_id, myStudents)}</p>
                        </>)
                        : (
                            <p className="emptyScheduleMessage">You don't have lessons today</p>
                        )
                    }
                </div>
            </section>

            <div className="todaysSchedule">
                <h2 className="todaysScheduleTitle">
                    <CalendarIcon className="todaysScheduleIcon"/>
                    Today's schedule - {`${getWeekdayString(new Date())}, ${getDateString(new Date)}`}
                </h2>
                {todayLessons.length !== 0 ? todayLessons.map(lesson => (
                        <div className="todayLessonCard">
                            <div className="iconWrapper" style={{background: lesson.card_color}}>
                                <img src="bookIcon.svg"/>
                            </div>
                            <div className="lessonTopic">{lesson.topic}</div>
                            <div className="name">{getNameById(lesson.student_id, myStudents)}</div>
                            <div className="beginTime">{getTimeString(lesson.date)}</div>
                            <div className="lessonDurationAndPrice">{`${lesson.duration} min • ${lesson.price}`}</div>
                        </div>))
                : (
                    <p className="emptyScheduleMessage">You don't have lessons today</p>
                    )}
            </div>
        </main>
    )
}

export default ProfileSummary