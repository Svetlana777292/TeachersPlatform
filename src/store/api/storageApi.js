import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const storageApi = createApi({
    reducerPath: "storageApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        setAvatar: builder.mutation({
            query: (photo) => ({
                url: '/storage/avatar',
                method: 'POST',
                body: photo
            }),
        }),
        getAvatar: builder.query({
            query: (userId) => `/storage/avatar/${userId}`,
        })
    })
})

export const {
    useSetAvatarMutation,
    useGetAvatarQuery,
} = storageApi
