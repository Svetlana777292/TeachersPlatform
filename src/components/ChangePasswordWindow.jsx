import InputField from "./InputField.jsx";
import ErrorField from "./ErrorField.jsx";
import Button from "./Button.jsx";
import Modal from "react-modal";
import '../pages/ProfilePage.css';

const ChangePasswordWindow = (props) => {

    return(
        <>
            <Modal className="change-password" onRequestClose={props.onClose} isOpen={props.isOpen} >
                <h2 className="change-password-title">Смена пароля</h2>
                <InputField label="Новый пароль" value="" type="password" className="info-areas" />
                <InputField label="Подтвердите новый пароль" value="" type="password" className="info-areas" />
                <ErrorField />
                <div className="password-btns">
                    <Button type="button" className="btn cancelBtn" onClick={props.onClose}>Отмена</Button>
                    <Button type="submit" className="confirm-changes-btn btn">Сменить пароль</Button>
                </div>
            </Modal>
        </>
    )
}

export default ChangePasswordWindow