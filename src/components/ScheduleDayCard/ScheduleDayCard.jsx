import "./ScheduleDayCard.css"
import LessonCard from "../LessonCard/LessonCard.jsx"
import getNameById from "../../utils/getName.js"
import UseMyStudents from "../../hooks/useMyStudents.js";
import {useState} from "react";
import CreateLessonWindow from "../CreateLessonWindow/CreateLessonWindow.jsx";
import {getBeginTimeString, getEndTimeString} from "../../utils/getEndTimeString.js";

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
                                date={lesson.date}
                                beginTime={getBeginTimeString(lesson.date)}
                                endTime={getEndTimeString(lesson.date, lesson.duration)}
                                duration={lesson.duration}
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