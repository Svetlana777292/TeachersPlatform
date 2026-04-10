import "./SchedulePage.css"
import useUser from "../../hooks/useUser.js";
import Loading from "../../components/Loading/Loading.jsx";
import Header from "../../components/Header/Header.jsx";
import ScheduleList from "../../components/ScheduleList/ScheduleList.jsx";

const SchedulePage = () => {
    const {user, isLoading} = useUser()

    if (!user) return null

    if(isLoading) return <Loading />

    return(
        <div className="page-container">
            <Header user={user}/>
            <div className="schedule-container">
                <ScheduleList />
            </div>
        </div>
    )
}

export default SchedulePage