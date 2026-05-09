import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            })
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData,
            })
        }),
        logoutUser: builder.mutation({
            query: (user) => ({
                url: '/logout',
                method: 'POST',
                body: user,
            })
        }),
        getUser: builder.query({
            query: () => "/me",
        }),
        editUser: builder.mutation({
            query: (user) => ({
                url: "/me",
                method: "PATCH",
                body: user,
            })
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useEditUserMutation
} = userApi
