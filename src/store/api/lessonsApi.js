import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const lessonsApi = createApi({
    reducerPath: 'lessonsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['lessons'],
    endpoints: (builder) => ({
        getAllLessons: builder.query({
            query: () => '/lessons',
            providesTags: ['lessons'],
        }),
        createLesson: builder.mutation({
            query: (lessonData) => ({
                url: '/lessons',
                method: 'POST',
                body: lessonData,
            }),
            invalidatesTags: ['lessons'],
        }),
        editLesson: builder.mutation({
            query: ({id, ...lessonData}) => ({
                url: `/lessons/${id}`,
                method: 'PATCH',
                body: lessonData,
            }),
            invalidatesTags: ['lessons'],
        }),
        deleteLesson: builder.mutation({
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