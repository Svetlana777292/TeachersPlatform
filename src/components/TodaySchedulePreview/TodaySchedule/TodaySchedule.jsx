import CalendarIcon from "../../../assets/CalendarIcon.jsx"
import "./TodaySchedule.css"
import {getDateString, getWeekdayString} from "../../../utils/getEndTimeString.js";
import {useSummary} from "../../../hooks/useSummary.js";
import BookIcon from "../../../assets/BookIcon.jsx";
import SummaryLessonPreview from "../SummaryLessonPreview/SummaryLessonPreview.jsx";
import useIsDesktop from "../../../hooks/useIsDesktop.js";

const TodaySchedule = () => {
    const {todayLessons} = useSummary()
    const {isDesktop} = useIsDesktop()

    function renderTodaysLessonsCount(){
        switch (todayLessons.length) {
            case 0:
                return isDesktop ? "No lessons today" : 0
            case 1:
                return isDesktop ? "1 lesson" : 1
            default:
                return isDesktop ? `${todayLessons.length} lessons` : `${todayLessons.length}`
        }
    }

    return (
        <section className="todayScheduleContainer">
            <div className="todayScheduleHeader">
                <div className="todayScheduleTitleWrapper">
                    <CalendarIcon className="todaysScheduleIcon"/>
                    <h2 className="todaysScheduleTitle">Today's schedule</h2>
                    <h3 className="todaysScheduleDate">{`${getWeekdayString(new Date())}, ${getDateString(new Date)}`}</h3>
                </div>
                <div className="todaysLessonsCount">
                    <BookIcon className="todaysLessonsCountIcon"/>
                    {renderTodaysLessonsCount()}
                </div>
            </div>
            <div className="todaysLessons">
                {todayLessons.length > 0
                    ? todayLessons.map(lesson => (
                    <SummaryLessonPreview lesson={lesson}/>))
                    : <div className="noLessonsMessage">No lessons yet</div>
                }
            </div>
        </section>
    )
}

export default TodaySchedule