import "./ScheduleDayCard.css"
import LessonCard from "../LessonCard/LessonCard.jsx"
import getNameById from "../../utils/getName.js"
import {getTimeString, getEndTimeString} from "../../utils/getEndTimeString.js";
import {useMyStudents} from "../../hooks/useMyStudents.js";

const ScheduleDayCard = ({lessons, dayLabel, setEditingLesson, isTeacher}) => {
    const {myStudents} = useMyStudents()

    return (
        <>
            <div className="day-card-wrapper" >
                <h2 className="day-label">{dayLabel}</h2>
                <div className="lessons-wrapper">
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <LessonCard
                                lesson={lesson.originalLesson ?? lesson}
                                color={lesson.card_color}
                                title={lesson.topic}
                                studentName={getNameById(lesson.student_id, myStudents)}
                                key={lesson.id}
                                date={lesson.date}
                                beginTime={getTimeString(lesson.date)}
                                endTime={getEndTimeString(lesson.date, lesson.duration)}
                                duration={lesson.duration}
                                price={lesson.price}
                                onClick={() => {
                                    isTeacher ? setEditingLesson(lesson.originalLesson ?? lesson) : null
                                }}
                            />
                        ))
                    ) : <div className="empty-day-message">You haven't any lessons :(</div>}
                </div>

            </div>
        </>
    )
}

export default ScheduleDayCard