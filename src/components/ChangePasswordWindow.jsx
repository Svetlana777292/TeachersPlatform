import InputField from "./InputField.jsx";
import ErrorField from "./ErrorField.jsx";
import Button from "./Button.jsx";
import Modal from "react-modal";
import '../pages/ProfilePage.css';
import {useState} from "react";

const ChangePasswordWindow = (props) => {
    const [error, setError] = useState(null)
    const [newPassword, setNewPassword] = useState({
        newPassword: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value)

        setNewPassword({
            ...newPassword,
            [e.target.name]: e.target.value
        })
    }

    function validatePassword() {
        if(newPassword.newPassword !== newPassword.confirmPassword) {
            setError('Passwords do not match')
            return error
        }
        else if(newPassword.newPassword === '') {
            setError('Password are required')
            return error
        }
        else if(newPassword.newPassword.length < 8){
            setError('Password must be at least 8 characters long')
            return error
        }
        else if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(newPassword.newPassword))){
            setError('Password must have capitalized, lowercase letters and digits')
            return error
        }
        else {
            return null
        }
    }

    function handleClose() {
        setError(null)
        props.onClose()
        setNewPassword({
            newPassword: "",
            confirmPassword: "",
        })
    }

    async function changePassword(){
        if(error) return

        const password = {
            password: newPassword.newPassword
        }

        try{
            const response = await fetch(`/api/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(password)
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                handleClose()
            }
        }
        catch(error){
            console.error(error)
        }
    }

    return(
        <>
            <Modal className="change-password" onRequestClose={props.onClose} isOpen={props.isOpen} >
                    <h2 className="change-password-title">Change password</h2>
                    <InputField name="newPassword" label="New password" value={newPassword.newPassword} type="password" className="info-areas" onChange={handleChange} />
                    <InputField name="confirmPassword" label="Confirm new password" value={newPassword.confirmPassword} type="password" className="info-areas" onChange={handleChange} />
                    <ErrorField errorMessage={error}/>
                    <div className="password-btns">
                        <Button type="button" className="btn cancelBtn" onClick={handleClose}>Cancel</Button>
                        <Button type="submit" className="confirm-changes-btn btn" onClick={() => {
                            validatePassword()
                            changePassword()
                        }}>Change password</Button>
                    </div>
            </Modal>
        </>
    )
}

export default ChangePasswordWindow
