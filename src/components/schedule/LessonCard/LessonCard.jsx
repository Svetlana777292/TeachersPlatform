import "./LessonCard.css"
import {getEndTimeString, getTime, getTimeString, getEndTime} from "../../utils/getEndTimeString.js";
import {useEffect, useState} from "react";
import getNameById from "../../utils/getName.js";
import {useMyStudents} from "../../hooks/useMyStudents.js";

const LessonCard = (props) => {
    const [timeProgress, setTimeProgress] = useState(0)
    const {myStudents} = useMyStudents()


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
        <div
            className={`lesson-card-wrapper ${props.className}`}
            style={wrapperStyle}
            onClick={props.onClick}
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
                ? <h2 className="lesson-title">{props.lesson.topic}</h2>
                : null}
            {!props.isDurationShortest
                ? <div className="lesson-data">{`${getTimeString(props.lesson.date)} - ${getEndTimeString(props.lesson.date, props.lesson.duration)} • ${props.lesson.duration}min`}</div>
                : null}
        </div>
    )
}

export default LessonCard