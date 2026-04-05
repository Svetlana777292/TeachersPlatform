import NavBar from "../../components/NavBar.jsx";
import Button from "../../components/Button.jsx";
import './ProfilePage.css'
import ChangePasswordWindow from "../../components/ChangePasswordWindow.jsx";
import AccountManagement from "../../components/AccountManagement.jsx";
import {useEffect, useState} from "react";
import Loading from "../../components/Loading.jsx";
import {useNavigate} from "react-router-dom";
import UserInfoForm from "../../components/UserInfoForm.jsx";
import Modal from "react-modal";
import UserInfo from "../../components/UserInfo.jsx";
import Header from "../../components/Header.jsx";

Modal.setAppElement('#root');

const ProfilePage = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
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
            <Header />

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