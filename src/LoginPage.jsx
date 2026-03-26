import InputField from './InputField.jsx'
import Button from "./Button.jsx";
import AuthRedirection from "./AuthRedirection.jsx";
import RadioField from "./RadioField.jsx";
import "./RegisterPage.css"

const LoginPage = () => {
    return(
        <form id="login-form" className="container">
            <h1>
                Welcome back!
            </h1>

            <div className="roles-container">
                <RadioField  className="role" label="I'm a teacher" value="teacher" defaultChecked={true} />
                <RadioField  className="role" label="I'm a student" value="student" />
            </div>

            <InputField id="email" type="email" placeholder="ivan.ivanov@example.com" label="Email"/>

            <InputField id="password" type="password" placeholder="Password123" label="Password"/>

            <Button type="submit" text="Sign in" className="register-button"/>

            <AuthRedirection href="/register/" prompt="Don't have an account?" text="Sign up"/>
        </form>
    )
}

export default LoginPage