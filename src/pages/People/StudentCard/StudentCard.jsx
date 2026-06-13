import { useGetAvatarQuery } from "../../../store/api/storageApi.js";

import Button from "../../../components/Button/Button.jsx";

import "./StudentCard.css";
import {useState} from "react";
import ProfilePreview from "../ProfilePreview/ProfilePreview.jsx";


const StudentCard = ({ student }) => {
    const { data: {url: photo = null} = {}} = useGetAvatarQuery(student.id)
    const [showProfile, setShowProfile] = useState(false)

    return (
        <div className="studentCard" onClick={() => {}}>
            <img
                src={photo || "/avatar.png"}
                alt="avatar"
                className="studentAvatar"
            />

            <div className="studentInfo">
                <h3 className="studentCardName">
                    {student.name} {student.surname}
                </h3>
                <div className="studentEmail">{student.email}</div>
            </div>

            <div className="studentCardButtons">
                <Button type="button" className="viewProfileButton" onClick={() => setShowProfile(true)}>View Profile</Button>
                <Button type="button" className="messageButton">Message</Button>
            </div>

            <ProfilePreview isOpen={showProfile} setShowProfile={setShowProfile} avatar={photo} student={student}/>
        </div>
    );
};

export default StudentCard;
