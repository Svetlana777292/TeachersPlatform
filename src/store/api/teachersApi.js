import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const teachersApi = createApi({
    reducerPath: 'teachersApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['teachers'],
    endpoints: (builder) => ({
        getAllTeachers: builder.query({
            query: () => '/students/my_teachers',
            providesTags: ['teachers']
        }),
    })
})

export const {
    useGetAllTeachersQuery,
} = teachersApi