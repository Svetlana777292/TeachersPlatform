import "./LessonCard.css"

const LessonCard = (props) => {
    return (
        <div className="lessonCardWrapper" style={{background: `${props.color}`}}>
            <h1 className="lessonTitle">{props.title}</h1>
            <h2 className="studentName">{props.studentName}</h2>
            <div className="timeData">{props.beginTime + " - " + props.duration}</div>
        </div>
    )
}

export default LessonCard