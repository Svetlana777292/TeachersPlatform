import "./TransactionCard.css"
import {useGetAllStudentsQuery} from "../../store/api/studentsApi.js";
import {
    renderTransactionAmount,
    renderTransactionIcon,
    renderTransactionName, renderTransactionStatus
} from "../TransactionsHistory/transactionUtils.jsx";
import getNameById from "../../utils/getName.ts";

const TransactionCard = ({transaction}) => {
    const {data: {students = []} = {}} = useGetAllStudentsQuery()

    console.log(transaction.amount)

    return (
        <div className="transactionCardContainer">
            {renderTransactionIcon(transaction.type)}
            <h3 className="transactionType">{renderTransactionName(transaction.type)}</h3>
            <span className="transactionSender">{getNameById(transaction.user_id, students)}</span>
            <span className="transactionTime"></span>
            {renderTransactionAmount(transaction.type, transaction.amount)}
            {renderTransactionStatus(transaction.status, transaction.type)}
        </div>
    )
}

export default TransactionCard