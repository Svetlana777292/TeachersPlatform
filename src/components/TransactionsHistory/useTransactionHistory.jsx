import {useGetAllTransactionsQuery} from "../../store/api/financeApi.js";
import {useMemo} from "react";

function useTransactionHistory() {
    const {data: {transactions = []} = {}} = useGetAllTransactionsQuery()

    const transactionsByDate = useMemo(() => {
        const grouped = {}
        for (const transaction of transactions) {
            console.log(JSON.stringify(transaction.type));
            if (transaction.type === "TOKENIZATION" && transaction.status === "PENDING") {
                continue
            }
            else {
                const dateKey = transaction.created_at.slice(0, 10)
                if (!grouped[dateKey]) grouped[dateKey] = []
                grouped[dateKey].push(transaction)
            }
        }
        return grouped
    }, [transactions])

    return { transactionsByDate }
}

export { useTransactionHistory }