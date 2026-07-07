import InputField from "../../shared/Inputs/InputField.jsx";
import ErrorField from "../../shared/ErrorField/ErrorField.jsx";
import Button from "../../shared/Button/Button.jsx";
import Modal from "react-modal";
import '../../../pages/Profile/ProfilePage.css';
import {useState} from "react";
import "./ChangePasswordWindow.css"
import {useEditUserMutation} from "../../../store/api/userApi.js";

const ChangePasswordWindow = (props) => {
    const [error, setError] = useState(null)
    const [newPassword, setNewPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    })
    const [editUser, {error: serverError}] = useEditUserMutation()

    const handleChange = (e) => {
            setNewPassword({
            ...newPassword,
            [e.target.name]: e.target.value
        })
    }

    function validatePassword() {
        if (newPassword.newPassword === '') {
            return 'Password is required'
        }
        else if (newPassword.newPassword !== newPassword.confirmPassword) {
            return 'Passwords do not match'
        }
        else if (newPassword.newPassword.length < 8) {
            return 'Password must be at least 8 characters long'
        }
        else if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(newPassword.newPassword))) {
            return 'Password must have capitalized, lowercase letters and digits'
        }
        return null
    }

    function handleClose() {
        setError(null)
        props.onClose()
        setNewPassword({
            newPassword: "",
            confirmPassword: "",
        })
    }

    return(
        <>
            <Modal className="modal-window" onRequestClose={props.onClose} isOpen={props.isOpen} >
                    <h2 className="change-password-title">Change password</h2>
                    <InputField name="newPassword" label="New password" value={newPassword.newPassword} type="password" className="info-areas" onChange={handleChange} />
                    <InputField name="confirmPassword" label="Confirm new password" value={newPassword.confirmPassword} type="password" className="info-areas" onChange={handleChange} />
                    <ErrorField errorMessage={error || serverError?.status}/>
                    <div className="password-btns">
                        <Button type="button" className="btn cancel-btn" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" className="confirm-btn btn" onClick={() => {
                            const validationError = validatePassword()
                            if(validationError) {
                                setError(validationError)
                                return
                            }
                            editUser({password: newPassword.newPassword})
                            handleClose()
                        }}>Change password</Button>
                    </div>
            </Modal>
        </>
    )
}

export default ChangePasswordWindow
