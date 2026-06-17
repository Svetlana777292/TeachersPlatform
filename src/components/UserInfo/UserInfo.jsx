import { useGetUserQuery }                        from "../../store/api/userApi.js";
import { useGetAvatarQuery, useSetAvatarMutation } from "../../store/api/storageApi.js";
import "./UserInfo.css";
import {useSummary} from "../../hooks/useSummary.js";

const UserInfo = () => {
    const { data: user }              = useGetUserQuery();
    const { data: { url: photo = null } = {} } = useGetAvatarQuery(user.id);
    const [setAvatar]                 = useSetAvatarMutation();
    const {studentsCount, teachersCount} = useSummary()

    const isTeacher = user.role === "teacher";

    const formatDate = (isoString) => {
        const date  = new Date(isoString);
        const day   = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year  = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    const handleAvatarChange = async (e) => {
        const selectedPhoto = e.target.files[0];
        if (!selectedPhoto) return;

        const avatarData = new FormData();
        avatarData.append("photo", selectedPhoto);

        await setAvatar(avatarData);
    };

    return (
        <aside className="user-info">

            <div className="avatar-wrapper">
                <input
                    id="avatarInput"
                    type="file"
                    className="avatar-input"
                    accept="image/*"
                    onChange={handleAvatarChange}
                />
                <img
                    src={photo || "/avatar.png"}
                    alt=""
                    className="avatar-img"
                />
            </div>

            <h1 className="main-title">{user.name} {user.surname}</h1>
            <h3 className="role">{user.role}</h3>

            <label htmlFor="avatarInput" className="btn edit-avatar-btn">
                Edit avatar
            </label>

            <dl className="account-info">
                <dt>Registration date:</dt>
                <dd>{formatDate(user.createdAt)}</dd>

                <dt>{isTeacher ? "Total students:" : "Active teachers:"}</dt>
                <dd>{isTeacher ? studentsCount : teachersCount}</dd>
            </dl>

        </aside>
    );
};

export default UserInfo;
