import NavBar from "../components/NavBar.jsx";
import Button from "../components/Button.jsx";
import './ProfilePage.css'
import InputField from "../components/InputField.jsx";
import ChangePasswordWindow from "../components/ChangePasswordWindow.jsx";
import AccountManagement from "../components/AccountManagement.jsx";
import {useEffect, useState} from "react";
import CONFIG from "../utils/config.js";
import Loading from "../components/Loading.jsx";
import {useNavigate} from "react-router-dom";
import checkToken from "../utils/checkToken.js"

const ProfilePage = () => {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        const isActive = checkToken()

        if (!isActive) {
            navigate("/login")
        }
    }, [navigate])

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/api/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })

                if(response.ok){
                    const data = await response.json()
                    setUser(data)
                }
                else{
                    setError("Unautorized")
                }
            }
            catch(error) {
                setError(error)
            }
            finally{
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if(error){
            return navigate('/login/')
        }
    }, [error])

    if(isLoading) {
        return <Loading />
    }

    if(!user){
        return null
    }

    function formatDate(isoString){
        const date = new Date(isoString)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    return (
        <>
            <header className="main-header">
                <h1 className="page-title">Profile</h1>
                <Button className="burger-btn" type="button">
                    <svg id="menuIcon" className="burger-icon" viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </Button>

                <NavBar />
            </header>

            <div className="main-container">
                <aside className="user-info">
                    <div className="avatar-wrapper">
                        <input type="file" className="avatar-input" accept="image/*"/>
                        <img id="avatarImg" src="/" alt="" className="avatar-img"/>
                    </div>

                    <h1 id="fullName" className="main-title">{user.name + " " + user.surname}</h1>
                    <h3 className="role">{user.role}</h3>

                    <Button className="btn edit-avatar-btn" type="button">Edit avatar</Button>

                    <dl className="account-info">
                        <dt>Registration date</dt>
                        <dd>{formatDate(user.createdAt)}</dd>
                        <dt>Total students</dt>
                        <dd>0</dd>
                    </dl>
                </aside>

                <main className="edit-account-info">
                    <div className="edit-info-title">
                        <h2 className="account-info-title">Account information</h2>
                        <Button type="button"
                                className="btn edit-profile-btn"
                                onClick={() => setIsEditing(!isEditing)}
                                >
                                {isEditing ? "Save" : "Change account"}
                        </Button>
                    </div>

                    <form id="editInfoForm" className="edit-profile">
                        <div className="fullname-container">
                            <InputField label="Name" className="info-areas" disabled name="name" placeholder={user.name} value={user.name} type="text"></InputField>
                            <InputField label="Surname" className="info-areas" disabled name="surname" placeholder={user.surname} value={user.surname} type="text"></InputField>
                        </div>

                        <InputField label="Email" className="info-areas" disabled name="email" placeholder={user.email} value={user.email} type="text"></InputField>
                        <InputField label="Phone number" className="info-areas" disabled name="phone" placeholder="+1 (11) 111-11-11" value={user.phoneNumber} type="text"></InputField>
                        <InputField label="Subjects" className="info-areas" disabled name="discipline" placeholder="Math, physics" value={user.discipline} type="text"></InputField>

                        <div className="form-group">
                            <label htmlFor="bio">Bio</label>
                            <textarea name="description" placeholder="" maxLength="200" value={user.description} className="info-areas"  disabled></textarea>
                        </div>
                    </form>
                </main>

                <AccountManagement />
                <ChangePasswordWindow />
            </div>
        </>
    )
}

export default ProfilePage