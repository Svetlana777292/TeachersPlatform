import "./Inputs.css"

const RadioField = (props) => {
    return(
        <label>
            <input
                type="radio"
                name={props.name}
                className={props.className}
                value={props.value}
                onChange={props.onChange}
                checked={props.checked}/>
            {props.label}
        </label>
    )
}

export default RadioField