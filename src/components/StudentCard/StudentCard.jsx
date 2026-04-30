import "./StudentCard.css"
import useUserPhoto from "../../hooks/useUserPhoto.js";
import Button from "../Button/Button.jsx";

const StudentCard = (props) => {
    const {photo} = useUserPhoto(props.student.id)

    return (
        <div key={props.student.id} className="studentCard" onClick={() => {}}>
            <img src={photo || "avatar.png"} alt="avatar" className="studentAvatar" />
            <div className="studentInfo">
                <h3 className="studentName">{props.student.name + " " + props.student.surname}</h3>
                <div className="studentEmail">{props.student.email}</div>
            </div>
            <Button type="button" className="viewProfileButton">View Profile</Button>
        </div>
    )
}

export default StudentCard