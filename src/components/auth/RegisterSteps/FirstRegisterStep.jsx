import InputField from "../../shared/Inputs/InputField.jsx";
import Button from "../../shared/Button/Button.jsx";

const FirstRegisterStep = ({formData, handleChange, setNextStep}) => {
    return (
        <>
            <div className="step-progress-wrapper">
                <div className="step-progress-message">Step 1 of 2</div>
                <div className="step-indicator"></div>
                <div className="step-indicator second-step-indicator"></div>
            </div>

            <div className="fullname-group">
                <InputField name="name" type="text" className="fullname-field" placeholder="Ivan" label="Name" value={formData.name} onChange={handleChange}/>
                <InputField name="surname" type="text" className="fullname-field" placeholder="Ivanov" label="Surame" value={formData.surname} onChange={handleChange}/>
            </div>

            <InputField name="username" type="text" placeholder="ivanovivan" label="Username" value={formData.username} onChange={handleChange}/>

            <Button type="button" className="next-step-button" onClick={() => setNextStep(true)}>Next step</Button>
        </>
    )
}

export default FirstRegisterStep