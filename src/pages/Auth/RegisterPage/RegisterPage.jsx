import AuthRedirection from "../../../components/AuthRedirection/AuthRedirection.jsx";
import "../AuthPage.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import FirstRegisterStep from "./FirstRegisterStep.jsx";
import SecondRegisterStep from "./SecondRegisterStep.jsx";
import {getFetchErrorMessage} from "../../../utils/errorsHandling.jsx";
import ErrorField from "../../../components/ErrorField/ErrorField.jsx";
import {useRegisterUserMutation} from "../../../store/api/userApi.js";

const RegisterPage = () => {
    const [nextStep, setNextStep] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "teacher"
    })
    const [registerUser, {error}] = useRegisterUserMutation()

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
            <form
                className="auth-container"
                onSubmit={
                async (e) => {
                    e.preventDefault()
                    const result = await registerUser(formData)
                    if (result.error) return
                    navigate('/profile')
                }}>
                <h1>
                    Create an account
                </h1>

                {
                    error ?
                        <ErrorField errorMessage={getFetchErrorMessage(error.status)} />
                        : null
                }

                {!nextStep ? (
                    <FirstRegisterStep formData={formData} handleChange={handleChange} setNextStep={setNextStep}/>
                )
                : (
                    <SecondRegisterStep formData={formData} handleChange={handleChange} setNextStep={setNextStep}/>
                )}

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
