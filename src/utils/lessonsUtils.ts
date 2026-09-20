import {formatDateLocal, getWeekDays} from "./getEndTimeString.ts";
import {Lesson, LessonsByDate} from "../types.ts";

export const getTodayLessons = (lessons: LessonsByDate): Lesson[] | [] => {
    const today = formatDateLocal(new Date())

    return lessons[today] || []
}

export const calcWeekLessonsCount = (lessonsByDate: LessonsByDate): number => {
    let count = 0

    const weekdays = getWeekDays(0)

    for (let weekday of weekdays) {
        const dateString = formatDateLocal(weekday)
        const dayLessons = lessonsByDate[dateString]
        if (dayLessons) {
            dayLessons.forEach(lesson => {
                if(lesson.splitPart && lesson.splitPart === 1) {
                    count -= 1
                }
            })
            count += dayLessons.length
        }
    }

    return count
}

export const calcTotalDayLessonsDuration = (lessonsByDate: LessonsByDate): number => {
    let totalHours = 0
    const currentDay = formatDateLocal(new Date())

    if(lessonsByDate[currentDay]){
        for (const lesson of lessonsByDate[currentDay]) {
            totalHours += lesson.duration
        }
    }

    return Math.round(totalHours / 60 * 10) / 10
}

export function getUpcomingLesson(lessons: LessonsByDate): Lesson | undefined {
    const closestScheduledDay = Object.keys(lessons)
        .filter(key => new Date(key).getDate() >= new Date().getDate())
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .at(0)

    if(!closestScheduledDay) return undefined

    return lessons[closestScheduledDay].find(lesson => new Date(lesson.date).getTime() >= new Date().getTime())
}

export function splitLessonByDay(lesson: Lesson, beginTime: Date, endTime: Date): Lesson | Array<Lesson> {
    const start = new Date(beginTime)
    const end = new Date(endTime)

    if(start.toDateString() === end.toDateString()) {
        return lesson
    }

    const endOfFirstDay = new Date(start)
    endOfFirstDay.setHours(23, 59, 59, 999)

    const startOfNextDay = new Date(end)
    startOfNextDay.setHours(0, 0, 0, 0)

    return [
        {
            ...lesson,
            duration: (endOfFirstDay.getTime() - start.getTime()) / 1000 / 60,
            isSplit: true,
            splitPart: 1,
            originalLesson: lesson
        },
        {
            ...lesson,
            date: startOfNextDay.toISOString(),
            duration: (end.getTime() - startOfNextDay.getTime()) / 1000 / 60,
            isSplit: true,
            splitPart: 2,
            originalLesson: lesson
        }
    ]
}
