import Button from "../Button/Button.jsx";
import {useState} from "react";
import "./ScheduleList.css"
import Select from "react-select"
import InputField from "../Inputs/InputField.jsx";

const ScheduleList = (props) => {
    const [weekOffset, setWeekOffset] = useState(0)
    const [creatingLesson, setCreatingLesson] = useState(false)

    function getMonday(weekOffset){
        const today = new Date()
        const day = today.getDay()
        const monday = new Date(today)
        monday.setDate(today.getDate() - day + 1 + weekOffset * 7)
        return monday
    }

    function getWeekDays(weekOffset){
        const monday = getMonday(weekOffset)
        return Array.from({length: 7}, (_, i) => {
            const day = new Date(monday)
            day.setDate(monday.getDate()  + i)
            return day
        })
    }

    const days = getWeekDays(weekOffset)
    const firstDay = days[0]
    const lastDay = days[6]
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    function renderScheduleCards(){
        return Array.from({length: 7}, (_, i) =>
            (<div className="scheduleCard">
                <h3 style={{fontWeight: 500}}>
                    {`${weekDays[i]}, ${days[i].toLocaleDateString()}`}
                </h3>

                <div style={{color: "#515151"}}>No lessons scheduled</div>
            </div>)
        )
    }

    const scheduleCards = renderScheduleCards()

    return (
        <>
            <h1 className="schedule-title">My Schedule</h1>
            <h2 className="current-week">{firstDay.toLocaleDateString()} - {lastDay.toLocaleDateString()}</h2>
            <div className="weeks-switcher">
                <Button className="week-switch-button" onClick={() => setWeekOffset(weekOffset - 1)}>Previous week</Button>
                <Button className="week-switch-button" onClick={() => setWeekOffset(weekOffset + 1)}>Next week</Button>
                <Button className="add-lesson-btn" onClick={() => setCreatingLesson(true)}>+</Button>
            </div>
                <div>
                    {scheduleCards}
                </div>
        </>
    )
}

export default ScheduleList