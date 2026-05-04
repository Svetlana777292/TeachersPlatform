import {useEffect, useMemo, useState} from "react"
import {formatDateLocal, getEndTime, getTime} from "../utils/getEndTimeString.js";
import {splitLessonByDay} from "../utils/lessonsUtils.js";

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

        const processedLessons = myLessons.flatMap(lesson => {
            const beginTime = getTime((lesson?.date))
            const endTime = getEndTime((lesson?.date), lesson?.duration)

            return splitLessonByDay(lesson, beginTime, endTime)
        })

        return processedLessons.reduce((acc, lesson) => {
            const dateKey = formatDateLocal(new Date(lesson.date))
            if(!acc[dateKey]) acc[dateKey] = []
            acc[dateKey].push(lesson)

            return acc
        }, {})
    }, [myLessons])


    return {lessonsIsLoading, myLessons, lessonsByDate}
}

export default useMyLessons