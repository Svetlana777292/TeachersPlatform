import Modal from "react-modal";
import "./AddStudentModal.css"
import Button from "../Button/Button.jsx";
import {useAddStudentMutation} from "../../store/api/studentsApi.js";

const AddStudentModal = (props) => {
    const [addStudent, {error}] = useAddStudentMutation()

    return (
        <Modal className="modalWindow addStudentModal" onRequestClose={props.onClose} isOpen={props.isOpen} >
            <h1 className="addStudentPrompt">Do you want to add this student?</h1>
            <div className="addButtons">
                <Button type="button" className="disagreeButton" onClick={() => props.onClose()}>No</Button>
                <Button type="submit" className="agreeButton" onClick={(e) => {
                    e.preventDefault()
                    addStudent(props.student)
                    console.log('student:', props.student)
                    props.onClose()
                }}>Yes</Button>
            </div>
        </Modal>
    )
}

export default AddStudentModal