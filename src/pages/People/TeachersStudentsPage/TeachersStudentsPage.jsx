import Header from "../../../components/Header/Header.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import Modal from "react-modal";
import "./TeachersStudentsPage.css"
import Search from "../../../components/Search/Search.jsx";
import StudentCard from "../StudentCard/StudentCard.jsx";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
Modal.setAppElement('#root');

const TeachersStudentsPage = () => {
    const {myStudents, studentsIsLoading} = useMyStudents()

    if(studentsIsLoading) return <Loading />

    return(
        <>
            <div className="studentsListPageContainer">
                <aside className="aside">
                    <section className="studentsCount">
                        Total students <span className="totalStudentsCount">{myStudents.length}</span>
                    </section>
                    <section className="studentsCount">
                        Active this month <span className="activeStudentsCount">{myStudents.length}</span>
                    </section>

                    <div className="searchContainer">
                        <Search />
                    </div>
                </aside>

                <main className="studentsListContainer">
                    <h2 className="studentsListTitle">My students:</h2>
                    <div className="studentsList">{myStudents.length > 0 ?
                        myStudents.map((student) => (
                        <StudentCard key={student.id} student={student} />)) :
                        "You don't have any students yet :("}</div>
                </main>
            </div>
        </>
    )
}
export default TeachersStudentsPage