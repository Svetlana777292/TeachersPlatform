import ErrorField from "./ErrorField.jsx";

const InputField = (props) => {
    return (
        <label htmlFor={props.id} className={props.className}>
            {props.label}
            <input
                className={props.className}
                placeholder={props.placeholder}
                type={props.type}
                name={props.id}
                id={props.id}
                value={props.value}/>
            <ErrorField />
        </label>
    )
}

export default InputField