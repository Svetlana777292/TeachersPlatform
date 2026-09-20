import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithReauth } from "./baseQueryWithReauth.js"
import {Card, Lesson, Transaction} from "../../types.ts";

export const financeApi = createApi({
    reducerPath: 'financeApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['finance', 'user'],
    endpoints: (builder) => ({
        getFinanceStats: builder.query({
            query: (params) => `/economy/my?${params}`,
            providesTags: ['finance'],
        }),
        payForLesson: builder.mutation<Lesson, number>({
            query: (lesson_id)  => ({
                url: `/lessons/${lesson_id}`,
                method: 'POST',
            })
        }),
        getAllCards: builder.query<{cards: Card[]}, void>({
            query: () => '/me/cards',
            providesTags: ['finance'],
        }),
        initCard: builder.mutation<{redirect_url: string, token: string}, void>({
            query: () => ({
                url: '/me/cards',
                method: 'POST',
            }),
            invalidatesTags: ['finance'],
        }),
        charge: builder.mutation<{status: string, detail: string, amount: number},{amount: number}>({
            query: ({amount}) => ({
                url: '/payments/charge',
                method: 'POST',
                body: {amount},
            }),
            invalidatesTags: ['finance'],
        }),
        getBalance: builder.query<{user_id: number, balance: number},void>({
            query: () => '/me/balance',
            providesTags: ['finance'],
        }),
        getAllTransactions: builder.query<{transactions: Transaction[]}, void>({
            query: () => '/me/transactions',
            providesTags: ['finance'],
        }),
        getTransactionById: builder.query<Transaction, number>({
            query: (transaction_id) => `/payments/transactions/${transaction_id}`,
            providesTags: ['finance'],
        }),
        deleteCard: builder.mutation<{ cards: Card[] }, number>({
            query: (card_id) => ({
                url: `/me/cards/${card_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['finance'],
        }),
        makeCardDefault: builder.mutation<{cards: Card[]}, number>({
            query: (card_id) => ({
                url: `/me/cards/${card_id}`,
                method: 'POST',
            }),
            invalidatesTags: ['finance'],
        }),
        withdrawMoney: builder.mutation<string, {amount: number}>({
            query: ({amount}) => ({
                url: '/payments/withdrawal',
                body: {amount},
                method: 'POST',
            }),
            invalidatesTags: ['finance', 'user'],
        }),
    })
})

export const {
    usePayForLessonMutation,
    useGetAllCardsQuery,
    useInitCardMutation,
    useChargeMutation,
    useWithdrawMoneyMutation,
    useGetBalanceQuery,
    useGetAllTransactionsQuery,
    useGetTransactionByIdQuery,
    useDeleteCardMutation,
    useMakeCardDefaultMutation,
    useGetFinanceStatsQuery,
} = financeApi