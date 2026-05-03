import {useEffect, useMemo, useState} from "react"
import {formatDateLocal} from "../utils/getEndTimeString.js";

function useMyLessons() {
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

    const lessonsByDate = useMemo(() => {
        return myLessons.reduce((acc, lesson) => {
            const dateKey = formatDateLocal(new Date(lesson.date))
            if(!acc[dateKey]) acc[dateKey] = []
            acc[dateKey].push(lesson)

            return acc
        }, {})
    }, [myLessons])


    return {lessonsIsLoading, myLessons, lessonsByDate}
}

export default useMyLessons