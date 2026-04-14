import InputField from "../Inputs/InputField.jsx";
import Select from "react-select";
import Button from "../Button/Button.jsx";
import Modal from "react-modal";
import {useState} from "react";
import "../ChangePasswordWindow/ChangePasswordWindow.css"

const CreateLessonWindow = (props) => {
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

    const [selectedTime, setSelectedTime] = useState(timeOptions[0])
    const [selectedDuration, setSelectedDuration] = useState(durationOptions[0])

    const [lessonData, setLessonData] = useState({
        student_id: "",
        description: "",
        date: "",
        duration: selectedDuration,
    })

    const handleChange = (e) => {

        console.log(e.target.name, e.target.value)

        setLessonData({
            ...lessonData,
            [e.target.name]: e.target.value
        })
    }

    function handleClose(e) {
        e.preventDefault()
        props.onClose()
        document.getElementById("form")?.reset()
    }

    const selectStyles = {
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: base => ({
            ...base,
            backgroundColor: "#F3F4F6",
            border: "1px solid #EAEAEA",
            borderRadius: "0.5rem",
            padding: "0 1rem",
            color: "#000000",
            fontSize: "0.9rem",
            cursor: "pointer",
        }),
        menu: base => ({
            ...base,
            backgroundColor: "#F3F4F6",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "0.5rem 0",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "#E5E7EB" : "#F3F4F6", // ховер-эффект
            color: "#000000",
            fontSize: "0.9rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
        }),
    }

    return (
        <Modal className="modalWindow createLessonWindow" onRequestClose={props.onClose} isOpen={props.isOpen} style={{ content: {} }}>
            <form id="form" onChange={handleChange}>
                <h2 className="newLessonTitle">Create New Lesson</h2>
                <InputField type="text" label="Student" placeholder="Enter student name" />
                <InputField type="text" label="Description" placeholder="Enter short description" />

                <InputField type="text" label="Date" placeholder="DD.MM.YYYY" />
                <div className="selects">
                    <label>
                        Time
                        <Select
                            classNamePrefix="selectDuration"
                            isSearchable={false}
                            unstyled
                            options={timeOptions}
                            defaultValue={timeOptions[0]}
                            onChange={(selectedOption) => setSelectedTime(selectedOption)}
                            menuPortalTarget={document.body}
                            styles={selectStyles}
                        />
                    </label>
                    <label>
                        Duration
                        <Select
                            classNamePrefix="selectDuration"
                            isSearchable={false}
                            unstyled
                            options={durationOptions}
                            defaultValue={durationOptions[0]}
                            onChange={(selectedOption) => setSelectedDuration(selectedOption)}
                            menuPortalTarget={document.body}
                            styles={selectStyles}
                        />
                    </label>
                </div>
            </form>
            <Button className="cancel" onClick={(e) => handleClose(e)}>Cancel</Button>
            <Button className="confirmBtn">Create lesson</Button>
        </Modal>
    )
}

export default CreateLessonWindow