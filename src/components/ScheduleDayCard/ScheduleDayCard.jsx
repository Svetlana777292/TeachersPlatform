import "./ScheduleDayCard.css"
import LessonCard from "../LessonCard/LessonCard.jsx"
import getNameById from "../../utils/getName.js"
import UseMyStudents from "../../hooks/useMyStudents.js";

const ScheduleDayCard = ({lessons, dayLabel}) => {
    const {myStudents} = UseMyStudents()

    return (
        <div className="dayCardWrapper" >
            <h2 className="dateLabel">{dayLabel}</h2>
            {lessons.length > 0 ? (
                lessons.map((lesson) => (
                    <LessonCard
                        title={lesson.title}
                        studentName={getNameById(lesson.student_id, myStudents)}
                        key={lesson.id}
                        beginTime={lesson.date.slice(11, 16)}
                        duration={`${lesson.duration} min`}
                    />
                ))
            ) : <div className="emptyDayMessage">You haven't any lessons :(</div>}
        </div>
    )
}

export default ScheduleDayCard