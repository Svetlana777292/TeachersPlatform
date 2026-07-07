import { useGetAvatarQuery } from "../../../store/api/storageApi.js";

import Button from "../../../components/shared/Button/Button.jsx";

import "./StudentCard.css";


const StudentCard = ({ student }) => {
    const { data: {url: photo = null} = {}} = useGetAvatarQuery(student.id);

    return (
        <div className="student-card" onClick={() => {}}>
            <img
                src={photo || "/avatar.png"}
                alt="avatar"
                className="student-avatar"
            />

            <div className="student-info">
                <h3 className="student-card-name">
                    {student.name} {student.surname}
                </h3>
                <div className="student-email">{student.email}</div>
            </div>

            <div className="student-card-buttons">
                <Button type="button" className="view-profile-button">View Profile</Button>
                <Button type="button" className="message-button">Message</Button>
            </div>
        </div>
    );
};

export default StudentCard;
