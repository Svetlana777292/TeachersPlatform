import "./LessonCard.css"
import {getEndTimeString, getTime, getTimeString, getEndTime} from "../../utils/getEndTimeString.ts";
import {useEffect, useState} from "react";
import getNameById from "../../utils/getName.ts";
import {useMyStudents} from "../../hooks/useMyStudents.js";
import CreateLessonWindow from "../CreateLessonWindow/CreateLessonWindow.jsx";

const LessonCard = (props) => {
    const [timeProgress, setTimeProgress] = useState(0)
    const {myStudents} = useMyStudents()
    const [editingLesson, setEditingLesson] = useState(null)

    useEffect(() => {
        const dateNow = new Date().getTime()
        const beginTime = getTime(props.lesson.date)
        const endTime = getEndTime(props.lesson.date, props.lesson.duration)

        const updateProgress = () => {
            if(dateNow >= beginTime && dateNow <= endTime) {
                const progress = ((dateNow - beginTime) / (endTime - beginTime)) * 100
                setTimeProgress(progress)
            }
            else if (dateNow > endTime) {
                setTimeProgress(100)
            }
            else {
                setTimeProgress(0)
            }
        }

        updateProgress()
        const interval = setInterval(updateProgress, 1000)

        return () => clearInterval(interval)
    }, [props.lesson.date, props.lesson.duration])

    const wrapperStyle = {
        background: props.lesson.card_color,
        paddingTop: props.paddingTop,
        justifyContent: props.textPosition,
        backgroundImage: `linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0.5) ${timeProgress}%,
        transparent ${timeProgress}%,
        transparent 100%
        )`
    }

    const shortestCardStyleTitle = {
        fontSize: "0.8rem",
        fontWeight: "500"
    }

    return (
        <>
            <div
                className={`lessonCardWrapper ${props.className}`}
                style={wrapperStyle}
                onClick={() => setEditingLesson(props.lesson)}
            >
                <h1
                    className="name"
                    style={props.isDurationShortest
                        ? shortestCardStyleTitle
                        : null}
                >
                    {getNameById(props.lesson.student_id, myStudents)}
                </h1>
                {!props.isDurationShort
                    ? <h2 className="lessonTitle">{props.lesson.topic}</h2>
                    : null}
                {!props.isDurationShortest
                    ? <div className="lessonData">{`${getTimeString(props.lesson.date)} - ${getEndTimeString(props.lesson.date, props.lesson.duration)} • ${props.lesson.duration}min`}</div>
                    : null}
            </div>
            <CreateLessonWindow
                isOpen={editingLesson !== null}
                onClose={() => setEditingLesson(null)}
                title="Edit Lesson"
                onSubmitText="Save changes"
                fieldsValues={editingLesson}
                isEditing={true}
                lesson_id={props.lesson.id}
            />
        </>
    )
}

export default LessonCard