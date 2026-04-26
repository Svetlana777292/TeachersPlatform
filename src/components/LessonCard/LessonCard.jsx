import "./LessonCard.css"

const LessonCard = (props) => {

    return (
        <div className={`lessonCardWrapper ${props.className}`} style={{background: props.color}} onClick={props.onClick}>
            <h1 className="lessonTitle">{props.title}</h1>
            <h2 className="studentName">{props.studentName}</h2>
            <div className="lessonData">{"at " + props.beginTime}</div>
            <div className="lessonData">{props.duration + " • " + props.price}</div>
        </div>
    )
}

export default LessonCard