import {formatDateLocal, getWeekDays} from "../utils/getEndTimeString.ts";
import useMyLessons from "./useMyLessons.ts";
import {
    calcTotalDayLessonsDuration,
    calcWeekLessonsCount, getTodayLessons,
    getUpcomingLesson
} from "../utils/lessonsUtils.ts";
import {useMemo} from "react";
import {useMyStudents} from "./useMyStudents.ts"
import {useMyTeachers} from "./useMyTeachers.ts";
import {Lesson} from "../types.ts";

interface UseSummaryReturn {
    upcomingLesson?: Lesson,
    todayLessons: Lesson[],
    weekLessonsCount: number,
    totalDayLessonsDuration: number,
    studentsCount: number,
    teachersCount: number
}

export function useSummary(): UseSummaryReturn {
    const { lessonsByDate } = useMyLessons()
    const {myStudents} = useMyStudents()
    const {myTeachers} = useMyTeachers()

    const upcomingLesson = useMemo(
        () => getUpcomingLesson(lessonsByDate),
        [lessonsByDate]
    )

    const weekLessonsCount = useMemo(
        () => calcWeekLessonsCount(lessonsByDate),
        [lessonsByDate]
    )

    const totalDayLessonsDuration = useMemo(
        () => calcTotalDayLessonsDuration(lessonsByDate),
        [lessonsByDate]
    )

    const todayLessons = useMemo(
        () => getTodayLessons(lessonsByDate),
        [lessonsByDate]
    )

    const studentsCount = useMemo(
        () => myStudents?.length,
        [myStudents]
    )

    const teachersCount = useMemo(
        () => myTeachers?.length,
        [myTeachers]
    )

    return {
        upcomingLesson,
        todayLessons,
        weekLessonsCount,
        totalDayLessonsDuration,
        studentsCount,
        teachersCount
    }
}