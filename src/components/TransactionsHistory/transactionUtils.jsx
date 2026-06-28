import ArrowIcon from "../../assets/ArrowIcon.jsx";
import CardIcon from "../../assets/CardIcon.jsx";
import "./transactionIcons.css"

export function renderTransactionIcon(type) {
    switch (type) {
        case "TOP_UP":
        case "LESSON_INCOME":
            return <ArrowIcon className="transactionIcon topUpIcon" />
        case "LESSON_PAYMENT":
            return <ArrowIcon className="transactionIcon paymentIcon" />
        case "WITHDRAWAL":
            return <ArrowIcon className="transactionIcon withdrawIcon" />
        case "TOKENIZATION":
            return <CardIcon className="transactionIcon tokenisationIcon"/>
        default:
            return null
    }
}

export function renderTransactionName(type) {
    switch (type) {
        case "TOP_UP":
            return "Top up"
        case "LESSON_INCOME":
        case "LESSON_PAYMENT":
            return "Lesson payment"
        case "WITHDRAWAL":
            return "Withdrawal"
        case "TOKENIZATION":
            return "Bank card binding"
        default:
            return null
    }
}

export function renderTransactionAmount(type, amount) {
    switch (type) {
        case "TOP_UP":
        case "LESSON_INCOME":
            return <span className="transactionAmount incomeAmount">{`+$${amount.toString().slice(0, -2) || 0}.${amount % 100}`}</span>
        case "LESSON_PAYMENT":
        case "WITHDRAWAL":
            return <span className="transactionAmount outcomeAmount">{`-$${amount.toString().slice(0, -2) || 0}.${amount % 100}`}</span>
        default:
            return null
    }
}

export function renderTransactionStatus(status, type) {
    switch (status) {
        case "PENDING":
            return <span className="transactionStatus pendingStatus">• Pending</span>
        case "PAID":
            if(type === "TOKENIZATION" || type === "WITHDRAWAL" || type === "TOP_UP") {
                return <span className="transactionStatus paidStatus">• Success</span>
            }
            else {
                return <span className="transactionStatus paidStatus">• Paid</span>
            }
        case "REJECTED":
            return <span className="transactionStatus rejectedStatus">• Rejected</span>
    }
}



