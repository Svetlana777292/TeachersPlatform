import {formatDateLocal, getWeekDays} from "../utils/getEndTimeString.js";
import useMyLessons from "./useMyLessons.js";
import {
    calcTotalDayLessonsDuration,
    calcWeekLessonsCount, getTodayLessons,
    getUpcomingLesson
} from "../utils/lessonsUtils.js";
import {useMemo} from "react";

export function useSummary() {
    const { lessonsByDate } = useMyLessons()
    const currentDay = formatDateLocal(new Date())

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

    return {
        upcomingLesson,
        todayLessons,
        weekLessonsCount,
        totalDayLessonsDuration,
    }
}