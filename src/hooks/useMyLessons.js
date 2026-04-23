import {useEffect, useState} from "react"

function UseMyLessons() {
    const [lessonsIsLoading, setLessonsIsLoading] = useState(true);
    const [myLessons, setMyLessons] = useState([]);

    useEffect( () => {
        async function getLessons() {
            try {
                const response = await fetch("/api/lessons", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                })

                if(response.ok) {
                    const data = await response.json()
                    console.log(data.lessons)
                    setMyLessons(data.lessons || [])
                }
                else {
                    setMyLessons([])
                }
            }
            catch (error) {
                console.log(error)
                setMyLessons([])
            }
            finally {
                setLessonsIsLoading(false)
            }
        }

        getLessons()
    }, [])

    return {lessonsIsLoading, myLessons}
}

export default UseMyLessons