import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getAllStudents: builder.query({
            query: () => '/teachers/my_students',
        }),
        addStudent: builder.mutation({
            query: (student) => ({
                url: '/me/add_student',
                method: 'POST',
                body: JSON.stringify(student),
            })
        }),
        searchStudent: builder.query({
            query: (value) => `/students/search/q?=${value}`,
        }),
        removeStudent: builder.mutation({
            query: (student) => ({
                url: '/me/students/remove_student',
                method: 'POST',
                body: student,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }),
    })
})

export const {
    useGetAllStudentsQuery,
    useAddStudentMutation,
    useSearchStudentQuery,
    useRemoveStudentMutation
} = studentsApi