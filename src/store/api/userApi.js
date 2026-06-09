import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['user'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['user'],
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['user'],
        }),
        verifyUser: builder.query({
            query: () => ({
                url: '/token/verify',
                method: 'POST',
            }),
            providesTags: ['user'],
        }),
        logoutUser: builder.mutation({
            query: (user) => ({
                url: '/logout',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['user'],
        }),
        getUser: builder.query({
            query: () => "/me",
            providesTags: ['user'],
        }),
        getUserById: builder.query({
            query: (id) => `/user/${id}`,
            providesTags: ['user'],
        }),
        editUser: builder.mutation({
            query: (user) => ({
                url: "/me",
                method: "PATCH",
                body: user,
            }),
            invalidatesTags: ['user'],
        })
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useVerifyUserQuery,
    useLogoutUserMutation,
    useGetUserQuery,
    useEditUserMutation
} = userApi
