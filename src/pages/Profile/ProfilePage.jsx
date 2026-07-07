import './ProfilePage.css'
import AccountManagement from "../../components/profile/AccountManagement/AccountManagement.jsx";
import Loading from "../../components/shared/Loading/Loading.jsx";
import UserInfoForm from "../../components/profile/UserInfoForm/UserInfoForm.jsx";
import Modal from "react-modal";
import UserInfo from "../../components/profile/UserInfo/UserInfo.jsx";
import Header from "../../components/shared/Header/Header.jsx";
import Button from "../../components/shared/Button/Button.jsx";
import {useState} from "react";
import ProfileSummary from "../../components/profile/ProfileSummary/ProfileSummary/ProfileSummary.jsx";
import {useGetUserQuery} from "../../store/api/userApi.js";

Modal.setAppElement('#root');

const ProfilePage = () => {
    const {data: user, isLoading} = useGetUserQuery()
    const [tab, setTab] = useState("summary")


    if(isLoading) {
        return <Loading />
    }

    if(!user){
        return null
    }

    const switchTabButtonStyle = {
        color: "#FFFFFF",
        backgroundColor: "#000000",
    }

    return (
        <>
            <Header currentPage="Profile" user={user} />

            <main><div className="main-container layout-container">
                <UserInfo/>
                <div className="info-tab">
                    <div className="tab-switch-buttons">
                        <Button className="switch-tab-button" onClick={() => setTab("summary")} style={tab === "summary" ? switchTabButtonStyle : null}>Summary</Button>
                        <Button className="switch-tab-button" onClick={() => setTab("info")} style={tab === "info" ? switchTabButtonStyle : null}>Account information</Button>
                    </div>
                    {tab === "summary" && (<ProfileSummary  style={{ width: '100%' }}/>)}
                    {tab === "info" && (<UserInfoForm />)}
                </div>
                <AccountManagement />
            </div></main>
        </>
    )
}

export default ProfilePage