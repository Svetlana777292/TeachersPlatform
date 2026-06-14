import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)

    if (result.error?.status === 401) {
        const refreshResult = await baseQuery(
            { url: '/token/get', method: 'POST' },
            api,
            extraOptions
        )

        if (!refreshResult.error) {
            // refresh удался — повторяем исходный запрос
            result = await baseQuery(args, api, extraOptions)
        }
        // refresh не удался — оставляем 401 как есть:
        // verifyUser завершится с isSuccess:false, и ProtectedRoute сам редиректит на /login
    }

    return result
}
