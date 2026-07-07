import React from 'react';
import { Link } from 'react-router-dom';
import "./AuthRedirection.css"

const AuthRedirection = ({text, linkText, to }) => {
    return (
        <p className="auth-redirection-text">
            {text} <Link to={to} className="auth-redirection-link">{linkText}</Link>
        </p>
    );
};

export default AuthRedirection;
