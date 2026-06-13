import {formatDateLocal} from "../../utils/getEndTimeString.js";
import ScheduleDayCard from "../ScheduleDayCard/ScheduleDayCard.jsx";
import useMyLessons from "../../hooks/useMyLessons.js";
import {WEEK_DAYS} from "./scheduleConstants.js";

const ScheduleMobile = ({days, setEditingLesson, isTeacher}) => {
    const {lessonsByDate} = useMyLessons()

    function renderScheduleCards() {
        return Array.from({length: 7}, (_, i) => {
            const dayKey = formatDateLocal(days[i])
            const dayLessons = lessonsByDate[dayKey] || []
            dayLessons.sort((a, b) => new Date(a.date) - new Date(b.date))
            const currentDay = new Date()
            const dayLabel = days[i].toDateString() === currentDay.toDateString()
                ? `Today, ${WEEK_DAYS[i]},  ${days[i].toLocaleDateString()}`
                : `${WEEK_DAYS[i]},  ${days[i].toLocaleDateString()}`

            return (
                <ScheduleDayCard
                    lessons={dayLessons}
                    dayLabel={dayLabel}
                    key={dayKey}
                    setEditingLesson={setEditingLesson}
                    isTeacher={isTeacher}
                />
            )
        })
    }

    return (
        <section className="scheduleMain sheduleMobile">
            {renderScheduleCards()}
        </section>
    )
}

export default ScheduleMobile
