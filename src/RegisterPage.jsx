import InputField from './InputField.jsx'
import Button from "./Button.jsx";
import AuthRedirection from "./AuthRedirection.jsx";
import RadioField from "./RadioField.jsx";
import './RegisterPage.css'

const RegisterPage = () => {
    return(
        <>
        <form id="registration-form" className="container">
            <h1>
                Create an account
            </h1>

            <div className="fullname-container">
                <InputField id="name" type="text" className="fullname" placeholder="Ivan" label="Name"/>
                <InputField id="surname" type="text" className="fullname" placeholder="Ivanov" label="Surame"/>
            </div>

            <div className="roles-container">
                <RadioField  className="role" label="I'm a teacher" value="teacher" defaultChecked={true} />
                <RadioField  className="role" label="I'm a student" value="student" />
            </div>

            <InputField id="username" type="text" placeholder="ivanov_ivan" label="Username"/>
            <InputField id="email" type="email" placeholder="ivan.ivanov@example.com" label="Email"/>
            <InputField id="password" type="password" placeholder="Password123" label="Password"/>

            <Button type="submit" text="Sign up" className="register-button"/>

            <AuthRedirection href="/login/" prompt="Already have an account?" text="Sign in"/>
        </form>
        </>
    )
}

export default RegisterPage