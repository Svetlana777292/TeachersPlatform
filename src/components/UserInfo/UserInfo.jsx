import "./UserInfo.css"
import {useGetUserQuery} from "../../store/api/userApi.js";
import {useGetAllStudentsQuery} from "../../store/api/studentsApi.js";
import {useGetAvatarQuery, useSetAvatarMutation} from "../../store/api/storageApi.js";

const UserInfo = () => {
    const {data: user} = useGetUserQuery()
    const [setAvatar] = useSetAvatarMutation()
    const {data: {lessons: myStudents = []} = {}} = useGetAllStudentsQuery()
    const {data: photo} = useGetAvatarQuery(user.id)

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

        await setAvatar(selectedPhoto)
    }

    return (
        <aside className="user-info">
            <div className="avatar-wrapper">
                <input id="avatarInput" type="file" className="avatar-input" accept="image/*" onChange={handleAvatarChange}/>
                <img src={photo || "avatar.png"} alt="" className="avatar-img"/>
            </div>

            <h1 className="main-title">{user.name + " " + user.surname}</h1>
            <h3 className="role">{user.role}</h3>

            <label htmlFor="avatarInput" className="btn edit-avatar-btn">Edit avatar</label>

            <dl className="account-info">
                <dt>Registration date</dt>
                <dd>{formatDate(user.createdAt)}</dd>
                <dt>{user.role === "teacher" ? "Total students" : "Active teachers"}</dt>
                <dd>{myStudents.length}</dd>
            </dl>
        </aside>
    )
}

export default UserInfo