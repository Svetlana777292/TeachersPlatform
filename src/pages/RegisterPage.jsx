import InputField from '../components/InputField.jsx'
import Button from "../components/Button.jsx";
import AuthRedirection from "../components/AuthRedirection.jsx";
import RadioField from "../components/RadioField.jsx";
import "./AuthPage.css"

const RegisterPage = () => {
    return(
        <>
            <form id="registration-form" className="auth-container">
                <h1>
                    Create an account
                </h1>

                <div className="fullname-group">
                    <InputField id="name" type="text" className="fullname-field" placeholder="Ivan" label="Name"/>
                    <InputField id="surname" type="text" className="fullname-field" placeholder="Ivanov" label="Surame"/>
                </div>

                <div className="roles-group">
                    <RadioField  className="role" label="I'm a teacher" value="teacher" defaultChecked={true} />
                    <RadioField  className="role" label="I'm a student" value="student" />
                </div>

                <InputField id="email" type="email" placeholder="ivan.ivanov@example.com" label="Email"/>

                <InputField id="password" type="password" placeholder="Password123" label="Password"/>

                <InputField id="repeat-password" type="password" placeholder="Password123" label="Repeat Password"/>

                <Button type="submit" text="Sign up" className="auth-button"/>

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
