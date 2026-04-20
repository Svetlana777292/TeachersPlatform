import {useState, useRef, useEffect} from "react";
import "./Search.css"
import AddStudentModal from "../AddStudentModal/AddStudentModal.jsx";

const Search = () => {
    const [searchedStudent, setSearchedStudent] = useState("")
    const [result, setResult] = useState([])
    const [addStudent, setAddStudent] = useState(null)
    const [dropdownOpened, setDropdownOpened] = useState(false)
    const lastRequestId = useRef(0)
    const searchWrapperRef = useRef(null)

    async function searchStudent(target) {
        if(!target.trim()) {
            return []
        }

        try{
            const response = await fetch(`/api/students/search?q=${encodeURIComponent(target)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })

            if(response.ok){
                const data = await response.json();
                return data.students || [];
            }
            else {
                return []
            }
        }
        catch (error) {
            console.log(error)
            return []
        }
    }

    async function handleChange(e) {
        const value = e.target.value
        setSearchedStudent(value)

        if (!value.trim()) {
            setResult([]);
            return;
        }

        const requestId = ++lastRequestId.current
        const students = await searchStudent(value)

        if(requestId === lastRequestId.current) {
            console.log("search:", value);
            console.log("students from API:", students);

            setResult(students)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchWrapperRef.current &&
                !searchWrapperRef.current.contains(event.target)
            ) {
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
            <input
                type="search"
                className="searchField"
                value={searchedStudent}
                placeholder="Search student to add..."
                onChange={(e) => {
                    setDropdownOpened(true)
                    handleChange(e)
                }}/>
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