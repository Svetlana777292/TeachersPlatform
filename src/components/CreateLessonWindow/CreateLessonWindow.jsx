import InputField from "../Inputs/InputField.jsx";
import Select from "react-select/base";
import Button from "../Button/Button.jsx";
import Modal from "react-modal";

const CreateLessonWindow = () => {
    const durationOptions = [
        { value: "1", label: "1 hour" },
        { value: "1.5", label: "1.5 hours" },
        { value: "2", label: "2 hours" },
    ]

    const timeOptions = [
        { value: "1", label: "1 hour" },
        { value: "1.5", label: "1.5 hours" },
        { value: "2", label: "2 hours" },
    ]

    return (
        <Modal className="newLessonWindow" >
            <h2 className="newLessonTitle">Create New Lesson</h2>
            <InputField label="Student" placeholder="Enter student name" />
            <InputField label="Description" placeholder="Enter short description" />

            <InputField label="Date" placeholder="DD.MM.YYYY" />
            <div className="selects">
                <label>
                    Time
                    <Select
                        classNamePrefix="selectDuration"
                        unstyled
                        options={timeOptions}
                        defaultValue={timeOptions[0]}
                    />
                </label>
                <label>
                    Duration
                    <Select
                        classNamePrefix="selectDuration"
                        unstyled
                        options={durationOptions}
                        defaultValue={durationOptions[0]}
                    />
                </label>
            </div>
            <div className="buttons">
                <Button>Cancel</Button>
                <Button className="confirmBtn">Create lesson</Button>
            </div>
        </Modal>
    )
}

export default CreateLessonWindow