import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"
import {Teacher} from "../../types.ts";

export const teachersApi = createApi({
    reducerPath: 'teachersApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['teachers'],
    endpoints: (builder) => ({
        getAllTeachers: builder.query<{teachers: Teacher[]}, void>({
            query: () => '/students/my_teachers',
            providesTags: ['teachers']
        }),
    })
})

export const {
    useGetAllTeachersQuery,
} = teachersApi