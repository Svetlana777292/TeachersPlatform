import {useEffect, useState} from "react"

function useMyStudents() {
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

    return {studentsIsLoading, myStudents}
}

export default useMyStudents