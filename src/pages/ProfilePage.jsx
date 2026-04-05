import NavBar from "../components/NavBar.jsx";
import Button from "../components/Button.jsx";
import './ProfilePage.css'
import ChangePasswordWindow from "../components/ChangePasswordWindow.jsx";
import AccountManagement from "../components/AccountManagement.jsx";
import {useEffect, useState} from "react";
import Loading from "../components/Loading.jsx";
import {useNavigate} from "react-router-dom";
import UserInfoForm from "../components/UserInfoForm.jsx";
import Modal from "react-modal";
import UserInfo from "../components/UserInfo.jsx";

Modal.setAppElement('#root');

const ProfilePage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [menuOpened, setMenuOpened] = useState(false)
    const [photo, setPhoto] = useState(null)

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

                    const photoResponse = await fetch(`/api/storage/avatar/${data.id}`, {
                        method: 'GET',
                        credentials: 'include'
                    })

                    if (photoResponse.ok) {
                        const photoData = await photoResponse.json()
                        setPhoto(photoData.url)
                    }
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

    async function handleSaveUserInfo(updatedUser) {
        setUser(updatedUser)
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
                <UserInfo user={user} photo={photo} setPhoto={setPhoto}/>

                <main className="edit-account-info">
                    <UserInfoForm user={user} onSave={handleSaveUserInfo}/>
                </main>

                <AccountManagement />
                <ChangePasswordWindow />
            </div>
        </>
    )
}

export default ProfilePage