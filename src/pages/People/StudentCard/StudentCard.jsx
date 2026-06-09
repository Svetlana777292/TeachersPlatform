import { useGetAvatarQuery } from "../../../store/api/storageApi.js";

import Button from "../../../components/Button/Button.jsx";

import "./StudentCard.css";


const StudentCard = ({ student }) => {
    const { data: {url: photo = null} = {}} = useGetAvatarQuery(student.id);

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
                <Button type="button" className="viewProfileButton">View Profile</Button>
                <Button type="button" className="messageButton">Message</Button>
            </div>
        </div>
    );
};

export default StudentCard;
