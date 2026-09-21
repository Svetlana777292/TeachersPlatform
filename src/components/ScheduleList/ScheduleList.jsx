import Button from "../Button/Button.jsx";
import {useState} from "react";
import "./ScheduleList.css"
import CreateLessonWindow from "../CreateLessonWindow/CreateLessonWindow.jsx";
import useMyLessons from "../../hooks/useMyLessons.ts";
import Loading from "../Loading/Loading.jsx";
import {getWeekDays} from "../../utils/getEndTimeString.ts";
import ScheduleMobile from "./ScheduleMobile.jsx";
import ScheduleDesktop from "./ScheduleDesktop.jsx";
import useIsDesktop from "../../hooks/useIsDesktop.js";

const ScheduleList = ({isTeacher}) => {
    const [weekOffset, setWeekOffset] = useState(0)
    const [creatingLesson, setCreatingLesson] = useState(false)
    const {lessonsIsLoading} = useMyLessons()
    const {isDesktop} = useIsDesktop()

    if (lessonsIsLoading) return <Loading message="Loading your shedule.."/>

    const days = getWeekDays(weekOffset)
    const firstDay = days[0]
    const lastDay = days[6]

    return (
        <div className="scheduleContainer">
            <aside className="scheduleNavigation">
                <div className="scheduleHeader">
                    <h1 className="scheduleTitle">My Schedule</h1>
                    <h2 className="current-week">{firstDay.toLocaleDateString()} - {lastDay.toLocaleDateString()}</h2>
                </div>
                <div className="weeks-switcher">
                    <Button className="week-switch-button prev" onClick={() => setWeekOffset(weekOffset - 1)}>{isDesktop ? "⬅ Prev" : "Previous week"}</Button>
                    <Button className="week-switch-button next" onClick={() => setWeekOffset(weekOffset + 1)}>{isDesktop ? "Next ⮕" : "Next week"}</Button>
                    {isTeacher ? (
                        <Button className="add-lesson-btn" onClick={() => setCreatingLesson(true)}>{isDesktop ? "Add lesson" : "+"}</Button>)
                    : null}
                </div>
            </aside>
            { !isDesktop ? (
                <ScheduleMobile days={days} creatingLesson={creatingLesson} isTeacher={isTeacher}/>
            ) : (
                <ScheduleDesktop days={days} creatingLesson={creatingLesson} isTeacher={isTeacher}/>
            )}
            <CreateLessonWindow
                isOpen={creatingLesson}
                onClose={() => setCreatingLesson(false)}
                title="Create Lesson"
                onSubmitText="Create Lesson"
            />
        </div>
    )
}

export default ScheduleList