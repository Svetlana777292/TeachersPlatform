import "./SchedulePage.css"
import useUser from "../../hooks/useUser.js";
import Loading from "../../components/Loading/Loading.jsx";
import Header from "../../components/Header/Header.jsx";
import ScheduleList from "../../components/ScheduleList/ScheduleList.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root")

const SchedulePage = () => {
    const {user, isLoading} = useUser()

    if (!user) return null

    if(isLoading) return <Loading />

    return(
        <>
            <Header currentPage="Schedule" user={user}/>
            <div className="page-container">
                <div className="schedule-container">
                    <ScheduleList />
                </div>
            </div>
        </>
    )
}

export default SchedulePage