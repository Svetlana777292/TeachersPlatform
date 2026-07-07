import Button from "../Button/Button.jsx";
import {useEffect, useState} from "react";
import "./ScheduleList.css"
import CreateLessonWindow from "../CreateLessonWindow/CreateLessonWindow.jsx";
import useMyLessons from "../../hooks/useMyLessons.js";
import Loading from "../Loading/Loading.jsx";
import {getWeekDays} from "../../utils/getEndTimeString.js";
import ScheduleMobile from "./ScheduleMobile.jsx";
import ScheduleDesktop from "./ScheduleDesktop.jsx";

const ScheduleList = ({isTeacher}) => {
    const [weekOffset, setWeekOffset] = useState(0)
    const [creatingLesson, setCreatingLesson] = useState(false)
    const [editingLesson, setEditingLesson] = useState(null)
    const {lessonsIsLoading} = useMyLessons()
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024)
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    if (lessonsIsLoading) return <Loading message="Loading your shedule.."/>

    const days = getWeekDays(weekOffset)
    const firstDay = days[0]
    const lastDay = days[6]

    return (
        <div className="schedule-list-container">
            <aside className="schedule-navigation">
                <div className="schedule-header">
                    <h1 className="schedule-title">My Schedule</h1>
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
                <ScheduleMobile days={days} setEditingLesson={setEditingLesson} isTeacher={isTeacher}/>
            ) : (
                <ScheduleDesktop days={days} setEditingLesson={setEditingLesson} isTeacher={isTeacher}/>
            )}
            <CreateLessonWindow
                isOpen={creatingLesson}
                onClose={() => setCreatingLesson(false)}
                title="Create Lesson"
                onSubmitText="Create Lesson"
            />
            <CreateLessonWindow
                isOpen={editingLesson !== null}
                onClose={() => setEditingLesson(null)}
                title="Edit Lesson"
                onSubmitText="Save changes"
                fieldsValues={editingLesson}
                isEditing={true}
            />
        </div>
    )
}

export default ScheduleList