import { useState } from "react";

import InputField from "../Inputs/InputField.jsx";
import Button from "../Button/Button.jsx";
import ErrorField from "../ErrorField/ErrorField.jsx";
import { useEditUserMutation, useGetUserQuery } from "../../store/api/userApi.js";
import { getFetchErrorMessage } from "../../utils/errorsHandling.jsx";

import "./UserInfoForm.css";

const UserInfoForm = () => {
    const { data: user } = useGetUserQuery();
    const [editUser, { error }] = useEditUserMutation();
    const [isEditing, setIsEditing]   = useState(false);
    const [changedData, setChangedData] = useState({
        name:        user.name,
        surname:     user.surname,
        email:       user.email,
        phoneNumber: user.phoneNumber  || "",
        discipline:  user.discipline   || "",
        description: user.description  || "",
    });

    const handleChange = (e) => {
        setChangedData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editUser(changedData);
    };

    const isTeacher = user.role === "teacher";
    const isStudent = user.role === "student";

    return (
        <main className="edit-account-info">
            <form className="edit-profile" onSubmit={handleSubmit}>

                {error && (
                    <ErrorField errorMessage={getFetchErrorMessage(error.status)} />
                )}

                <div className="fullname-container">
                    <InputField
                        label="Name"
                        className="info-areas"
                        name="name"
                        type="text"
                        placeholder={user.name}
                        value={changedData.name}
                        disabled={!isEditing}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Surname"
                        className="info-areas"
                        name="surname"
                        type="text"
                        placeholder={user.surname}
                        value={changedData.surname}
                        disabled={!isEditing}
                        onChange={handleChange}
                    />
                </div>

                <InputField
                    label="Email"
                    className="info-areas"
                    name="email"
                    type="text"
                    placeholder={user.email}
                    value={user.email}
                    disabled={!isEditing}
                    onChange={handleChange}
                />

                <InputField
                    label="Phone number"
                    className="info-areas"
                    name="phone"
                    type="text"
                    placeholder="+1 (11) 111-11-11"
                    value={changedData.phoneNumber || "+1 (11) 111-11-11"}
                    disabled={!isEditing}
                    onChange={handleChange}
                />

                {isTeacher && (
                    <InputField
                        label="Subjects"
                        className="info-areas"
                        name="discipline"
                        type="text"
                        placeholder="Math, physics"
                        value={changedData.discipline || "Math, physics"}
                        disabled={!isEditing}
                        onChange={handleChange}
                    />
                )}

                {isStudent && (
                    <InputField
                        label="Grade"
                        className="info-areas"
                        name="description"
                        type="text"
                        placeholder=""
                        value={changedData.discipline || "10th Grade"}
                        disabled={!isEditing}
                        onChange={handleChange}
                    />
                )}

                {isTeacher && (
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            name="description"
                            placeholder=""
                            maxLength="200"
                            className="info-areas"
                            value={changedData.description || undefined}
                            disabled={!isEditing}
                            onChange={handleChange}
                        />

                        <Button
                            type={isEditing ? "button" : "submit"}
                            className="btn edit-profile-btn"
                            onClick={() => setIsEditing((prev) => !prev)}
                        >
                            {isEditing ? "Save" : "Change account"}
                        </Button>
                    </div>
                )}

            </form>
        </main>
    );
};

export default UserInfoForm;
