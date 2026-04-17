import Header from "../../components/Header/Header.jsx";
import useUser from "../../hooks/useUser.js";
import Loading from "../../components/Loading/Loading.jsx";
import Modal from "react-modal";
import "./StudentsList.css"
import Search from "../../components/Search/Search.jsx";
Modal.setAppElement('#root');

const StudentsList = () => {
    const {user, isLoading} = useUser()

    if (!user) return null

    if(isLoading) return <Loading />

    return(
        <>
            <Header user={user}/>
            <div className="container">
                <Search />
            </div>
        </>
    )
}

export default StudentsList