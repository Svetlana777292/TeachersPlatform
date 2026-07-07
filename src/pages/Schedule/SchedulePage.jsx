import "./SchedulePage.css"
import Header from "../../components/shared/Header/Header.jsx";
import ScheduleList from "../../components/schedule/ScheduleList/ScheduleList.jsx";
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
            <main>
                {!isTeacher ? (<StudentsTeachers />) : null}
                <div className="page-container layout-container">
                    <div className="schedule-container">
                        <ScheduleList isTeacher={isTeacher}/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SchedulePage