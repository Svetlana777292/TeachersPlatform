import {useState} from "react";
import "./Search.css"
import AddStudentModal from "../AddStudentModal/AddStudentModal.jsx";

const Search = () => {
    const [searchedStudent, setSearchedStudent] = useState(null)
    const [result, setResult] = useState([])
    const [addStudent, setAddStudent] = useState(null)
    const [dropdown, setDropdown] = useState("flex")

    async function searchStudent(target) {
        if(!target.trim()) {
            return
        }

        try{
            const response = await fetch(`/api/students/search?search=${encodeURIComponent(target)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })

            if(response.ok){
                return await response.json()
            }
            else {
                return null
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function handleChange(e) {
        const value = e.target.value
        setSearchedStudent(value)

        const data = await searchStudent(value)

        if(data?.students) {
            setResult(data.students)
        }
        else {
            setResult([])
        }
    }

    return (
        <div className="searchWrapper">
            <input
                type="search"
                className="searchField"
                value={searchedStudent}
                placeholder="Search student to add..."
                onChange={(e) => handleChange(e)}/>
            {result.length > 0 && (
                <div className="searchDropdown" style={{ display: `${dropdown}` }}>
                    {result.map((student) => (
                        <div key={student.id} className="searchItem" onClick={() => {
                            setAddStudent(student.id)
                            setDropdown("none")
                            setSearchedStudent("")
                        }}>
                            {student.name + " " + student.surname + `(${student.username})`}
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