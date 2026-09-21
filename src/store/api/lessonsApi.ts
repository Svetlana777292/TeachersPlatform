import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"
import {Lesson} from "../../types.ts";

export const lessonsApi = createApi({
    reducerPath: 'lessonsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['lessons'],
    endpoints: (builder) => ({
        getAllLessons: builder.query<{ lessons: Lesson[] }, void>({
            query: () => '/lessons',
            providesTags: ['lessons'],
        }),
        createLesson: builder.mutation<Lesson, Omit<Lesson, 'id'>>({
            query: (lessonData) => ({
                url: '/lessons',
                method: 'POST',
                body: lessonData,
            }),
            invalidatesTags: ['lessons'],
        }),
        editLesson: builder.mutation<Lesson, Lesson>({
            query: ({id, ...lessonData}) => ({
                url: `/lessons/${id}`,
                method: 'PATCH',
                body: lessonData,
            }),
            invalidatesTags: ['lessons'],
        }),
        deleteLesson: builder.mutation<string, number>({
            query: (lesson_id) => ({
                url: `/lessons/${lesson_id}`,
                method: 'DELETE',
            })
        })
    })
})

export const {
    useGetAllLessonsQuery,
    useCreateLessonMutation,
    useEditLessonMutation,
    useDeleteLessonMutation,
} = lessonsApi