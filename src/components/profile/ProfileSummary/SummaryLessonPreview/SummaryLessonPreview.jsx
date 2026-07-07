import getNameById from "../../../utils/getName.js";
import {getTimeString} from "../../../utils/getEndTimeString.js";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
import {useMyTeachers} from "../../../hooks/useMyTeachers.js";
import {useGetUserQuery} from "../../../store/api/userApi.js";
import "./SummaryLessonPreview.css"

const SummaryLessonPreview = ({lesson}) => {
    const {myStudents} = useMyStudents()
    const {myTeachers} = useMyTeachers()
    const {data: user} = useGetUserQuery()
    const people = user.role === 'teacher' ? myStudents : myTeachers

    return (
        <div className="today-lesson-card">
            <div className="icon-wrapper" style={{background: lesson.card_color}}>
                <img src="/bookIcon.svg" alt=""/>
            </div>
            <div className="lesson-topic">{lesson.topic}</div>
            <div className="preview-name">{getNameById(lesson.student_id, people)}</div>
            <div className="begin-time">{getTimeString(lesson.date)}</div>
            <div className="lesson-duration-and-price">{`${lesson.duration} min • ${lesson.price}`}</div>
        </div>
    )
}

export default SummaryLessonPreview