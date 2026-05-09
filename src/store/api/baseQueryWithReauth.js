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

        if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}
