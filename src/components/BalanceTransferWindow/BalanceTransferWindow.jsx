import "./BalanceTransferWindow.css"
import Modal from "react-modal";
import {useState} from "react";
import {VisaIcon} from "../../assets/Visa.jsx";
import {MastercardIcon} from "../../assets/Mastercard.jsx";
import {useGetAllCardsQuery, useGetBalanceQuery} from "../../store/api/financeApi.js";
import Button from "../Button/Button.jsx";
import {useRenderWindowAttributes} from "./useRenderWindowAttributes.js";
import {toast} from "react-toastify";
import {formatMoney} from "../../utils/moneyUtils.js";
import ErrorField from "../ErrorField/ErrorField.jsx";

function renderCardBrandIcon(brand) {
    switch (brand) {
        case "visa":
            return <VisaIcon className="moneyDealBrandIcon"/>
        case "mastercard":
            return <MastercardIcon className="moneyDealBrandIcon"/>
        default:
            return null
    }
}

const BalanceTransferWindow = ({isOpen, onClose}) => {
    const {data: balance} = useGetBalanceQuery()
    const balanceAmount = balance?.balance ?? 0
    const [amount, setAmount] = useState("")
    const {data: {cards = []} = {}} = useGetAllCardsQuery()
    const defaultCard = cards.find((card) => card.is_default) ?? cards[0]
    const {windowAttributes} = useRenderWindowAttributes()
    const {isLoading} = windowAttributes.state
    const notEnoughBalance = windowAttributes.isWithdraw && amount * 100 > balanceAmount

    function handleClose() {
        onClose()
        setAmount("")
    }

    async function handleSubmit() {
        try {
            await windowAttributes.action(amount * 100).unwrap()
            handleClose()
        } catch (error) {
            toast.error(error?.data?.message ?? "Failed to complete the operation.")
        }
    }

    return (
        <Modal className="modalWindow moneyDealModalWindow" isOpen={isOpen} onRequestClose={onClose}>
            <div className="moneyDealWindowHeader">
                <h2 className="moneyDealWindowTitle">{windowAttributes.title}</h2>
                <Button className="cancelMoneyDealWindowButton" onClick={() => handleClose()}><span className="crossSign">×</span></Button>
            </div>
            <h3 className="moneyDealWindowDescription">{windowAttributes.description}</h3>

            <ErrorField errorMessage={notEnoughBalance && (
                <>Not enough balance — you can withdraw up to <b>{`$${formatMoney(balanceAmount)}`}</b>.</>
            )} />
            <label className="moneyDealWindowInputLabel">
                AMOUNT
                <div className="amountField">
                    <span className="amountPrefix">$</span>
                    <input
                        type="number"
                        placeholder="0"
                        className="moneyDealWindowInput"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </label>

            {defaultCard ? (
                <div className="moneyDealPaymentMethod">
                    <div className="moneyDealCardThumb"></div>
                    <div className="moneyDealCardInfo">
                        <span className="moneyDealCardNumber">{`•• ${defaultCard.last_numbers}`}</span>
                    </div>
                    {renderCardBrandIcon(defaultCard.brand)}
                </div>
            )
            : <span className="noCardsMessage"></span>}

            <Button className="moneyDealSubmitButton" disabled={!amount || Number(amount) <= 0 || !defaultCard || isLoading || notEnoughBalance} onClick={() => handleSubmit()}>{windowAttributes.buttonSignature}</Button>
        </Modal>
    )
}

export default BalanceTransferWindow
