import Header from "../../components/Header/Header.jsx";
import {useGetUserQuery} from "../../store/api/userApi.js";
import "./FinancePage.css"
import MoneyIcon from "../../assets/MoneyIcon.jsx";
import ChartIcon from "../../assets/ChartIcon.jsx";
import {useGetFinanceStatsQuery} from "../../store/api/financeApi.js";
import TransactionCard from "../../components/TransactionCard/TransactionCard.jsx";

const now = new Date()
const start = new Date(now.getFullYear(), now.getMonth(), 1)

const params = new URLSearchParams({
    period_start: start.toISOString(),
    period_end: now.toISOString(),
}).toString()

const FinancePage = () => {
    const {data: user} = useGetUserQuery()
    const {data: financeStats} = useGetFinanceStatsQuery(params)

    return (
        <>
            <Header user={user} currentPage="Finance"/>
            <main className="financePageContentContainer">
                <div className="layout-container">
                    <h1 className="financePageTitle">Finance</h1>
                    <h3 className="financePageDescription">Your saved cards and full transaction history.</h3>

                    <section className="financeStatsContainer">
                        <article className="financeStats">
                            <MoneyIcon className="financeStatsIcon financeStatsMoneyIcon"/>
                            <h3 className="financeStatsTitle">Earned this month</h3>
                            <div className="financeStatsValue">{financeStats?.paid_lessons_count ?? 0}</div>
                        </article>

                        <article className="financeStats">
                            <ChartIcon className="financeStatsIcon financeStatsChartIcon"/>
                            <h3 className="financeStatsTitle">Payments received</h3>
                            <div className="financeStatsValue">0</div>
                        </article>
                    </section>

                    <section>
                        <h2 className="financePaymentCardsTitle">Your payment cards</h2>
                    </section>
                    <section className="transactionHistoryContainer">
                        <h2 className="financePaymentCardsTitle">Your transactions history</h2>
                        <TransactionCard />
                    </section>
                </div>
            </main>
        </>
    )
}

export default FinancePage