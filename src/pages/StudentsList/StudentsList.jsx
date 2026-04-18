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

    const students = null

    return(
        <>
            <Header user={user}/>
            <div className="container">
                <aside className="aside">
                    <h1 className="studentsCount">
                        Total students: 0
                    </h1>
                </aside>

                <div className="searchContainer">
                    <Search />
                </div>

                <main className="studentsListContainer">
                    <h2 className="studentsListTitle">Your students:</h2>
                    <div className="studentsList">{students ? "Students List" : "You don't have any students yet :("}</div>
                </main>
            </div>
        </>
    )
}

export default StudentsList