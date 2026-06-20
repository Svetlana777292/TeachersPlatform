import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"

export const financeApi = createApi({
    reducerPath: 'financeApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['finance'],
    endpoints: (builder) => ({
        getFinanceStats: builder.query({
            query: (params) => `/economy/my?${params}`,
            providesTags: ['finance'],
        }),
        payForLesson:builder.mutation({
            query: (lesson_id)  => ({
                url: `/lessons/${lesson_id}`,
                method: 'POST',
            })
        }),
        getAllCards: builder.query({
            query: () => '/me/cards',
            providesTags: ['finance'],
        }),
        initCard: builder.mutation({
            query: () => ({
                url: '/me/cards',
                method: 'POST',
                invalidatesTags: ['finance'],
            })
        }),
        charge: builder.mutation({
            query: ({amount}) => ({
                url: '/payments/charge',
                method: 'POST',
                body: amount,
                invalidatesTags: ['finance'],
            })
        }),
        getBalance: builder.query({
            query: () => '/me/balance',
            providesTags: ['finance'],
        }),
        getAllTransactions: builder.query({
            query: () => '/me/transactions',
            providesTags: ['finance'],
        }),
        getTransactionById: builder.query({
            query: (transaction_id) => `/payments/transactions/${transaction_id}`,
            providesTags: ['finance'],
        }),
        deleteCard: builder.mutation({
            query: (card_id) => ({
                url: `/me/cards/${card_id}`,
                method: 'POST',
                invalidatesTags: ['finance'],
            })
        }),
    })
})

export const {
    usePayForLessonMutation,
    useGetAllCardsQuery,
    useInitCardMutation,
    useChargeMutation,
    useGetBalanceMutation,
    useGetAllTransactionsQuery,
    useGetTransactionByIdQuery,
    useDeleteCardMutation,
    useGetFinanceStatsQuery,
} = financeApi