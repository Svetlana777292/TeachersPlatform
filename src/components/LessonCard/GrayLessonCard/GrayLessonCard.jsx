import getNameById from "../../../utils/getName.js";
import {getTimeString} from "../../../utils/getEndTimeString.js";

const GrayLessonCard = ({lesson, myStudents}) => {
    return (
        <div className="todayLessonCard">
            <div className="iconWrapper" style={{background: lesson.card_color}}>
                <img src="../../../public/bookIcon.svg"/>
            </div>
            <div className="lessonTopic">{lesson.topic}</div>
            <div className="name">{getNameById(lesson.student_id, myStudents)}</div>
            <div className="beginTime">{getTimeString(lesson.date)}</div>
            <div className="lessonDurationAndPrice">{`${lesson.duration} min • ${lesson.price}`}</div>
        </div>
    )
}

export default GrayLessonCard