import InputField from "../Inputs/InputField.jsx";
import Select from "react-select";
import Button from "../Button/Button.jsx";
import Modal from "react-modal";
import {useState} from "react";
import handleSubmit from "../../utils/responses.js";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./CreateLessonWindow.css"
import useMyStudents from "../../hooks/useMyStudents.js";
import Loading from "../Loading/Loading.jsx";

const CreateLessonWindow = (props) => {

    const {myStudents, studentsIsLoading} = useMyStudents()

    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [nextStep, setNextStep] = useState(false)


    const [lessonData, setLessonData] = useState({
        student_id: 0,
        description: "",
        date: "",
        duration: "",
        card_color: ""
    })

    if (studentsIsLoading) return <Loading />

    const handleChange = (e) => {
        setLessonData({
            ...lessonData,
            [e.target.name]: e.target.value
        })
    }

    const handleStudentChange = (selectedOption) => {
        if(!selectedOption){
            selectedOption = students[0];
        }
        setLessonData(prev => ({
            ...prev,
            student_id: selectedOption.value
        }))
    }

    const handleColorChange = selectedOption => {
        if(!selectedOption) {
            selectedOption = colors[0]
        }
        setLessonData (prev => ({
            ...prev,
            card_color: selectedOption.value
        }))
    }

    const getDateTime = () => {
        if (selectedDate && selectedTime) {
            const date = selectedDate.toISOString().split("T")[0]
            const hours = selectedTime.getHours().toString().padStart(2, "0")
            const minutes = selectedTime.getMinutes().toString().padStart(2, "0")

            setLessonData(prev => ({
                ...prev,
                date: new Date(`${date}T${hours}:${minutes}:00`)
            }))
        }
    }

    function handleClose(e) {
        e.preventDefault()
        props.onClose()
        document.getElementById("form")?.reset()
    }

    const students = myStudents.map((student) => ({
        value: student.id,
        label: `${student.name} ${student.surname} (${student.username})`,
    }))

    const colors = [
        {value: "", label: "yellow"},
        {value: "", label: "green"},
        {value: "", label: "blue"},
        {value: "", label: "purple"},
    ]

    const selectStyles = {
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        control: base => ({
            ...base,
            backgroundColor: "#F3F4F6",
            border: "1px solid #EAEAEA",
            borderRadius: "0.5rem",
            padding: "0 1rem",
            color: "#6B7280",
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
        <Modal className="modalWindow createLessonWindow" onRequestClose={props.onClose} isOpen={props.isOpen}
               style={{content: {}}}>
            <form id="form" onChange={handleChange}
                  onSubmit={async (e) => {
                      e.preventDefault()
                      await getDateTime()
                      handleSubmit(lessonData, 'lessons', e, () => handleClose(e))
                  }}>
                <h2 className="newLessonTitle">Create New Lesson</h2>
                {!nextStep ? (
                    <div className="stepContainer">
                        <label className="selectLabel">
                        Select student
                        <Select
                            classNamePrefix="selectStudent"
                            isSearchable={false}
                            unstyled
                            options={students}
                            onChange={handleStudentChange}
                            menuPortalTarget={document.body}
                            styles={selectStyles}
                        />
                    </label>
                <div className="dateTimeGroup">
                    <label className="dateLabel">
                        Date
                        <DatePicker
                            onChange={(date) => setSelectedDate(date)}
                            selected={selectedDate}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="DD.MM.YYYY"
                            className="customDateInput"
                            showMonthYearDropdown/>
                    </label>
                    <label className="dateLabel">
                        Time
                        <DatePicker
                            onChange={(time) => setSelectedTime(time)}
                            selected={selectedTime}
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
                        <InputField
                            name="duration"
                            type="number"
                            label="Duration"
                            placeholder="Enter duration (min)"
                        />
                        <InputField
                            name="price"
                            type="number"
                            label="Price"
                            placeholder="Enter price"
                            onChange={handleChange}
                        />
                <Button
                    className="cancel"
                    onClick={(e) => handleClose(e)}
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {setNextStep(true)}}
                    type="button"
                    className="nextStepButton"
                >
                    Next
                </Button>
            </div>
            ) : (
                <div className="stepContainer">
                    <InputField
                        name="title"
                        type="text"
                        label="Lesson topic"
                        value={lessonData.description}
                        placeholder="Enter lesson topic"
                        onChange={handleChange}
                    />
                    <InputField
                        name="link"
                        type="text"
                        label="Link to lesson"
                        value={lessonData.link}
                        placeholder="Link to your conferance"
                        onChange={handleChange}
                    />
                    <label className="selectLabel">
                        Select lesson card color
                        <Select
                            classNamePrefix="selectStudent"
                            isSearchable={false}
                            unstyled
                            options={colors}
                            onChange={handleColorChange}
                            menuPortalTarget={document.body}
                            styles={selectStyles}
                        />
                    </label>

                    {/*TODO: lesson card preview*/}

                    <div className="buttonsGroup">
                        <Button
                            onClick={() => {setNextStep(false)}}
                            type="button"
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            className="confirmBtn"
                        >
                            Create lesson
                        </Button>
                    </div>
                </div>
            )}
            </form>
        </Modal>
    )
}

export default CreateLessonWindow