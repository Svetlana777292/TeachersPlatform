import { useEffect, useState } from "react"
import {useCreateLessonMutation, useDeleteLessonMutation, useEditLessonMutation} from "../../store/api/lessonsApi.js"
import {toast} from "react-toastify";
import "../../utils/toastStyles.css"
import {dollarsToCents} from "../../utils/moneyUtils.js"

const initialLessonData = {
    topic: "",
    description: "",
    date: "",
    price: 0,
    duration: "",
    card_color: "",
    call_link: "",
    student_id: 0,
    status: "scheduled",
}

const NUMERIC_FIELDS = ["price", "duration", "student_id"]

export function useCreateLesson({ isOpen, isEditing, fieldsValues, onClose }) {
    const [createLesson] = useCreateLessonMutation()
    const [editLesson] = useEditLessonMutation()
    const [deleteLesson] = useDeleteLessonMutation()

    const [nextStep, setNextStep] = useState(false)
    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [lessonData, setLessonData] = useState(fieldsValues || initialLessonData)

    useEffect(() => {
        if (!isOpen) return
        setLessonData(
            fieldsValues
                ? { ...fieldsValues, price: (fieldsValues.price ?? 0) / 100 }
                : initialLessonData
        )
        if (isEditing && fieldsValues?.date) {
            const date = new Date(fieldsValues.date)
            if (!isNaN(date.getTime())) {
                setSelectedTime(date)
                setSelectedDate(date)
            }
        }
    }, [isOpen])

    const handleChange = (e) => {
        const { name, value } = e.target
        setLessonData(prev => ({
            ...prev,
            [name]: NUMERIC_FIELDS.includes(name) ? Number(value) : value
        }))
    }

    const handleClose = () => {
        onClose()
        setNextStep(false)
        setSelectedTime(null)
        setSelectedDate(null)
        setLessonData(initialLessonData)
    }

    const getDateTime = () => {
        if (!selectedDate || !selectedTime) return lessonData
        return {
            ...lessonData,
            date: new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                selectedTime.getHours(),
                selectedTime.getMinutes(),
                0
            )
        }
    }
    
    function validateCreateLessonError(error) {
        switch (error.status) {
            case 400:
                toast.error("Check that the fields are filled in correctly", )
                break
            case 401:
                toast.error("Session expired, please log in again")
                break
            case 409:
                toast.error("A lesson already exists for this time")
                break
            case "FETCH_ERROR":
                toast.error("No connection to the server. Please try again later")
                break
            default:
                toast.error("Something went wrong. Please try again")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { created_at, updated_at, teacher_id, id, ...cleanData } = getDateTime()

        const dataToSend = { ...cleanData, price: dollarsToCents(cleanData.price) }

        if (isEditing) {
            await editLesson({ id: fieldsValues.id, ...dataToSend }).unwrap()
            toast.success("The lesson has been successfully edited!")
        } else {
            try {
                await createLesson(dataToSend).unwrap()
                toast.success("The lesson has been successfully scheduled!")
            } catch (err) {
                validateCreateLessonError(err)
            }
        }
        handleClose()
    }

    const handleDeleteLesson = async (lesson_id) => {
        try {
            await deleteLesson(lesson_id)
            toast.success("The lesson has been successfully deleted!")
        }
        catch (error) {
            toast.error("Something went wrong. Please try again later")
        }
        handleClose()
    }

    return {
        nextStep, setNextStep,
        lessonData, setLessonData,
        selectedTime, setSelectedTime,
        selectedDate, setSelectedDate,
        handleChange,
        handleClose,
        handleSubmit,
        handleDeleteLesson,
    }
}
