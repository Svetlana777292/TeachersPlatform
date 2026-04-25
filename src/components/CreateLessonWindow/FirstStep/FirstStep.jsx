import Select from "react-select";
import DatePicker from "react-datepicker";
import {selectStyles} from "../selectStyles.js";
import InputField from "../../Inputs/InputField.jsx";
import Button from "../../Button/Button.jsx";
import fixTimezone from "../../../utils/fixTimezone.js";

const FirstStep = (props) => {

    const handleStudentChange = (selectedOption) => {
        if(!selectedOption){
            selectedOption = props.students[0];
        }
        props.setLessonData(prev => ({
            ...prev,
            student_id: selectedOption.value
        }))
    }

    const students = props.myStudents.map((student) => ({
        value: student.id,
        label: `${student.name} ${student.surname} (${student.username})`,
    }))

    const statuses = [
        {value: "SCHEDULED", label: "Scheduled"},
        {value: "COMPLETED", label: "Completed"},
        {value: "IN_PROGRESS", label: "In propgress"}
    ]

    const handleStatusChange = (selectedOption) => {
        if(!selectedOption){
            selectedOption = props.statuses[0];
        }
        props.setLessonData(prev => ({
            ...prev,
            status: selectedOption.value
        }))
    }

    console.log("isEditing:", props.isEditing)
    console.log("isOpen:", props.isOpen)
    console.log("lessonData:", props.lessonData)

    return(
        <div className="stepContainer">
            {props.isEditing && (<label className="selectLabel">
                Lesson status
                <Select
                    classNamePrefix="selectStudent"
                    isSearchable={false}
                    unstyled
                    options={statuses}
                    value={statuses.find(status => status.value === props.lessonData.status) || null}
                    onChange={handleStatusChange}
                    menuPortalTarget={document.body}
                    styles={selectStyles}
                />
            </label>)}
            <label className="selectLabel">
                Select student
                <Select
                    classNamePrefix="selectStudent"
                    isSearchable={false}
                    unstyled
                    options={students}
                    value={students.find(student => student.value === (props.lessonData.student_id)) || null}
                    onChange={handleStudentChange}
                    menuPortalTarget={document.body}
                    styles={selectStyles}
                />
            </label>
            <div className="dateTimeGroup">
                <label className="dateLabel">
                    Date
                    <DatePicker
                        onChange={(date) => props.setSelectedDate(date)}
                        selected={props.lessonData.date ? fixTimezone(props.lessonData.date) : props.selectedDate}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="DD.MM.YYYY"
                        className="customDateInput"
                        showMonthYearDropdown
                    />
                </label>
                <label className="dateLabel">
                    Time
                    <DatePicker
                        onChange={(time) => props.setSelectedTime(time)}
                        selected={props.lessonData.date ? fixTimezone(props.lessonData.date) : props.selectedTime}
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
                value={props.lessonData.duration}
                label="Duration"
                placeholder="Enter duration (min)"
                onChange={props.handleChange}
            />
            <InputField
                name="price"
                type="number"
                value={props.lessonData.price}
                label="Price"
                placeholder="Enter price"
                onChange={props.handleChange}
            />
            <Button
                className="cancel"
                onClick={(e) => props.handleClose(e)}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {props.setNextStep(true)}}
                type="button"
                className="nextStepButton"
            >
                Next
            </Button>
        </div>
    )
}

export default FirstStep