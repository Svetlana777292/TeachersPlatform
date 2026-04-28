import "./LessonCard.css"
import {getBeginTime, getEndTime} from "../../utils/getEndTimeString.js";
import {useEffect, useState} from "react";

const LessonCard = (props) => {
    const [timeProgress, setTimeProgress] = useState(0)

    useEffect(() => {
        const dateNow = new Date().getTime()
        const beginTime = getBeginTime(props.date)
        const endTime = getEndTime(props.date, props.duration)

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
    }, [props.date, props.duration])

    const wrapperStyle = {
        background: props.color,
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
        <div className={`lessonCardWrapper ${props.className}`} style={wrapperStyle} onClick={props.onClick}>
            <h1 className="lessonTitle" style={props.isDurationShortest ? shortestCardStyleTitle : null}>{props.studentName}</h1>
            {!props.isDurationShort ? <h2 className="studentName">{props.title}</h2> : null}
            {!props.isDurationShortest ? <div className="lessonData">{`${props.beginTime} - ${props.endTime} • ${props.duration}min`}</div> : null}
        </div>
    )
}

export default LessonCard