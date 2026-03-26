// AuthRedirection.jsx (пример)
import React from 'react';
import { Link } from 'react-router-dom'; // Предполагаем, что ты используешь react-router-dom

const AuthRedirection = ({ className, linkClassName, text, linkText, to }) => {
    return (
        <p className={className}>
            {text} <Link to={to} className={linkClassName}>{linkText}</Link>
        </p>
    );
};

export default AuthRedirection;
