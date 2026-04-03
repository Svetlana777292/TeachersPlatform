import InputField from "./InputField.jsx";

const UserInfoForm = ({user}) => {

    return (
        <form id="editInfoForm" className="edit-profile">
            <div className="fullname-container">
                <InputField label="Name" className="info-areas" disabled name="name" placeholder={user.name} value={user.name} type="text"></InputField>
                <InputField label="Surname" className="info-areas" disabled name="surname" placeholder={user.surname} value={user.surname} type="text"></InputField>
            </div>

            <InputField label="Email" className="info-areas" disabled name="email" placeholder={user.email} value={user.email} type="text"></InputField>
            <InputField label="Phone number" className="info-areas" disabled name="phone" placeholder="+1 (11) 111-11-11" value={user.phoneNumber} type="text"></InputField>
            <InputField label="Subjects" className="info-areas" disabled name="discipline" placeholder="Math, physics" value={user.discipline} type="text"></InputField>

            <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea name="description" placeholder="" maxLength="200" value={user.description ? user.description : undefined} className="info-areas"  disabled></textarea>
            </div>
        </form>
    )
}

export default UserInfoForm