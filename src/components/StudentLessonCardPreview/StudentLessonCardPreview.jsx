import "./StudentLessonCardPreview.css"
import {useGetAvatarQuery} from "../../store/api/storageApi.js";
import {
    getDateString,
    getEndTimeString,
    getTimeString,
    getWeekdayString
} from "../../utils/getEndTimeString.js";
import Button from "../Button/Button.jsx";
import getNameById from "../../utils/getName.js";
import {useMyTeachers} from "../../hooks/useMyTeachers.js";

const StudentLessonCardPreview = ({lesson}) => {
    const {data: avatar} = useGetAvatarQuery(lesson.teacher_id)

    return (
        <article className="studentLessonCardPreview">
            <img src={avatar || "/avatar.png"} alt="" className="teachersAvatar"/>
            <h3 className="lessonTopic">
                <div className="lessonMarker" style={{background: lesson.card_color}}></div>
                {`${lesson.topic}`}
            </h3>
            <span className="lessonDate">
                {`${getWeekdayString(new Date(lesson.date))}, ${getDateString(new Date(lesson.date))} • ${getTimeString(lesson.date)} - ${getEndTimeString(lesson.date, lesson.duration)}`}
            </span>
            <div className="separator"></div>
            <span className="lessonPrice">{`$${lesson.price}`}</span>
            {lesson.is_paid === true && (
                <span className="paidLesson">✓ Paid</span>
            )}
            {lesson.is_paid === false && (
                <Button className="lessonPaymentButton">{`Pay ${lesson.price}`}</Button>
            )}
        </article>
    )
}

export default StudentLessonCardPreview