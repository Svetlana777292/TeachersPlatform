import "./TransactionsHistory.css"
import TransactionCard from "../TransactionCard/TransactionCard.jsx";
import {useTransactionHistory} from "./useTransactionHistory.jsx";
import {getDateString, getWeekdayString} from "../../utils/getEndTimeString.js";

const TransactionsHistory = () => {
    const {transactionsByDate} = useTransactionHistory()

    return (
        <section className="transactionHistoryContainer">
            <div className="transactionHistoryHeader">
                <h2 className="transactionHistoryTitle">Transactions history</h2>
            </div>
            {Object.entries(transactionsByDate)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([date, transactions]) => (
                <div key={date} className="transactionGroup">
                    <div className="transactionGroupDateWrapper">
                        <h4 className="transactionGroupDate">{`${getWeekdayString(new Date(date))}, ${getDateString(new Date(date))}`}</h4>
                    </div>
                    {transactions.map((transaction) => (
                        <TransactionCard key={transaction.id} transaction={transaction} />
                    ))}
                </div>
            ))}
        </section>
    )
}

export default TransactionsHistory