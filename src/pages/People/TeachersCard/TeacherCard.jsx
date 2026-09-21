import Button from "../../../components/Button/Button.jsx";
import {useGetAvatarQuery} from "../../../store/api/storageApi.ts";
import "./TeacherCard.css"

const TeacherCard = ({teacher}) => {
    const {data: {url: photo = null} = {}} = useGetAvatarQuery(teacher.id)

    return (
        <div className="teacherCardWrapper">
            <img
                src={photo || "/avatar.png"}
                alt="avatar"
                className="teacherAvatar"
            />

            <div className="teacherInfo">
                <h3 className="teacherCardName">
                    {teacher.name} {teacher.surname}
                </h3>
                <div className="teacherEmail">{teacher.email}</div>
            </div>

            <div className="teacherCardButtons">
                <Button type="button" className="viewProfileButton">View Profile</Button>
                <Button type="button" className="messageButton">Message</Button>
            </div>
        </div>
    )
}

export default TeacherCard