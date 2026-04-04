const ErrorField = (props) => {
    return(
        <div id={props.id} className="errorMessage">{props.errorMessage}</div>
    )
}

export default ErrorField