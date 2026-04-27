import "./LessonCard.css"

const LessonCard = (props) => {

    const wrapperStyle = {background: props.color, paddingTop: props.paddingTop, justifyContent: props.textPosition}
    const shortestCardStyleTitle = {fontSize: "0.8rem", fontWeight: "500"}

    return (
        <div className={`lessonCardWrapper ${props.className}`} style={wrapperStyle} onClick={props.onClick}>
            <h1 className="lessonTitle" style={props.isDurationShortest ? shortestCardStyleTitle : null}>{props.studentName}</h1>
            {!props.isDurationShort ? <h2 className="studentName">{props.title}</h2> : null}
            {!props.isDurationShortest ? <div className="lessonData">{`${props.beginTime} - ${props.endTime} • ${props.duration}`}</div> : null}
        </div>
    )
}

export default LessonCard