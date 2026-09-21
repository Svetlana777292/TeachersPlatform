import Header from "../../components/Header/Header.jsx";
import "./StudentLessonPage.css"
import StudentLessonCardPreview from "../../components/StudentLessonCardPreview/StudentLessonCardPreview.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import useMyLessons from "../../hooks/useMyLessons.ts";

const StudentLessonPage = () => {
    const {upcomingLessons, pastLessons, lessonsIsLoading} = useMyLessons()

    if (lessonsIsLoading) return <Loading />

    return (
        <>
            <Header />
            <main className="studentLessonsPageContainer">
                <div className="layout-container">
                    <h1 className="studentLessonsPageTitle">My lessons</h1>
                    <h2 className="studentLessonsPageDescription">Review your lessons and pay for the ones that are due.</h2>

                    <section className="studentLessonsContainer">
                        <h2 className="lessonsSectionTitle">
                            Upcoming
                            <span className="lessonsCountBadge">{upcomingLessons.length}</span>
                        </h2>
                        {upcomingLessons.map(lesson => (
                            <StudentLessonCardPreview lesson={lesson}/>
                        ))}
                        <h2 className="lessonsSectionTitle">
                            Past
                            <span className="lessonsCountBadge">{pastLessons.length}</span>
                        </h2>
                        {pastLessons.map(lesson => (
                            <StudentLessonCardPreview lesson={lesson}/>
                        ))}
                    </section>
                </div>
            </main>
        </>
    )
}

export default StudentLessonPage