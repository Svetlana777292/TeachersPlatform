import Header from "../../components/Header/Header.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Modal from "react-modal";
import "./StudentsList.css"
import Search from "../../components/Search/Search.jsx";
import StudentCard from "../../components/StudentCard/StudentCard.jsx";
import {useGetAllStudentsQuery} from "../../store/api/studentsApi.js";
Modal.setAppElement('#root');

const StudentsList = () => {
    const {data: { students: myStudents = [] } = {}, isLoading: studentsIsLoading} = useGetAllStudentsQuery()

    if(studentsIsLoading) return <Loading />

    return(
        <>
            <Header currentPage="My students"/>
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