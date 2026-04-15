import InputField from "../Inputs/InputField.jsx";
import Select from "react-select";
import Button from "../Button/Button.jsx";
import Modal from "react-modal";
import {useState} from "react";
import handleSubmit from "../../utils/responses.js";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./CreateLessonWindow.css"

const CreateLessonWindow = (props) => {
    const timeOptions = [
        { value: "1", label: "1 hour" },
        { value: "1.5", label: "1.5 hours" },
        { value: "2", label: "2 hours" },
    ]

    const students = [
        {value: 1, label: "Ivanov Ivan"},
        {value: 2, label: "Petrov Petr"},
        {value: 3, label: "Vasiliev Vasiliy"},
    ]

    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState(students[0])
    const [selectedDate, setSelectedDate] = useState(null)


    const [lessonData, setLessonData] = useState({
        student_id: selectedStudent.value,
        description: "",
        date: "",
        duration: "",
    })

    const handleChange = (e) => {
        setLessonData({
            ...lessonData,
            [e.target.name]: e.target.value
        })
    }

    const handleDateChange = (e) => {
        const newDate = e.target.value
        setDate(newDate)
        if (newDate && selectedTime) {
            setLessonData(prev => ({
                ...prev,
                date: new Date(`${newDate}T${selectedTime.value}:00`).toISOString()
            }))
        }
    }

    const handleTimeChange = (selectedOption) => {
        setSelectedTime(selectedOption)
        if (date && selectedOption) {
            setLessonData(prev => ({
                ...prev,
                date: new Date(`${date}T${selectedOption.value}:00`).toISOString()
            }))
        }
    }

    const handleStudentChange = (selectedOption) => {
        setSelectedStudent(selectedOption)
        setLessonData(prev => ({
            ...prev,
            student_id: selectedOption.value
        }))
    }

    const handleDurationChange = (selectedOption) => {
        setLessonData(prev => ({
            ...prev,
            duration: selectedOption.value
        }))
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
            backgroundColor: state.isFocused ? "#E5E7EB" : "#F3F4F6",
            color: "#000000",
            fontSize: "0.9rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
        }),
    }

    return (
        <Modal className="modalWindow createLessonWindow" onRequestClose={props.onClose} isOpen={props.isOpen} style={{ content: {} }}>
            <form id="form" onChange={handleChange} onSubmit={(e) => handleSubmit(lessonData, 'lessons', e, () => console.log(lessonData))}>
                <h2 className="newLessonTitle">Create New Lesson</h2>
                <label className="selectLabel">
                    Select student
                    <Select
                        classNamePrefix="selectStudent"
                        isSearchable={false}
                        unstyled
                        options={students}
                        defaultValue={students[0]}
                        onChange={handleStudentChange}
                        menuPortalTarget={document.body}
                        styles={selectStyles}
                    />
                </label>
                <InputField name="description" type="text" label="Description" value={lessonData.description} placeholder="Enter short description" onChange={handleChange}/>
                <div className="dateTimeGroup">
                    <label className="dateLabel">
                        Date
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="DD.MM.YYYY"
                            className="customDateInput"
                            showMonthYearDropdown/>
                    </label>
                    <label className="dateLabel">
                        Time
                        <DatePicker
                            selected={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            timeFormat="HH:mm"
                            placeholderText="HH:MM"
                            />
                    </label>
                </div>
                <InputField name="price" type="number" label="Price" placeholder="Enter price"/>
                <InputField name="duration" type="number" label="Duration" placeholder="Enter duration (min)"/>
            </form>
            <Button className="cancel" onClick={(e) => handleClose(e)}>Cancel</Button>
            <Button type="submit" className="confirmBtn" >Create lesson</Button>
        </Modal>
    )
}

export default CreateLessonWindow