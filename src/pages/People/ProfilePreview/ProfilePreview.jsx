import Modal from "react-modal"
import "./ProfilePreview.css"

const ProfilePreview = ({ student, avatar, setShowProfile, isOpen }) => {

    return (
        <Modal
            isOpen={isOpen}
            className="modalWindow profilePreviewModal"
            onRequestClose={() => setShowProfile(false)}
        >
            <img
                src={avatar || "/avatar.png"}
                alt="avatar"
                className="studentAvatarModal"
            />

            <h2>{`${student.name} ${student.surname}`}</h2>

            <div className="profilePreviewInfoField">
                <h3 className="profilePreviewInfoTitle">Email</h3>
                <p className="profilePreviewInfo">{student.email}</p>
            </div>

            <div className="profilePreviewInfoField">
                <h3 className="profilePreviewInfoTitle">Phone number</h3>
                <p className="profilePreviewInfo">{student.phoneNumber ?? "Phone number not defined"}</p>
            </div>

            <div className="profilePreviewIfnoField">
                <h3 className="profilePreviewInfoTitle">Lessons together</h3>
                <p className="profilePreviewInfo">0</p>
            </div>
        </Modal>
    )
}

export default ProfilePreview