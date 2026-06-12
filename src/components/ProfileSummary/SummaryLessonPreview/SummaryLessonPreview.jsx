import getNameById from "../../../utils/getName.js";
import {getTimeString} from "../../../utils/getEndTimeString.js";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
import {useMyTeachers} from "../../../hooks/useMyTeachers.js";
import {useGetUserQuery} from "../../../store/api/userApi.js";
import "./SummaryLessonPreview.css"
import BookIcon from "../../../../public/BookIcon.jsx";

const SummaryLessonPreview = ({lesson}) => {
    const {myStudents} = useMyStudents()
    const {myTeachers} = useMyTeachers()
    const {data: user} = useGetUserQuery()
    const people = user.role === 'teacher' ? myStudents : myTeachers

    return (
        <div className="todayLessonCard">
            <div className="iconWrapper" style={{background: lesson.card_color}}>
                <BookIcon className="bookIcon"/>
            </div>
            <div className="lessonTopic">{lesson.topic}</div>
            <div className="previewName">{getNameById(lesson.student_id, people)}</div>
            <div className="beginTime">{getTimeString(lesson.date)}</div>
            <div className="lessonDurationAndPrice">{`${lesson.duration} min • ${lesson.price}`}</div>
        </div>
    )
}

export default SummaryLessonPreview