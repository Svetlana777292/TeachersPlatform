import Button from "../../../components/Button/Button.jsx";
import InputField from "../../../components/Inputs/InputField.jsx";
import RadioField from "../../../components/Inputs/RadioField.jsx";

const SecondRegisterStep = ({formData, handleChange, setNextStep}) => {
    return (
        <>


            <div className="stepProgressWrapper">
                <div className="stepProgressMessage">Step 2 of 2</div>
                <div className="stepIndicator"></div>
                <div className="stepIndicator"></div>
            </div>

            <InputField name="email" type="email" placeholder="ivan.ivanov@example.com" label="Email" vlaue={formData.email} onChange={handleChange}/>

            <InputField name="password" type="password" placeholder="Password123" label="Password" value={formData.password} onChange={handleChange}/>

            <div className="roles-group">
                <RadioField name="role" className="role" label="I'm a teacher" value="teacher" checked={formData.role === 'teacher'} onChange={handleChange} />
                <RadioField name="role" className="role" label="I'm a student" value="student" checked={formData.role === 'student'} onChange={handleChange}/>
            </div>

            <button type="button" className="prevStepButton" onClick={() => setNextStep(false)}>⬅ Back</button>
            <Button type="submit" className="registerButton">Register</Button>
        </>
    )
}

export default SecondRegisterStep