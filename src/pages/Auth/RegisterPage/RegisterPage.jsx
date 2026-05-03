import InputField from '../../../components/Inputs/InputField.jsx'
import Button from "../../../components/Button/Button.jsx";
import AuthRedirection from "../../../components/AuthRedirection/AuthRedirection.jsx";
import RadioField from "../../../components/Inputs/RadioField.jsx";
import "../AuthPage.css"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import handleSubmit from "../../../utils/responses.js";
import FirstRegisterStep from "./FirstRegisterStep.jsx";
import SecondRegisterStep from "./SecondRegisterStep.jsx";

const RegisterPage = () => {
    const [nextStep, setNextStep] = useState(false)
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
            <form  className="auth-container" onSubmit={(e) => handleSubmit("POST", formData, 'register', e, () => navigate("/profile/"))}>
                <h1>
                    Create an account
                </h1>

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
