import getNameById from "../../../utils/getName.ts";
import {getEndTimeString, getTimeString} from "../../../utils/getEndTimeString.ts";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
import {useMyTeachers} from "../../../hooks/useMyTeachers.js";
import {useGetUserQuery} from "../../../store/api/userApi.js";
import "./SummaryLessonPreview.css"
import BookIcon from "../../../assets/BookIcon.jsx";

const SummaryLessonPreview = ({lesson}) => {
    const {myStudents} = useMyStudents()
    const {myTeachers} = useMyTeachers()
    const {data: user} = useGetUserQuery()
    const people = user.role === 'teacher' ? myStudents : myTeachers

    return (
        <>
            <div className="todayLessonCard" style={{borderLeft: `5px solid ${lesson.card_color}`}}>
                <div className="iconWrapper" style={{background: lesson.card_color}}>
                    <BookIcon className="bookIcon"/>
                </div>
                <div className="lessonTopic">{lesson.topic}</div>
                <div className="previewName">{getNameById(lesson.student_id, people)}</div>
                <div className="lessonTimePeriod">{`${getTimeString(lesson.date)} - ${getEndTimeString(lesson.date, lesson.duration)}`}</div>
                <div className="lessonDuration">{`${lesson.duration} min`}</div>
            </div>
        </>
    )
}

export default SummaryLessonPreview