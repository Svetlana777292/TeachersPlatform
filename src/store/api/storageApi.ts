import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const storageApi = createApi({
    reducerPath: "storageApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        setAvatar: builder.mutation<{file_type: string, file_name: string, file_id: number, storage_key: string}, FormData>({
            query: (photo) => ({
                url: '/storage/avatar',
                method: 'POST',
                body: photo
            }),
        }),
        getAvatar: builder.query<{url: string}, number>({
            query: (userId) => `/storage/avatar/${userId}`,
        })
    })
})

export const {
    useSetAvatarMutation,
    useGetAvatarQuery,
} = storageApi
