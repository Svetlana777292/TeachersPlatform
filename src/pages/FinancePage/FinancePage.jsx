import {useMemo, useState} from "react";
import Header from "../../components/Header/Header.jsx";
import {useGetUserQuery} from "../../store/api/userApi.js";
import "./FinancePage.css"
import MoneyIcon from "../../assets/MoneyIcon.jsx";
import ChartIcon from "../../assets/ChartIcon.jsx";
import {
    useGetAllCardsQuery,
    useGetBalanceQuery,
    useGetFinanceStatsQuery,
    useInitCardMutation
} from "../../store/api/financeApi.ts";
import Button from "../../components/Button/Button.jsx";
import PaymentCardPreview from "../../components/PaymentCardPreview/PaymentCardPreview.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import BalanceTransferWindow from "../../components/BalanceTransferWindow/BalanceTransferWindow.jsx";
import {formatMoney, getDollarsPart, getCentsPart} from "../../utils/moneyUtils.ts";
import TransactionsHistory from "../../components/TransactionsHistory/TransactionsHistory.jsx";
import {toISOStringWithTZ} from "../../utils/getEndTimeString.ts";

const FinancePage = () => {
    const {data: user} = useGetUserQuery()

    const params = useMemo(() => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        return new URLSearchParams({
            period_start: toISOStringWithTZ(start),
            period_end: toISOStringWithTZ(now),
          }).toString()
    }, [])

    const {data: financeStats} = useGetFinanceStatsQuery(params)
    const [initCard] = useInitCardMutation()
    const {data: {cards = []} = {}, isLoading: isCardsLoading} = useGetAllCardsQuery()
    const {data: balance = {}, isLoading: isBalanceLoading} = useGetBalanceQuery()
    const [balanceChanging, setBalanceChanging] = useState(false)

    const sortedCards = useMemo(
        () => [...cards].sort((a, b) => Number(b.is_default) - Number(a.is_default)),
        [cards]
    )

    if (isBalanceLoading && isCardsLoading) return <Loading />

    async function addNewCard() {
        try {
            const result = await initCard().unwrap()
            window.location.href = result.redirect_url
        } catch (err) {
            console.error("Failed to init card:", err)
        }
    }

    return (
        <>
            <Header user={user} currentPage="Finance"/>
            <main className="financePageContentContainer">
                <div className="layout-container">
                    <h1 className="financePageTitle">Finance</h1>
                    <h3 className="financePageDescription">Your saved cards and full transaction history.</h3>

                    {user?.role === "teacher" ? (<section className="financeStatsContainer">
                        <article className="financeStats">
                            <MoneyIcon className="financeStatsIcon financeStatsMoneyIcon"/>
                            <h3 className="financeStatsTitle">Earned this month</h3>
                            <div className="financeStatsValue">{`$${formatMoney(financeStats?.paid_lessons_sum)}`}</div>
                        </article>

                        <article className="financeStats">
                            <ChartIcon className="financeStatsIcon financeStatsChartIcon"/>
                            <h3 className="financeStatsTitle">Payments received</h3>
                            <div className="financeStatsValue">{financeStats?.paid_lessons_count ?? 0}</div>
                        </article>
                    </section>)
                    : null}

                    <section className="balanseContainer">
                        <h3 className="balanceCardTitle"><div className="availableBalanceMarker"></div>Available balance</h3>
                        <div className="balanceAmount">
                            <span className="balanceDollars">{`$${getDollarsPart(balance.balance)}`}</span>
                            <span className="balanceCent">{`.${getCentsPart(balance.balance)}`}</span>
                        </div>
                        {user?.role !== "teacher" ? (<Button className="topUpButton" onClick={() => setBalanceChanging(true)}>+ Top up</Button>) : null}
                        {user?.role === "teacher" ? (<Button className="withdrawButton" onClick={() => setBalanceChanging(true)}>- Withdraw</Button>) : null}
                    </section>

                    <h2 className="financePaymentCardsTitle">Your payment cards</h2>
                    <section className="paymentCardsContainer">
                        {sortedCards.map((card) => (
                            <PaymentCardPreview key={card.id} card={card}/>
                        ))}
                        <Button className="addNewCard" onClick={() => addNewCard()}>
                            <span className="addNewCardSignature plus">+</span>
                            <span className="addNewCardSignature">Add new card</span>
                        </Button>
                    </section>
                    <TransactionsHistory />
                </div>
            </main>
            <BalanceTransferWindow isOpen={balanceChanging} onClose={() => setBalanceChanging(false)}/>
        </>
    )
}

export default FinancePage