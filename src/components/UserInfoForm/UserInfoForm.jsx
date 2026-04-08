import InputField from "../Inputs/InputField.jsx";
import {useState} from "react";
import Button from "../Button/Button.jsx";
import "./UserInfoForm.css"

const UserInfoForm = ({user, onSave}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [changedData, setChangedData] = useState({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        discipline: user.discipline || "",
        description: user.description || ""
    })

    const handleChange = (e) => {
        setChangedData({
            ...changedData,
            [e.target.name]: e.target.value
        })
    }

    async function saveChanges(e){
        e.preventDefault()

        try{
            const response = await fetch(`/api/me`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(changedData)
            })

            if(response.ok){
                const updatedUser = await response.json()
                console.log('Данные успешно обновлены!', user)

                onSave(updatedUser)
            }
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <main className="edit-account-info">
            <form className="edit-profile" onSubmit={saveChanges}>

                <div className="edit-info-title">
                    <h2 className="account-info-title">Account information</h2>
                    <Button type={isEditing ? "button" : "submit"}
                            className="btn edit-profile-btn"
                            onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? "Save" : "Change account"}
                    </Button>
                </div>

                <div className="fullname-container">
                    <InputField label="Name" className="info-areas" disabled={!isEditing} name="name" placeholder={user.name} value={changedData.name} type="text" onChange={handleChange} ></InputField>
                    <InputField label="Surname" className="info-areas" disabled={!isEditing} name="surname" placeholder={user.surname} value={changedData.surname} type="text" onChange={handleChange}></InputField>
                </div>

                <InputField label="Email" className="info-areas" disabled={!isEditing} name="email" placeholder={user.email} value={user.email} type="text" onChange={handleChange}></InputField>
                <InputField label="Phone number" className="info-areas" disabled={!isEditing} name="phone" placeholder="+1 (11) 111-11-11" value={changedData.phoneNumber ? changedData.phoneNumber : "+1 (11) 111-11-11"} type="text" onChange={handleChange}></InputField>

                {user.role === "teacher" && <InputField label="Subjects" className="info-areas" disabled={!isEditing} name="discipline"
                             placeholder="Math, physics"
                             value={changedData.discipline ? changedData.discipline : "Math, physics"} type="text"
                             onChange={handleChange}></InputField>}

                {user.role === "student" && <InputField label="Grade" className="info-areas" disabled={!isEditing} name="description"
                                                        placeholder=""
                                                        value={changedData.discipline ? changedData.discipline : "10th Grade"} type="text"
                                                        onChange={handleChange}></InputField>}

                { user.role === "teacher" && <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea name="description" placeholder="" maxLength="200"
                              value={changedData.description ? changedData.description : undefined} className="info-areas"
                              disabled={!isEditing} onChange={handleChange}></textarea>
                </div>}
            </form>
        </main>
    )
}

export default UserInfoForm