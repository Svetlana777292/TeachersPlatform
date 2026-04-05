import InputField from '../components/InputField.jsx'
import Button from "../components/Button.jsx";
import AuthRedirection from "../components/AuthRedirection.jsx";
import RadioField from "../components/RadioField.jsx";
import "./AuthPage.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import handleSubmit from "../utils/responses.js";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "teacher"
    })

    const handleChange = (e) => {
        e.preventDefault()

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    return(
        <>
            <form  className="auth-container" onSubmit={(e) => handleSubmit(formData, 'register', e, navigate)}>
                <h1>
                    Create an account
                </h1>

                <div className="fullname-group">
                    <InputField name="name" type="text" className="fullname-field" placeholder="Ivan" label="Name" value={formData.name} onChange={handleChange}/>
                    <InputField name="surname" type="text" className="fullname-field" placeholder="Ivanov" label="Surame" value={formData.surname} onChange={handleChange}/>
                </div>

                <div className="roles-group">
                    <RadioField name="role" className="role" label="I'm a teacher" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} />
                    <RadioField name="role" className="role" label="I'm a student" value="student" checked={formData.role === 'student'} onChange={handleChange}/></div>

                <InputField name="username" type="text" placeholder="ivanovivan" label="Username" value={formData.username} onChange={handleChange}/>

                <InputField name="email" type="email" placeholder="ivan.ivanov@example.com" label="Email" vlaue={formData.email} onChange={handleChange}/>

                <InputField name="password" type="password" placeholder="Password123" label="Password" value={formData.password} onChange={handleChange}/>

                <Button type="submit" text="Sign up" className="auth-button">Register</Button>

                <AuthRedirection
                    className="auth-redirection-text"
                    linkClassName="auth-redirection-link"
                    text="Already have an account?"
                    linkText="Sign in"
                    to="/login"
                />
            </form>
        </>
    )
}

export default RegisterPage;
