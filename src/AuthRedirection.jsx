const AuthRedirection = (props) => {
    return(
        <h2 className="auth-redirection">
            {props.prompt}
            <a href={props.href} className="auth-redirection-link">{props.text}</a>
        </h2>
    )
}

export default AuthRedirection