import "./StudentLessonCardPreview.css"
import {useGetAvatarQuery} from "../../store/api/storageApi.js";
import {
    getEndTimeString,
    getTimeString,
} from "../../utils/getEndTimeString.ts";
import Button from "../Button/Button.jsx";
import {usePayForLessonMutation} from "../../store/api/financeApi.js";
import {useMyTeachers} from "../../hooks/useMyTeachers.js";
import getNameById from "../../utils/getName.ts";

function renderLessonDateBackgroundColor(cardColor) {
    switch (cardColor) {
        case "#dd24ce":
            return "#f8e9ef"
        case "#9ACD32":
            return "#f2f8e6"
        case "#4682B4":
            return "#e2f1f0"
        case "#8A2BE2":
            return "#f0e6fa"
    }
}

const StudentLessonCardPreview = ({lesson}) => {
    const {data: avatar} = useGetAvatarQuery(lesson.teacher_id)
    const [payForLesson] = usePayForLessonMutation()
    const {myTeachers} = useMyTeachers()

    console.log(lesson.date)

    return (
        <article className="studentLessonCardPreview">
            <div className="lessonDate" style={{color: lesson.card_color, background: renderLessonDateBackgroundColor(lesson.card_color)}}>
                <span className="lessonDay">{new Date(lesson.date).getDate()}</span>
                <span className="lessonMonth">{new Date(lesson.date).toLocaleString("en-US", { month: "short" }).toUpperCase()}</span>
            </div>
            <h3 className="lessonTopic">
                <div className="lessonMarker" style={{background: lesson.card_color}}></div>
                {`${lesson.topic}`}
            </h3>
            <span className="lessonDurationAndTime">
                {`${getTimeString(lesson.date)} - ${getEndTimeString(lesson.date, lesson.duration)} • ${lesson.duration} min`}
            </span>
            <div className="separator"></div>
            <div className="priceNameGroup">
                <div className="teacherGroup">
                    <img src={avatar || "/avatar.png"} alt="" className="teachersAvatar"/>
                    <span className="lessonTeacher">{getNameById(lesson.teacher_id, myTeachers)}</span>
                </div>
                <span className={`lessonPrice`}>{`$${lesson.price / 100}`}</span>
                {lesson.is_paid === false && (
                    <Button className="lessonPaymentButton" onClick={() => payForLesson(lesson.id)}>Pay</Button>
                )}
            </div>
            {lesson.is_paid === true && (
                <span className="paidLesson">✓ Paid</span>
            )}
        </article>
    )
}

export default StudentLessonCardPreview