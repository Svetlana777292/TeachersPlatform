import NavBar from "../components/NavBar.jsx";
import Button from "../components/Button.jsx";
import './ProfilePage.css'
import ChangePasswordWindow from "../components/ChangePasswordWindow.jsx";
import AccountManagement from "../components/AccountManagement.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.jsx";
import {useNavigate} from "react-router-dom";
import checkToken from "../utils/checkToken.js"
import UserInfoForm from "../components/UserInfoForm.jsx";
import Modal from "react-modal";

Modal.setAppElement('#root');

const ProfilePage = () => {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [menuOpened, setMenuOpened] = useState(false)
    const [photo, setPhoto] = useState(null)

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
                    getUserPhoto()
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

    async function setUserPhoto(file){

        const formData = new FormData()
        formData.append('photo', file)

        try{
            const response = await fetch(`/api/storage/avatar`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
                credentials: 'include'
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                console.log('Фото успешно загружено, URL: ', data.storage_key)

            }
            else{
                console.log('Ошибка загрузки: ', response.status)
                //getUserPhoto()
            }
        }
        catch(error){
            console.error(error)
        }
    }

    async function getUserPhoto(){
        try{
            const response = await fetch(`/api/storage/avatar/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            if(response.ok){
                const photoUrl = await response.json()
                return photoUrl.url
            }
        }
        catch(error){
            console.error(error)
        }
    }

    async function handleAvatarChange(e){
        const selectedPhoto = e.target.files[0]
        if(!selectedPhoto) return

        await setUserPhoto(selectedPhoto)
        const url = await getUserPhoto()
        setPhoto(url)
    }

    return (
        <>
            <header className="main-header">
                <h1 className="page-title">Profile</h1>
                <Button className="burger-btn" type="button" onClick={() => setMenuOpened(!menuOpened)}>
                    <svg id="menuIcon" className={`burger-icon ${menuOpened ? "rotated" : ""}`} viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </Button>

                <NavBar className={`menu-list ${menuOpened ? "is-open" : ""}`}/>
            </header>

            <div className="main-container">
                <aside className="user-info">
                    <div className="avatar-wrapper">
                        <input id="avatarInput" type="file" className="avatar-input" accept="image/*" onChange={handleAvatarChange}/>
                        <img src={photo} alt="" className="avatar-img"/>
                    </div>

                    <h1 className="main-title">{user.name + " " + user.surname}</h1>
                    <h3 className="role">{user.role}</h3>

                    <label htmlFor="avatarInput" className="btn edit-avatar-btn" type="button">Edit avatar</label>

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

                    <UserInfoForm user={user}/>
                </main>

                <AccountManagement />
                <ChangePasswordWindow />
            </div>
        </>
    )
}

export default ProfilePage