import {useChargeMutation, useWithdrawMoneyMutation} from "../../store/api/financeApi.ts";
import {useGetUserQuery} from "../../store/api/userApi.js";

export function useRenderWindowAttributes() {
    const windowAttributes = {}
    const [withdrawMoney, withdrawState] = useWithdrawMoneyMutation()
    const [charge, chargeState] = useChargeMutation()
    const {data: user} = useGetUserQuery()

    if(user?.role === "teacher") {
        windowAttributes.title = "Withdraw money"
        windowAttributes.description = "Withdraw money from your balance to your card."
        windowAttributes.action = withdrawMoney
        windowAttributes.buttonSignature = "Withdraw money"
        windowAttributes.state = withdrawState
        windowAttributes.isWithdraw = true
    }
    else {
        windowAttributes.title = "Top up balance"
        windowAttributes.description = "Add money to your balance from your card."
        windowAttributes.action = charge
        windowAttributes.buttonSignature = "Add money"
        windowAttributes.state = chargeState
        windowAttributes.isWithdraw = false
    }

    return {windowAttributes}
}