import NavBar from "../NavBar/NavBar.jsx";
import Button from "../Button/Button.jsx";
import {useState} from "react";
import "./Header.css"

const Header = (props) => {
    const [menuOpened, setMenuOpened] = useState(false)

    return(
        <header className="main-header">
            <h1 className="page-title">{props.user.role === "teacher" ? "Teacher dashboard" : "Student dashboard"}</h1>
            <Button className="burger-btn" type="button" onClick={() => setMenuOpened(!menuOpened)}>
                <svg className={`burger-icon ${menuOpened ? "rotated" : ""}`} viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </Button>

            <NavBar currentPage={props.currentPage} role={props.user.role} className={`menu-list ${menuOpened ? "is-open" : ""}`}/>
        </header>
    )
}

export default Header