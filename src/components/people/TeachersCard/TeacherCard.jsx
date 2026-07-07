import Button from "../../shared/Button/Button.jsx";
import {useGetAvatarQuery} from "../../../store/api/storageApi.js";
import "./TeacherCard.css"

const TeacherCard = ({teacher}) => {
    const {data: {url: photo = null} = {}} = useGetAvatarQuery(teacher.id)

    return (
        <div className="teacher-card-wrapper">
            <img
                src={photo || "/avatar.png"}
                alt="avatar"
                className="teacher-avatar"
            />

            <div className="teacher-info">
                <h3 className="teacher-card-name">
                    {teacher.name} {teacher.surname}
                </h3>
                <div className="teacher-email">{teacher.email}</div>
            </div>

            <div className="teacher-card-buttons">
                <Button type="button" className="view-profile-button">View Profile</Button>
                <Button type="button" className="message-button">Message</Button>
            </div>
        </div>
    )
}

export default TeacherCard