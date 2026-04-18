import Header from "../../components/Header/Header.jsx";
import useUser from "../../hooks/useUser.js";
import Loading from "../../components/Loading/Loading.jsx";
import Modal from "react-modal";
import "./StudentsList.css"
import Search from "../../components/Search/Search.jsx";
import {useEffect, useState} from "react";
import StudentCard from "../../components/StudentCard/StudentCard.jsx";
Modal.setAppElement('#root');

const StudentsList = () => {
    const {user, isLoading} = useUser()
    const [studentsIsLoading, setStudentsIsLoading] = useState(true);
    const [myStudents, setMyStudents] = useState([]);

    useEffect( () => {
        async function getStudents() {
            try {
                const response = await fetch("/api/teachers/my_students", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })

                if(response.ok) {
                    const data = await response.json()
                    console.log(data.students)
                    setMyStudents(data.students || [])
                }
                else {
                    setMyStudents([])
                }
            }
            catch (error) {
                console.log(error)
                setMyStudents([])
            }
            finally {
                setStudentsIsLoading(false)
            }
        }

        getStudents()
    }, [])

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
                </aside>

                <div className="searchContainer">
                    <Search />
                </div>

                <main className="studentsListContainer">
                    <h2 className="studentsListTitle">Your students:</h2>
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