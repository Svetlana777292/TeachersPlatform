import Modal from "react-modal";
import "./AddStudentModal.css"
import Button from "../shared/Button/Button.jsx";
import {useAddStudentMutation} from "../../store/api/studentsApi.js";

const AddStudentModal = (props) => {
    const [addStudent, {error}] = useAddStudentMutation()

    return (
        <Modal className="modal-window add-student-modal" onRequestClose={props.onClose} isOpen={props.isOpen} >
            <h1 className="add-student-prompt">Do you want to add this student?</h1>
            <div className="add-buttons">
                <Button type="button" className="disagree-button" onClick={() => props.onClose()}>No</Button>
                <Button type="submit" className="agree-button" onClick={(e) => {
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