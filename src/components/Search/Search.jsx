import {useState, useRef, useEffect} from "react";
import "./Search.css"
import AddStudentModal from "../AddStudentModal/AddStudentModal.jsx";
import {useSearchStudentQuery} from "../../store/api/studentsApi.js";
import SearchIcon from "../../assets/SearchIcon.jsx";

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
        <div className="searchWrapper" ref={searchWrapperRef}>
            <div className="searchWithIcon">
                <SearchIcon className="searchIcon"/>
                <input
                    type="search"
                    className="searchField"
                    value={searchedStudent}
                    placeholder="Search student to add..."
                    onChange={(e) => {
                        setDropdownOpened(true)
                        handleChange(e)
                    }}/>
            </div>
            {searchedStudent.trim() && result.length > 0 && dropdownOpened &&(
                <div className="searchDropdown">
                    {result.map((student) => (
                        <div key={student.id} className="searchItem" onClick={() => {
                            setAddStudent(student.id)
                            setSearchedStudent("")
                        }}>
                            {student.name} {student.surname}{" "}
                            <span className="studentUsername">{`(@${student.username})`}</span>
                        </div>
                    ))}
                </div>
            )}
            <span className="searchIcon"></span>

            <AddStudentModal isOpen={addStudent} onClose={() => setAddStudent(null)} student={{student_id: addStudent}}/>

        </div>
    )
}

export default Search