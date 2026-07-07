import "./ErrorField.css"

const ErrorField = (props) => {
    return(
        <div id={props.id} className="error-message">{props.errorMessage}</div>
    )
}

export default ErrorField