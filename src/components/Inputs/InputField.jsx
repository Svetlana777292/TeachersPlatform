import ErrorField from "../ErrorField/ErrorField.jsx";
import "./Inputs.css"

const InputField = (props) => {

    return (
        <label>
            {props.label}
            <input
                className={`${props.className}`}
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                defaultValue={props.value}
                onChange={props.onChange}
                disabled={props.disabled}/>
            <ErrorField />
        </label>
    )
}

export default InputField