import Modal from "react-modal";
import "./AddStudentModal.css"
import Button from "../Button/Button.jsx";
import handleSubmit from "../../utils/responses.js";

const AddStudentModal = (props) => {
    return (
        <Modal className="modalWindow addStudentModal" onRequestClose={props.onClose} isOpen={props.isOpen} >
            <h1 className="addStudentPrompt">Do you want to add this student?</h1>
            <div className="addButtons">
                <Button type="button" onClick={() => props.onClose()}>No</Button>
                <Button type="submit" className="agreeButton" onClick={(e) => {
                    handleSubmit(props.student, "me/add_student", e)
                    props.onClose()
                }}>Yes</Button>
            </div>
        </Modal>
    )
}

export default AddStudentModal