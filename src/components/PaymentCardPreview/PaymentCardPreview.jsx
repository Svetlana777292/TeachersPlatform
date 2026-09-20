import "./PaymentCardPreview.css"
import {VisaIcon} from "../../assets/Visa.jsx";
import {MastercardIcon} from "../../assets/Mastercard.jsx";
import {useGetUserQuery} from "../../store/api/userApi.js";
import Button from "../Button/Button.jsx";
import {useMakeCardDefaultMutation} from "../../store/api/financeApi.ts";

function renderCardBrandIcon(brand) {
    switch (brand) {
        case "visa":
            return <VisaIcon className="cardBrandIcon"/>
        case "mastercard":
            return <MastercardIcon className="cardBrandIcon"/>
    }
}

const PaymentCardPreview = ({card}) => {
    const {data: user} = useGetUserQuery()
    const [makeCardDefault] = useMakeCardDefaultMutation()
    console.log(card.isDefault)

    return (
        <article className="cardWrapper">
            {!card.is_default && (<Button className="defaultCard defaultCardButton" onClick={() => makeCardDefault(card.id)}>Make default</Button>)}
            {card.is_default && (<span className="defaultCard defaultCardMarker">✓ Default</span>)}
            <div className="cardChip"><div className="cardChipContour"></div></div>
            <span className="cardNumber">{`•••• •••• •••• ${card.last_numbers}`}</span>
            <div className="expireDateContainer">
                <span className="expireSignature">EXPIRES</span>
                <span className="expireDate">{`${card.exp_month}/${(card.exp_year).toString().slice(2,4)}`}</span>
            </div>
            <span className="cardHandlerName">{`${user.name.slice(0, 1)}. ${user.surname.toUpperCase()}`}</span>
            {renderCardBrandIcon(card.brand)}
        </article>
    )
}

export default PaymentCardPreview