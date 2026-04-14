import Header from "../../components/Header/Header.jsx";
import useUser from "../../hooks/useUser.js";
import Loading from "../../components/Loading/Loading.jsx";
import Modal from "react-modal";
import "./StudentsList.css"
import CreateLessonWindow from "../../components/CreateLessonWindow/CreateLessonWindow.jsx";

Modal.setAppElement('#root');

const StudentsList = () => {
    const {user, isLoading} = useUser()

    if (!user) return null

    if(isLoading) return <Loading />

    return(
        <div className="page-container">
            <Header user={user}/>

        </div>
    )
}

export default StudentsList