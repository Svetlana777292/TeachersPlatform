import "./TransactionCard.css"
import {useGetAllStudentsQuery} from "../../store/api/studentsApi.js";

const TRANSACTION_CARD_SETTINGS = () => {

}

const TransactionCard = ({transaction}) => {
    const {dat: {students = []} = {}} = useGetAllStudentsQuery()

    return (
        <div className="transactionCardContainer">
            <div className="transactionIconWrapper"></div>
            <h3 className="transactionType">Lesson payment</h3>
                <span className="transactionSender">Иван Рубцов</span>
                <span className="transactionAmount"> $60</span>
                <span className="transactionStatus">• Paid</span>
        </div>
    )
}

export default TransactionCard