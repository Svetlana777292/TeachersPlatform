import './ProfilePage.css'
import ChangePasswordWindow from "../../components/ChangePasswordWindow/ChangePasswordWindow.jsx";
import AccountManagement from "../../components/AccountManagement/AccountManagement.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import UserInfoForm from "../../components/UserInfoForm/UserInfoForm.jsx";
import Modal from "react-modal";
import UserInfo from "../../components/UserInfo/UserInfo.jsx";
import Header from "../../components/Header/Header.jsx";
import useUser from "../../hooks/useUser.js";
import useUserPhoto from "../../hooks/useUserPhoto.js";

Modal.setAppElement('#root');

const ProfilePage = () => {
    const {user, setUser, isLoading} = useUser()
    const {photo, setPhoto, isPhotoLoading} = useUserPhoto(user?.id)

    if(isLoading || isPhotoLoading) {
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
            <Header user={user} />

            <div className="main-container">
                <UserInfo user={user} photo={photo} setPhoto={setPhoto}/>
                <UserInfoForm user={user} onSave={handleSaveUserInfo}/>
                <AccountManagement />
                <ChangePasswordWindow />
            </div>
        </>
    )
}

export default ProfilePage