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

            return (
                <ScheduleDayCard
                    lessons={dayLessons}
                    dayLabel={`${WEEK_DAYS[i]},  ${days[i].toLocaleDateString()}`}
                    key={dayKey}
                    setEditingLesson={setEditingLesson}
                    isTeacher={isTeacher}
                />
            )
        })
    }

    return (
        <main className="schedule-main">
            {renderScheduleCards()}
        </main>
    )
}

export default ScheduleMobile
