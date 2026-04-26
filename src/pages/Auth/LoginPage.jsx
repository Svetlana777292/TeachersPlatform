import InputField from '../../components/Inputs/InputField.jsx'
import Button from "../../components/Button/Button.jsx";
import AuthRedirection from "../../components/AuthRedirection/AuthRedirection.jsx";
import RadioField from "../../components/Inputs/RadioField.jsx";
import "./AuthPage.css"
import {useState} from "react";
import handleSubmit from "../../utils/responses.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "teacher"
    })

    const navigate = useNavigate()

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value)

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <form id="login-form" className="auth-container" onSubmit={(e) => handleSubmit("POST", formData, 'login', e, () => navigate("/profile/"))}>
            <h1>
                Welcome back!
            </h1>

            <div className="roles-group">
                <RadioField name="role" className="role" label="I'm a teacher" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} />
                <RadioField name="role" className="role" label="I'm a student" value="student" checked={formData.role === 'student'} onChange={handleChange}/>
            </div>

            <InputField name="email" type="email" placeholder="ivan.ivanov@example.com" label="Email" value={formData.email} onChange={handleChange}/>

            <InputField name="password" type="password" placeholder="Password123" label="Password" value={formData.password} onChange={handleChange}/>

            <Button type="submit" className="auth-button" >Sign in</Button>

            <AuthRedirection
                text="Already have an account?"
                linkText="Sign up"
                to="/register"
            />
        </form>
    )
}

export default LoginPage;
