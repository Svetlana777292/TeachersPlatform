import {formatDateLocal, getWeekDays} from "../utils/getEndTimeString.js";
import useMyLessons from "./useMyLessons.js";
import {
    calcTotalDayLessonsDuration,
    calcWeekLessonsCount, getTodayLessons,
    getUpcomingLesson
} from "../utils/lessonsUtils.js";
import {useMemo} from "react";
import {useMyStudents} from "./useMyStudents.js";

export function useSummary() {
    const { lessonsByDate } = useMyLessons()
    const currentDay = formatDateLocal(new Date())
    const {myStudents} = useMyStudents()

    const upcomingLesson = useMemo(
        () => getUpcomingLesson(lessonsByDate),
        [lessonsByDate]
    )

    const weekLessonsCount = useMemo(
        () => calcWeekLessonsCount(lessonsByDate, getWeekDays(0)),
        [lessonsByDate]
    )

    const totalDayLessonsDuration = useMemo(
        () => calcTotalDayLessonsDuration(lessonsByDate, currentDay),
        [lessonsByDate, currentDay]
    )

    const todayLessons = useMemo(
        () => getTodayLessons(lessonsByDate),
        [lessonsByDate]
    )

    const studentsCount = useMemo(
        () => myStudents?.length,
        [myStudents]
    )

    return {
        upcomingLesson,
        todayLessons,
        weekLessonsCount,
        totalDayLessonsDuration,
        studentsCount,
    }
}