import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const lessonsApi = createApi({
    reducerPath: 'lessonsApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllLessons: builder.query({
            query: () => '/lessons',
        }),
        createLesson: builder.mutation({
            query: (lessonData) => ({
                url: '/lessons',
                method: 'POST',
                body: JSON.stringify(lessonData),
            })
        }),
        editLesson: builder.mutation({
            query: (lessonData, lessonId) => ({
                url: `/lessons/${lessonId}`,
                method: 'PATCH',
                body: JSON.stringify(lessonData),
            })
        })
    })
})

export const {
    useGetAllLessonsQuery,
    useCreateLessonMutation,
    useEditLessonMutation
} = lessonsApi