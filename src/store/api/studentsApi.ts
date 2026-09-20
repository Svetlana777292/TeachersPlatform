import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"
import {Student} from "../../types.ts"

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['students', 'teachers'],
    endpoints: (builder) => ({
        getAllStudents: builder.query<{students: Student[]}, void>({
            query: () => '/teachers/my_students',
            providesTags: ['students']
        }),
        addStudent: builder.mutation<{ students: Student[] }, number>({
            query: (student_id) => ({
                url: '/me/add_student',
                method: 'POST',
                body: {student_id: student_id},
            }),
            invalidatesTags: ['students', 'teachers'],
        }),
        searchStudent: builder.query<{ total: number, skip: number, limit: number, students: Student[] }, string>({
            query: (value) => `/students/search?q=${value}`,
            providesTags: ['students'],
        }),
        removeStudent: builder.mutation<{students: Student[]}, number>({
            query: (student_id) => ({
                url: '/me/students/remove_student',
                method: 'POST',
                body: {student_id: student_id},
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ['students', 'teachers'],
        }),
    })
})

export const {
    useGetAllStudentsQuery,
    useAddStudentMutation,
    useSearchStudentQuery,
    useRemoveStudentMutation
} = studentsApi