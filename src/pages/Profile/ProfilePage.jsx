import './ProfilePage.css'
import AccountManagement from "../../components/AccountManagement/AccountManagement.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import UserInfoForm from "../../components/UserInfoForm/UserInfoForm.jsx";
import Modal from "react-modal";
import UserInfo from "../../components/UserInfo/UserInfo.jsx";
import Header from "../../components/Header/Header.jsx";
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";
import ProfileSummary from "../../components/ProfileSummary/ProfileSummary/ProfileSummary.jsx";
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
                <div className="infoTab">
                    <div className="tabSwitchButtons">
                        <Button className="switchTabButton" onClick={() => setTab("summary")} style={tab === "summary" ? switchTabButtonStyle : null}>Summary</Button>
                        <Button className="switchTabButton" onClick={() => setTab("info")} style={tab === "info" ? switchTabButtonStyle : null}>Account information</Button>
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