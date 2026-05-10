import "./SchedulePage.css"
import Header from "../../components/Header/Header.jsx";
import ScheduleList from "../../components/ScheduleList/ScheduleList.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root")

const SchedulePage = () => {

    return(
        <>
            <Header currentPage="Schedule"/>
            <div className="page-container">
                <div className="schedule-container">
                    <ScheduleList />
                </div>
            </div>
        </>
    )
}

export default SchedulePage