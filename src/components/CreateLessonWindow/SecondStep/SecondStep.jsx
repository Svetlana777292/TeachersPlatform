import InputField from "../../Inputs/InputField.jsx";
import Select from "react-select";
import Button from "../../Button/Button.jsx";
import {selectStyles} from "../selectStyles.js";
import LessonCard from "../../LessonCard/LessonCard.jsx";
import "./SecondStep.css"
import {useCreateLesson} from "../useCreateLesson.js";

const COLORS = [
    {value: "#FFFF00", label: "yellow"},
    {value: "#9ACD32", label: "green"},
    {value: "#4682B4", label: "blue"},
    {value: "#8A2BE2", label: "purple"},
]

const SecondStep = (props) => {

    const handleColorChange = selectedOption => {
        if(!selectedOption) {
            selectedOption = COLORS[0]
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
                    options={COLORS}
                    value={COLORS.find(color => color.value === props.lessonData.card_color) || null}
                    onChange={handleColorChange}
                    menuPortalTarget={document.body}
                    styles={selectStyles}
                />
            </label>

            <label className="lessonCardLabel">
                Lesson card preview
                <LessonCard
                    className="lessonCardPreview"
                    lesson={{
                        topic: props.lessonData.topic || "Theme",
                        student_id: props.lessonData.student_id || null,
                        card_color: props.lessonData.card_color || "#4682B4",
                        date: props.selectedTime || new Date(),
                        duration: props.lessonData.duration || 60,
                        price: props.lessonData.price ? props.lessonData.price : "Price"
                    }}
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
                    {props.submitButtonText}
                </Button>
            </div>
        </div>
    )
}

export default SecondStep