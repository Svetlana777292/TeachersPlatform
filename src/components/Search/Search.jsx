import {useState} from "react";

const Search = () => {
    const [searchedStudent, setSearchedStudent] = useState(null)

    async function searchStudent(target) {
        if(!target.trim(' ')) {
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
        setSearchedStudent(e.target.value)

        const data = await searchStudent(searchedStudent)
        console.log(data)
    }

    return (
        <div className="searchWrapper">
            <input type="search" className="searchField" placeholder="Search student..." onChange={(e) => handleChange(e)}/>
            <span className="searchIcon"></span>
        </div>

    )
}

export default Search