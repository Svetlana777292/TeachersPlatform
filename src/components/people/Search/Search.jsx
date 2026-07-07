import {useState, useRef, useEffect} from "react";
import "./Search.css"
import AddStudentModal from "../AddStudentModal/AddStudentModal.jsx";
import {useSearchStudentQuery} from "../../store/api/studentsApi.js";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";

const Search = () => {
    const [searchedStudent, setSearchedStudent] = useState("")
    const [addStudent, setAddStudent] = useState(null)
    const [dropdownOpened, setDropdownOpened] = useState(false)
    const searchWrapperRef = useRef(null)
    const {data: {students: result = []} = {} } = useSearchStudentQuery(searchedStudent, { skip: !searchedStudent.trim() })

    async function handleChange(e) {
        const value = e.target.value
        setSearchedStudent(value)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if ( searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setDropdownOpened(false)
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    return (
        <div className="search-wrapper" ref={searchWrapperRef}>
            <div className="search-with-icon">
                <SearchIcon className="search-icon"/>
                <input
                    type="search"
                    className="search-field"
                    value={searchedStudent}
                    placeholder="Search student to add..."
                    onChange={(e) => {
                        setDropdownOpened(true)
                        handleChange(e)
                    }}/>
            </div>
            {searchedStudent.trim() && result.length > 0 && dropdownOpened &&(
                <div className="search-dropdown">
                    {result.map((student) => (
                        <div key={student.id} className="search-item" onClick={() => {
                            setAddStudent(student.id)
                            setSearchedStudent("")
                        }}>
                            {student.name} {student.surname}{" "}
                            <span className="student-username">{`(@${student.username})`}</span>
                        </div>
                    ))}
                </div>
            )}
            <span className="search-icon"></span>

            <AddStudentModal isOpen={addStudent} onClose={() => setAddStudent(null)} student={{student_id: addStudent}}/>

        </div>
    )
}

export default Search