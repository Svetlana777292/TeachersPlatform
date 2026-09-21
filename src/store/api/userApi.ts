import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"
import {User} from "../../types.ts";

interface RegisterData {
    username: string;
    email: string;
    role: "teacher" | "student";
    name: string;
    surname: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
    role: "teacher" | "student";
    long_login: boolean;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['user'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<User, RegisterData>({
            query: (userData) => ({
                url: '/register',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['user'],
        }),
        loginUser: builder.mutation<string, LoginData>({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['user'],
        }),
        verifyUser: builder.query<{valid: boolean, username: string}, void>({
            query: () => ({
                url: '/token/verify',
                method: 'POST',
            }),
            providesTags: ['user'],
        }),
        logoutUser: builder.mutation<string, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['user'],
        }),
        getUser: builder.query<User, void>({
            query: () => "/me",
            providesTags: ['user'],
        }),
        getUserById: builder.query<User, number>({
            query: (id) => `/user/${id}`,
            providesTags: ['user'],
        }),
        editUser: builder.mutation<User, Omit<User, "id" | "isActive" | "createdAt">>({
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
