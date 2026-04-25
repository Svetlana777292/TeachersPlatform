import InputField from "../../Inputs/InputField.jsx";
import Select from "react-select";
import Button from "../../Button/Button.jsx";
import {selectStyles} from "../selectStyles.js";
import LessonCard from "../../LessonCard/LessonCard.jsx";
import getNameById from "../../../utils/getName.js";
import "./SecondStep.css"

const SecondStep = (props) => {

    const colors = [
        {value: "#FFD700", label: "yellow"},
        {value: "#9ACD32", label: "green"},
        {value: "#4682B4", label: "blue"},
        {value: "#8A2BE2", label: "purple"},
    ]

    const handleColorChange = selectedOption => {
        if(!selectedOption) {
            selectedOption = colors[0]
        }
        props.setLessonData (prev => ({
            ...prev,
            card_color: selectedOption.value
        }))
    }

    return (
        <div className="stepContainer">
            <InputField
                name="topic"
                type="text"
                label="Lesson theme"
                value={props.lessonData.topic}
                placeholder="Enter lesson topic"
                onChange={props.handleChange}
            />
            <InputField
                name="call_link"
                type="text"
                label="Link to lesson"
                value={props.lessonData.call_link}
                placeholder="Link to your conferance"
                onChange={props.handleChange}
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

            <label className="lessonCardLabel">
                Lesson card preview
                <LessonCard
                    className="lessonCardPreview"
                    title={props.lessonData.topic ? props.lessonData.topic : "Theme"}
                    studentName={props.lessonData.student_id ? getNameById(props.lessonData.student_id, props.myStudents) : "Student name"}
                    beginTime={props.selectedTime
                        ? `${props.selectedTime.getHours().toString().padStart(2,"0")}:${props.selectedTime.getMinutes().toString().padStart(2,"0")}`
                        : "10:00"}
                    duration={props.lessonData.duration ? `${props.lessonData.duration} min` : "60 min"}
                    price={props.lessonData.price ? props.lessonData.price : "Price"}
                    color={props.lessonData.card_color ? props.lessonData.card_color : "#4682B4"}
                />
            </label>

            <div className="buttonsGroup">
                <Button
                    onClick={() => {props.setNextStep(false)}}
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
    )
}

export default SecondStep