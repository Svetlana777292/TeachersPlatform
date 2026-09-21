import {useMemo} from "react"
import {formatDateLocal, getEndTime, getTime} from "../utils/getEndTimeString.ts";
import {splitLessonByDay} from "../utils/lessonsUtils.ts";
import {useGetAllLessonsQuery} from "../store/api/lessonsApi.ts";
import {Lesson, LessonsByDate} from "../types.ts";

interface UseMyLessonsReturn {
    lessonsIsLoading: boolean;
    myLessons: Lesson[];
    lessonsByDate: LessonsByDate;
    upcomingLessons: Lesson[];
    pastLessons: Lesson[];
}

function useMyLessons(): UseMyLessonsReturn {
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
        }, {} as LessonsByDate)
    }, [myLessons])

    const upcomingLessons = useMemo(
        () => myLessons.filter(lesson => getTime(lesson?.date) > new Date()),
        [myLessons]
    )

    const pastLessons = useMemo(
        () => myLessons.filter(lesson => getTime(lesson?.date) < new Date()),
        [myLessons]
    )

    return {lessonsIsLoading, myLessons, lessonsByDate, upcomingLessons, pastLessons}
}

export default useMyLessons