import NavBar from "../NavBar/NavBar.jsx";
import Button from "../Button/Button.jsx";
import {useState} from "react";
import "./Header.css"
import {useGetUserQuery} from "../../store/api/userApi.ts";

const Header = ({currentPage}) => {
    const {data: user} = useGetUserQuery()
    const [menuOpened, setMenuOpened] = useState(false)

    return(
        <header className="main-header">
            <div className="layout-container header-inner">
                <h1 className="page-title">{user?.role === "teacher" ? "Teacher dashboard" : "Student dashboard"}</h1>
                <Button className="burger-btn" type="button" onClick={() => setMenuOpened(!menuOpened)}>
                    <svg className={`burger-icon ${menuOpened ? "rotated" : ""}`} viewBox="0 0 24 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </Button>

                <NavBar currentPage={currentPage} role={user?.role} className={`menu-list ${menuOpened ? "is-open" : ""}`}/>
            </div>
        </header>
    )
}

export default Header