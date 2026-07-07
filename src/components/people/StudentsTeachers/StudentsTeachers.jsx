import {useMyTeachers} from "../../../hooks/useMyTeachers.js";
import TeacherCard from "../TeachersCard/TeacherCard.jsx";
import "./StudentsTeachers.css"

const StudentsTeachers = () => {
    const {teachersCount, myTeachers} = useMyTeachers()

    return (
        <>
            <div className="teachers-list-page-container layout-container">
                <aside className="aside">
                    <section className="teachers-count">
                        Total teachers <span className="total-teachers-count">{teachersCount}</span>
                    </section>
                </aside>

                <main className="teachers-list-container">
                    <h2 className="teachers-list-title">My teachers:</h2>
                    <div className="teachers-list">{teachersCount > 0 ?
                        myTeachers.map((teacher) => (
                            <TeacherCard key={teacher.id} teacher={teacher} />)) :
                        "You don't have any teachers yet :("}</div>
                </main>
            </div>
        </>
    )
}

export default StudentsTeachers