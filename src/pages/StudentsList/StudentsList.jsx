import Header from "../../components/Header/Header.jsx";
import useUser from "../../hooks/useUser.js";
import Loading from "../../components/Loading/Loading.jsx";
import Modal from "react-modal";
import "./StudentsList.css"
import Search from "../../components/Search/Search.jsx";
import StudentCard from "../../components/StudentCard/StudentCard.jsx";
import useMyStudents from "../../hooks/useMyStudents.js";
Modal.setAppElement('#root');

const StudentsList = () => {
    const {user, isLoading} = useUser()
    const {myStudents, studentsIsLoading} = useMyStudents()

    if (!user) return null

    if(isLoading) return <Loading />
    if(studentsIsLoading) return <Loading />

    return(
        <>
            <Header user={user}/>
            <div className="container">
                <aside className="aside">
                    <h1 className="studentsCount">
                        Total students <span className="studentsDigit">{myStudents.length}</span>
                    </h1>

                    <div className="searchContainer">
                        <Search />
                    </div>
                </aside>

                <main className="studentsListContainer">
                    <h2 className="studentsListTitle">My students:</h2>
                    <div className="studentsList">{myStudents.length > 0 ?
                        myStudents.map((student) => (
                        <StudentCard student={student} />)) :
                        "You don't have any students yet :("}</div>
                </main>
            </div>
        </>
    )
}
export default StudentsList