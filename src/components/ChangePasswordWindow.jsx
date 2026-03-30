import InputField from "./InputField.jsx";
import ErrorField from "./ErrorField.jsx";
import Button from "./Button.jsx";

const ChangePasswordWindow = () => {
    return(
        <section id="changePasswordWindow" className="change-password">
            <h2 className="change-password-title">Смена пароля</h2>
            <InputField label="Новый пароль" value="" type="password" className="info-areas" />
            <InputField label="Подтвердите новый пароль" value="" type="password" className="info-areas" />
            <ErrorField />
            <div id="cancelChangingPasswordBtn" className="password-btns">
                <Button type="button" className="cancelBtn">Отмена</Button>
                <Button type="submit" className="confirm-changes-btn btn">Сменить пароль</Button>
            </div>
        </section>
    )
}

export default ChangePasswordWindow