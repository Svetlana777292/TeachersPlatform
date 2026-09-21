import "./ScheduleDayCard.css"
import LessonCard from "../LessonCard/LessonCard.jsx"
import getNameById from "../../utils/getName.ts"
import {getTimeString, getEndTimeString} from "../../utils/getEndTimeString.ts";
import {useMyStudents} from "../../hooks/useMyStudents.ts";

const ScheduleDayCard = ({lessons, dayLabel, setEditingLesson, isTeacher, creatingLesson}) => {
    const {myStudents} = useMyStudents()

    return (
        <>
            <div className="dayCardWrapper" >
                <h2 className="dayLabel">{dayLabel}</h2>
                <div className="lessonsWrapper">
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
                                creatingLesson={creatingLesson}
                            />
                        ))
                    ) : <div className="emptyDayMessage">You haven't any lessons :(</div>}
                </div>

            </div>
        </>
    )
}

export default ScheduleDayCard