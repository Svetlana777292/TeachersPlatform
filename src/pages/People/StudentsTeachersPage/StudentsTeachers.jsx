import {useMyTeachers} from "../../../hooks/useMyTeachers.js";
import TeacherCard from "../TeachersCard/TeacherCard.jsx";
import "./StudentsTeachers.css"

const StudentsTeachers = () => {
    const {teachersCount, myTeachers} = useMyTeachers()

    return (
        <>
            <div className="teachersListPageContainer">
                <aside className="aside">
                    <section className="teachersCount">
                        Total teachers <span className="totalTeachersCount">{teachersCount}</span>
                    </section>
                </aside>

                <main className="teachersListContainer">
                    <h2 className="teachersListTitle">My teachers:</h2>
                    <div className="teachersList">{teachersCount > 0 ?
                        myTeachers.map((teacher) => (
                            <TeacherCard key={teacher.id} teacher={teacher} />)) :
                        "You don't have any teachers yet :("}</div>
                </main>
            </div>
        </>
    )
}

export default StudentsTeachers