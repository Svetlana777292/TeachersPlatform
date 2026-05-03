import InputField from "../../../components/Inputs/InputField.jsx";
import Button from "../../../components/Button/Button.jsx";

const FirstRegisterStep = ({formData, handleChange, setNextStep}) => {
    return (
        <>
            <div className="stepProgressWrapper">
                <div className="stepProgressMessage">Step 1 of 2</div>
                <div className="stepIndicator"></div>
                <div className="stepIndicator secondStepIndicator"></div>
            </div>

            <div className="fullname-group">
                <InputField name="name" type="text" className="fullname-field" placeholder="Ivan" label="Name" value={formData.name} onChange={handleChange}/>
                <InputField name="surname" type="text" className="fullname-field" placeholder="Ivanov" label="Surame" value={formData.surname} onChange={handleChange}/>
            </div>

            <InputField name="username" type="text" placeholder="ivanovivan" label="Username" value={formData.username} onChange={handleChange}/>

            <Button type="button" className="nextStepButton" onClick={() => setNextStep(true)}>Next step</Button>
        </>
    )
}

export default FirstRegisterStep