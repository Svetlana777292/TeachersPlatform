import Header from "../../../components/shared/Header/Header.jsx";
import {useGetUserQuery} from "../../../store/api/userApi.js";
import StudentsTeachers from "../../../components/people/StudentsTeachers/StudentsTeachers.jsx";
import TeachersStudentsPage from "../TeachersStudentsPage/TeachersStudentsPage.jsx";

const PeoplePage = () => {
    const {data: user} = useGetUserQuery()
    const isTeacher = user?.role === 'teacher'
    const currentPage = isTeacher ? 'My students' : 'My teachers'
    console.log(isTeacher)

    return (
        <>
            <Header user={user} currentPage={currentPage}/>
            <main>
                {isTeacher ? <TeachersStudentsPage /> : <StudentsTeachers />}
            </main>
        </>
    )
}

export default PeoplePage