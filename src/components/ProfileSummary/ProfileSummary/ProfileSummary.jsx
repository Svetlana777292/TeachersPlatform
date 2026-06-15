import {
    getDateString, getTimeString,
    getWeekdayString
} from "../../../utils/getEndTimeString.js";
import "./ProfileSummary.css"
import getNameById from "../../../utils/getName.js";
import CalendarIcon from "../../../assets/CalendarIcon.jsx";
import PeopleIcon from "../../../assets/PeopleIcon.jsx";
import {useSummary} from "../../../hooks/useSummary.js";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
import SummaryLessonPreview from "../../TodaySchedulePreview/SummaryLessonPreview/SummaryLessonPreview.jsx";
import TodaySchedule from "../../TodaySchedulePreview/TodaySchedule/TodaySchedule.jsx";

const ProfileSummary = () => {
    const {myStudents} = useMyStudents()
    const {upcomingLesson,todayLessons, weekLessonsCount, totalDayLessonsDuration} = useSummary()

    return (
        <div className="profileSummaryContainer">
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
                            <p className="emptyScheduleMessage">You don't have upcoming lessons</p>
                        )
                    }
                </div>
            </section>

            <TodaySchedule />
        </div>
    )
}

export default ProfileSummary