import Header from "../../../components/shared/Header/Header.jsx";
import Loading from "../../../components/shared/Loading/Loading.jsx";
import Modal from "react-modal";
import "./TeachersStudentsPage.css"
import Search from "../../../components/people/Search/Search.jsx";
import StudentCard from "../../../components/people/StudentCard/StudentCard.jsx";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
import {useSummary} from "../../../hooks/useSummary.js";
import PeopleIcon from "../../../assets/icons/PeopleIcon.jsx";
import ChartIcon from "../../../assets/icons/ChartIcon.jsx";
Modal.setAppElement('#root');

const TeachersStudentsPage = () => {
    const {myStudents, studentsIsLoading} = useMyStudents()

    if(studentsIsLoading) return <Loading />

    return(
        <>
            <div className="students-list-page-container layout-container">
                <h1 className="students-list-title">My students</h1>
                <p className="students-page-description">Overview of everyone you currently teach.</p>
                <aside className="aside">
                    <section className="students-count">
                        <PeopleIcon className="teachers-students-count-icon"/><span className="total-students-card-title">Total students</span> <span className="total-students-count">{myStudents.length}</span>
                    </section>
                    <section className="students-count">
                        <ChartIcon className="teachers-active-students-count-icon"/><span className="total-active-students-card-title">Active this month</span> <span className="active-students-count">{myStudents.length}</span>
                    </section>

                    <div className="search-container">
                        <Search />
                    </div>
                </aside>

                <main className="students-list-container">
                    <div className="students-list">{myStudents.length > 0 ?
                        myStudents.map((student) => (
                        <StudentCard key={student.id} student={student} />)) :
                        "You don't have any students yet :("}</div>
                </main>
            </div>
        </>
    )
}
export default TeachersStudentsPage