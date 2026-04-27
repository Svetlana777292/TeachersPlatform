import "./ScheduleDayCard.css"
import LessonCard from "../LessonCard/LessonCard.jsx"
import getNameById from "../../utils/getName.js"
import UseMyStudents from "../../hooks/useMyStudents.js";
import {useState} from "react";
import CreateLessonWindow from "../CreateLessonWindow/CreateLessonWindow.jsx";
import {getBeginTime, getScheduleTime} from "../../utils/getScheduleTime.js";

const ScheduleDayCard = ({lessons, dayLabel}) => {
    const {myStudents} = UseMyStudents()
    const [editingLesson, setEditingLesson] = useState(null)

    return (
        <>
            <div className="dayCardWrapper" >
                <h2 className="dayLabel">{dayLabel}</h2>
                <div className="lessonsWrapper">
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <LessonCard
                                color={lesson.card_color}
                                title={lesson.topic}
                                studentName={getNameById(lesson.student_id, myStudents)}
                                key={lesson.id}
                                beginTime={getBeginTime(lesson.date)}
                                endTime={getScheduleTime(lesson.date, lesson.duration)}
                                duration={`${lesson.duration} min`}
                                price={lesson.price}
                                onClick={() => {
                                    setEditingLesson(lesson)
                                    console.log(lesson)
                                }}
                            />
                        ))
                    ) : <div className="emptyDayMessage">You haven't any lessons :(</div>}
                </div>

            </div>
            <CreateLessonWindow
                method="PATCH"
                apiPath={`lessons/${editingLesson?.id}`}
                key={editingLesson?.key}
                isOpen={editingLesson !== null}
                onClose={() => setEditingLesson(null)}
                title="Edit Lesson"
                onSubmitText="Save changes"
                fieldsValues={editingLesson}
                isEditing={editingLesson !== null}
            />
        </>
    )
}

export default ScheduleDayCard