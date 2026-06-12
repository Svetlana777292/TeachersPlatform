import Header from "../../../components/Header/Header.jsx";
import Loading from "../../../components/Loading/Loading.jsx";
import Modal from "react-modal";
import "./TeachersStudentsPage.css"
import Search from "../../../components/Search/Search.jsx";
import StudentCard from "../StudentCard/StudentCard.jsx";
import {useMyStudents} from "../../../hooks/useMyStudents.js";
import {useSummary} from "../../../hooks/useSummary.js";
import PeopleIcon from "../../../../public/PeopleIcon.jsx";
import ChartIcon from "../../../../public/ChartIcon.jsx";
Modal.setAppElement('#root');

const TeachersStudentsPage = () => {
    const {myStudents, studentsIsLoading} = useMyStudents()

    if(studentsIsLoading) return <Loading />

    return(
        <>
            <div className="studentsListPageContainer layout-container">
                <h1 className="studentsListTitle">My students</h1>
                <p className="studentsPageDescription">Overview of everyone you currently teach.</p>
                <aside className="aside">
                    <section className="studentsCount">
                        <PeopleIcon className="teachersStudentsCountIcon"/><span className="totalStudentsCardTitle">Total students</span> <span className="totalStudentsCount">{myStudents.length}</span>
                    </section>
                    <section className="studentsCount">
                        <ChartIcon className="teachersActiveStudentsCountIcon"/><span className="totalActiveStudentsCardTitle">Active this month</span> <span className="activeStudentsCount">{myStudents.length}</span>
                    </section>

                    <div className="searchContainer">
                        <Search />
                    </div>
                </aside>

                <section className="studentsListContainer">
                    <div className="studentsList">{myStudents.length > 0 ?
                        myStudents.map((student) => (
                        <StudentCard key={student.id} student={student} />)) :
                        "You don't have any students yet :("}</div>
                </section>
            </div>
        </>
    )
}
export default TeachersStudentsPage