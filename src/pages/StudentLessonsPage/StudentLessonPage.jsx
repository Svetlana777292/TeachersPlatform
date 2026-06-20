import Header from "../../components/Header/Header.jsx";
import "./StudentLessonPage.css"
import {useGetAllLessonsQuery} from "../../store/api/lessonsApi.js";
import SummaryLessonPreview from "../../components/TodaySchedulePreview/SummaryLessonPreview/SummaryLessonPreview.jsx";
import StudentLessonCardPreview from "../../components/StudentLessonCardPreview/StudentLessonCardPreview.jsx";

const StudentLessonPage = () => {
    const {data: {lessons = []} = {}} = useGetAllLessonsQuery()

    return (
        <>
            <Header />
            <main className="studentLessonsPageContainer">
                <h1 className="studentLessonsPageTitle">My lessons</h1>
                <h2 className="studentLessonsPageDescription">Review your lessons and pay for the ones that are due.</h2>

                <section className="studentLessonsContainer">
                    {lessons.map(lesson => (
                        <StudentLessonCardPreview lesson={lesson}/>
                    ))}
                </section>
            </main>
        </>
    )
}

export default StudentLessonPage