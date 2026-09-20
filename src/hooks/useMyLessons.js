import {useMemo} from "react"
import {formatDateLocal, getEndTime, getTime} from "../utils/getEndTimeString.ts";
import {splitLessonByDay} from "../utils/lessonsUtils.ts";
import {useGetAllLessonsQuery} from "../store/api/lessonsApi.ts";

function useMyLessons() {
    const {data: { lessons: myLessons = [] } = {}, isLoading: lessonsIsLoading} = useGetAllLessonsQuery()

    const lessonsByDate = useMemo(() => {

        const processedLessons = myLessons.flatMap(lesson => {
            const beginTime = getTime((lesson?.date))
            const endTime = getEndTime((lesson?.date), lesson?.duration)

            return splitLessonByDay(lesson, beginTime, endTime)
        })

        return processedLessons?.reduce((acc, lesson) => {
            const dateKey = formatDateLocal(new Date(lesson.date))
            if(!acc[dateKey]) acc[dateKey] = []
            acc[dateKey].push(lesson)

            return acc
        }, {})
    }, [myLessons])

    const upcomingLessons = useMemo(
        () => myLessons.filter(lesson => getTime(lesson?.date) > new Date().getTime()),
        [myLessons]
    )

    const pastLessons = useMemo(
        () => myLessons.filter(lesson => getTime(lesson?.date) < new Date().getTime()),
        [myLessons]
    )

    return {lessonsIsLoading, myLessons, lessonsByDate, upcomingLessons, pastLessons}
}

export default useMyLessons