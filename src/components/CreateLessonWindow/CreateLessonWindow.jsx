import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css"
import "./CreateLessonWindow.css"
import Loading from "../Loading/Loading.jsx";
import FirstStep from "./FirstStep/FirstStep.jsx";
import SecondStep from "./SecondStep/SecondStep.jsx";
import {useMyStudents} from "../../hooks/useMyStudents.js";
import {useCreateLesson} from "./useCreateLesson.js";

const CreateLessonWindow = ({ isOpen, isEditing, fieldsValues, onClose, title, onSubmitText }) => {
    const { isStudentsLoading } = useMyStudents()
    const {
        nextStep, setNextStep,
        lessonData, setLessonData,
        selectedTime, setSelectedTime,
        selectedDate, setSelectedDate,
        handleChange,
        handleClose,
        handleSubmit,
    } = useCreateLesson({ isOpen, isEditing, fieldsValues, onClose })

    if (isStudentsLoading) return <Loading message="Loading your schedule.."/>

    return (
        <Modal
            className="modalWindow createLessonWindow"
            onRequestClose={handleClose}
            isOpen={isOpen}
            parentSelector={() => document.body}
        >
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <h2 className="newLessonTitle">
                    {title}
                    <span className="stepsCounter">{!nextStep ? "1/2" : "2/2"}</span>
                </h2>
                {!nextStep ? (
                    <FirstStep
                        handleClose={handleClose}
                        lessonData={lessonData}
                        setLessonData={setLessonData}
                        setNextStep={setNextStep}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        selectedTime={selectedTime}
                        setSelectedTime={setSelectedTime}
                        isEditing={isEditing}
                        isOpen={isOpen}
                    />
                ) : (
                    <SecondStep
                        handleClose={handleClose}
                        setLessonData={setLessonData}
                        setNextStep={setNextStep}
                        lessonData={lessonData}
                        selectedTime={selectedTime}
                        submitButtonText={onSubmitText}
                    />
                )}
            </form>
        </Modal>
    )
}

export default CreateLessonWindow