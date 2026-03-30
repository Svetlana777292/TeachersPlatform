import ErrorField from "./ErrorField.jsx";

const InputField = (props) => {

    return (
        <label className={props.className}>
            {props.label}
            <input
                className={props.className}
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}/>
            <ErrorField />
        </label>
    )
}

export default InputField