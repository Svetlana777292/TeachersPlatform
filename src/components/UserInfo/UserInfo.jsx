import "./UserInfo.css"
import useUserPhoto from "../../hooks/useUserPhoto.js";

const UserInfo = ({user}) => {
    const { photo, setPhoto } = useUserPhoto(user.id)

    function formatDate(isoString){
        const date = new Date(isoString)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    async function handleAvatarChange(e){
        const selectedPhoto = e.target.files[0]
        if(!selectedPhoto) return

        await setPhoto(selectedPhoto)
    }

    return (
        <aside className="user-info">
            <div className="avatar-wrapper">
                <input id="avatarInput" type="file" className="avatar-input" accept="image/*" onChange={handleAvatarChange}/>
                <img src={photo} alt="" className="avatar-img"/>
            </div>

            <h1 className="main-title">{user.name + " " + user.surname}</h1>
            <h3 className="role">{user.role}</h3>

            <label htmlFor="avatarInput" className="btn edit-avatar-btn">Edit avatar</label>

            <dl className="account-info">
                <dt>Registration date</dt>
                <dd>{formatDate(user.createdAt)}</dd>
                <dt>{user.role === "teacher" ? "Total students" : "Active teachers"}</dt>
                <dd>0</dd>
            </dl>
        </aside>
    )
}

export default UserInfo