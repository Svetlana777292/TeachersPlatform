import InputField from '../components/InputField.jsx'
import Button from "../components/Button.jsx";
import AuthRedirection from "../components/AuthRedirection.jsx";
import RadioField from "../components/RadioField.jsx";
import "./AuthPage.css"
import {useState} from "react";
import handleSubmit from "../utils/responses.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [role, setRole] = useState("teacher")  
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "teacher"
    })

    const navigate = useNavigate()

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <form id="login-form" className="auth-container" onSubmit={(e) => handleSubmit(formData, 'login', e, navigate)}>
            <h1>
                Welcome back!
            </h1>

            <div className="roles-group">
                <RadioField name="role" className="role" label="I'm a teacher" value="teacher" checked={role === 'teacher'} onChange={handleChange} />
                <RadioField name="role" className="role" label="I'm a student" value="student" checked={role === 'teacher'} onChange={handleChange}/>
            </div>

            <InputField name="email" type="email" placeholder="ivan.ivanov@example.com" label="Email" value={formData.email} onChange={handleChange}/>

            <InputField name="password" type="password" placeholder="Password123" label="Password" value={formData.password} onChange={handleChange}/>

            <Button type="submit" className="auth-button" >Sign in</Button>

            <AuthRedirection
                className="auth-redirection-text"
                linkClassName="auth-redirection-link"
                text="Already have an account?"
                linkText="Sign up"
                to="/register"
            />
        </form>
    )
}

export default LoginPage;
