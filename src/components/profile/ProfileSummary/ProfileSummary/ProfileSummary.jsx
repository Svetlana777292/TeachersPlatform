import {
    getDateString, getTimeString,
    getWeekdayString
} from "../../../utils/getEndTimeString.js";
import "./ProfileSummary.css"
import getNameById from "../../../utils/getName.js";
import CalendarIcon from "../../../assets/icons/CalendarIcon.jsx";
import PeopleIcon from "../../../assets/icons/PeopleIcon.jsx";
import {useSummary} from "../../../hooks/useSummary.js";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
import SummaryLessonPreview from "../SummaryLessonPreview/SummaryLessonPreview.jsx";

const ProfileSummary = () => {
    const {myStudents} = useMyStudents()
    const {upcomingLesson,todayLessons, weekLessonsCount, totalDayLessonsDuration,} = useSummary()

    return (
        <div className="profile-summary-container">
            <section className="statistics">
                <div className="stats-card">
                    <h3 className="stats-title">
                        <div className="stats-icon-wrapper" style={{background: "#D9E8FCFF"}}>
                            <CalendarIcon className="calendar-stats-icon"/>
                        </div>
                        Today's Lessons
                    </h3>
                    {todayLessons.length !== 0
                        ? (<>
                            <p className="stats-value">{todayLessons.length}</p>
                            <p className="stats-info">{totalDayLessonsDuration} hours total</p>
                        </>)
                        : (
                            <p className="empty-schedule-message">You don't have lessons today</p>
                        )
                }
                </div>

                <div className="stats-card">
                    <h3 className="stats-title">
                        <div className="stats-icon-wrapper" style={{background: "#f1e6fd"}}>
                        <PeopleIcon className="week-lessons-stats-icon"/>
                        </div>
                        This week
                    </h3>
                    {weekLessonsCount !== 0
                        ? (<>
                            <p className="stats-value">{weekLessonsCount}</p>
                            <p className="stats-info">lesson scheduled</p>
                        </>)
                        : (
                            <p className="empty-schedule-message">You don't have lessons this week</p>
                        )
                    }
                </div>

                <div className="stats-card">
                    <h3 className="stats-title">
                        <div className="stats-icon-wrapper" style={{background: "#f1e6fd"}}>
                            <PeopleIcon className="week-lessons-stats-icon"/>
                        </div>
                        Next lesson
                    </h3>
                    {upcomingLesson
                        ? (<>
                            <p className="stats-value">{getTimeString(upcomingLesson.date)}</p>
                            <p className="stats-info">{`${getWeekdayString(new Date(upcomingLesson.date))}, ${getDateString(new Date(upcomingLesson.date))}`}</p>
                            <p className="stats-info">{getNameById(upcomingLesson.student_id, myStudents)}</p>
                        </>)
                        : (
                            <p className="empty-schedule-message">You don't have upcoming lessons</p>
                        )
                    }
                </div>
            </section>

            <div className="todays-schedule">
                <h2 className="todays-schedule-title">
                    <CalendarIcon className="todays-schedule-icon"/>
                    Today's schedule - {`${getWeekdayString(new Date())}, ${getDateString(new Date)}`}
                </h2>
                {todayLessons.length !== 0 ? todayLessons.map(lesson => (
                        <SummaryLessonPreview lesson={lesson}/>))
                : (
                    <p className="empty-schedule-message">You don't have lessons today</p>
                    )}
            </div>
        </div>
    )
}

export default ProfileSummary