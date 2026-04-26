import Modal from "react-modal";
import {useEffect, useState} from "react";
import handleSubmit from "../../utils/responses.js";
import "react-datepicker/dist/react-datepicker.css"
import "./CreateLessonWindow.css"
import useMyStudents from "../../hooks/useMyStudents.js";
import Loading from "../Loading/Loading.jsx";
import FirstStep from "./FirstStep/FirstStep.jsx";
import SecondStep from "./SecondStep/SecondStep.jsx";

const initialLessonData = {
    topic: "",
    description: "",
    date: "",
    price: 0,
    duration: "",
    card_color: "",
    call_link: "",
    student_id: 0,
    status: "scheduled"
}

const CreateLessonWindow = (props) => {

    const {myStudents, studentsIsLoading} = useMyStudents()
    const [nextStep, setNextStep] = useState(false)
    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [lessonData, setLessonData] = useState(props.fieldsValues || initialLessonData)

    useEffect(() => {
        if (props.isOpen) {
            setLessonData(props.fieldsValues || initialLessonData)
        }
    }, [props.isOpen])


    const handleChange = (e) => {
        const {name, value} = e.target
        const numericFields = ["price", "duration", "student_id"]

        setLessonData({
            ...lessonData,
            [name]: numericFields.includes(name) ? Number(value) : value
        })
    }

    if (studentsIsLoading) return <Loading message="Loading your schedule.."/>

    const getDateTime = () => {
        if (selectedDate && selectedTime) {
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, "0")
            const day = String(selectedDate.getDate()).padStart(2, "0")

            const hours = String(selectedTime.getHours()).padStart(2, "0")
            const minutes = String(selectedTime.getMinutes()).padStart(2, "0")

            return {
                ...lessonData,
                date: new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`)
            }
        }

        return lessonData
    }

    async function handleClose(e) {
        e.preventDefault()
        props.onClose()
        setNextStep(false)
        setSelectedTime(null)
        setSelectedDate(null)
        setLessonData(initialLessonData)
    }

    return (
        <Modal className="modalWindow createLessonWindow" onRequestClose={props.onClose} isOpen={props.isOpen}>
            <form id="form" onChange={handleChange}
                  onSubmit={async (e) => {
                      e.preventDefault()
                      const updatedLessonData = getDateTime()
                      const {created_at, updated_ad, teacher_id, id, ...cleanData } = updatedLessonData
                      await handleSubmit(props.method, cleanData, props.apiPath, e, () => handleClose(e))
                  }}>
                <h2 className="newLessonTitle">
                    {props.title}
                    <span className="stepsCounter">{!nextStep? "1/2" : "2/2"}</span>
                </h2>
                {!nextStep ? (
                    <FirstStep
                        myStudents={myStudents}
                        handleClose={handleClose}
                        handleChange={handleChange}
                        lessonData={lessonData}
                        setLessonData={setLessonData}
                        setNextStep={setNextStep}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        isEditing={props.isEditing}
                        isOpen={props.isOpen}
                    />) : (
                    <SecondStep
                        myStudents={myStudents}
                        handleClose={handleClose}
                        handleChange={handleChange}
                        setLessonData={setLessonData}
                        setNextStep={setNextStep}
                        lessonData={lessonData}
                        selectedTime={selectedTime}
                        submitButtonText={props.onSubmitText}
                    />
                    )}
            </form>
        </Modal>
    )
}

export default CreateLessonWindow