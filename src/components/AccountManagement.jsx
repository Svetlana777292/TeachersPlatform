import ChangePasswordWindow from "./ChangePasswordWindow.jsx";
import CONFIG from "../utils/config.js";
import Button from "./Button.jsx";
import {useNavigate} from "react-router-dom";

const AccountManagement = () => {
    const navigate = useNavigate()

    async function handleLogout(e, navigate){
        e.preventDefault()

        try{
            const response = await fetch(`${CONFIG.API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if(response.ok){
                navigate('/login/')
                console.log('logout success')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="action-btns-container">
            <h3 className="action-title">Управление аккаунтом</h3>
            <Button type="button" className="btn exit-btn" value="disabled">Change password</Button>
            <Button type="button" className="btn exit-btn" value="disabled" onClick={(e) => handleLogout(e, navigate)}>Exit</Button>
            <Button type="button" className="btn delete-btn" value="disabled">Delete profile</Button>
        </div>
    )
}

export default AccountManagement