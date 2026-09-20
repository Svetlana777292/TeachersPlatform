import InputField from '../../components/Inputs/InputField.jsx'
import Button from "../../components/Button/Button.jsx";
import AuthRedirection from "../../components/AuthRedirection/AuthRedirection.jsx";
import RadioField from "../../components/Inputs/RadioField.jsx";
import "./AuthPage.css"
import {useState} from "react";
import {getFetchErrorMessage} from "../../utils/errorsHandling.ts";
import ErrorField from "../../components/ErrorField/ErrorField.jsx";
import {useLoginUserMutation} from "../../store/api/userApi.js";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "teacher"
    })
    const [login, {error}] = useLoginUserMutation()
    const navigate = useNavigate()

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return(
        <form
            className="auth-container"
            onSubmit={async (e) => {
                e.preventDefault()
                const result = await login(formData)
                if (result.error) return
                navigate('/profile')
            }}>
            <h1>
                Welcome back!
            </h1>

            {
                error ? <ErrorField errorMessage={getFetchErrorMessage(error.status)} />
                    : null
            }

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
