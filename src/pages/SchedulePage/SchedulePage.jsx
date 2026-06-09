import "./SchedulePage.css"
import Header from "../../components/Header/Header.jsx";
import ScheduleList from "../../components/ScheduleList/ScheduleList.jsx";
import Modal from "react-modal";
import {useGetUserQuery} from "../../store/api/userApi.js";
import StudentsTeachers from "../People/StudentsTeachersPage/StudentsTeachers.jsx";

Modal.setAppElement("#root")

const SchedulePage = () => {
    const {data: user} = useGetUserQuery()
    const isTeacher = user?.role === 'teacher'

    return(
        <>
            <Header currentPage="Schedule"/>
            {!isTeacher ? (<StudentsTeachers />) : null}
            <div className="page-container">
                <div className="schedule-container">
                    <ScheduleList isTeacher={isTeacher}/>
                </div>
            </div>
        </>
    )
}

export default SchedulePage