import InputField from '../components/InputField.jsx'
import Button from "../components/Button.jsx";
import AuthRedirection from "../components/AuthRedirection.jsx";
import RadioField from "../components/RadioField.jsx";
import "./AuthPage.css"

const LoginPage = () => {
    return(
        <form id="login-form" className="auth-container">
            <h1>
                Welcome back!
            </h1>

            <div className="roles-group">
                <RadioField  className="role" label="I'm a teacher" value="teacher" defaultChecked={true} />
                <RadioField  className="role" label="I'm a student" value="student" />
            </div>

            <InputField id="email" type="email" placeholder="ivan.ivanov@example.com" label="Email"/>

            <InputField id="password" type="password" placeholder="Password123" label="Password"/>

            <Button type="submit" text="Sign in" className="auth-button"/>

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
