import ChangePasswordWindow from "../ChangePasswordWindow/ChangePasswordWindow.jsx";
import Button from "../../shared/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import "./AccountManagement.css"
import {useLogoutUserMutation} from "../../../store/api/userApi.js";

const AccountManagement = () => {
    const navigate = useNavigate()
    const [editingPasswordEnabled, setEditingPasswordEnabled] = useState(false)
    const [logoutUser, {error}] = useLogoutUserMutation()

    return(
        <>
            <div className="action-btns-container">
                <h3 className="action-title">Account management</h3>
                <Button type="button" className="btn exit-btn" onClick={() => setEditingPasswordEnabled(true)}>Change password</Button>
                <Button type="button" className="btn exit-btn" onClick={(e) => {
                    e.preventDefault()
                    logoutUser()
                    navigate('/login')
                }}>Exit</Button>
                <Button type="button" className="btn delete-btn" >Delete profile</Button>
            </div>

            <ChangePasswordWindow isOpen={editingPasswordEnabled} onClose={() => setEditingPasswordEnabled(false)} />
        </>
    )
}

export default AccountManagement