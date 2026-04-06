import UserInfo from "./UserInfo.jsx";
import UserInfoForm from "./UserInfoForm.jsx";
import AccountManagement from "./AccountManagement.jsx";
import ChangePasswordWindow from "./ChangePasswordWindow.jsx";
import NavBar from "./NavBar.jsx";
import Button from "./Button.jsx";
import {useState} from "react";

const Header = (props) => {

    const [menuOpened, setMenuOpened] = useState(false)

    return(
        <header className="main-header">
            <h1 className="page-title">Profile</h1>
            <Button className="burger-btn" type="button" onClick={() => setMenuOpened(!menuOpened)}>
                <svg id="menuIcon" className={`burger-icon ${menuOpened ? "rotated" : ""}`} viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                          strokeLinejoin="round"/>
                </svg>
            </Button>

            <NavBar role={props.user.role} className={`menu-list ${menuOpened ? "is-open" : ""}`}/>
        </header>
    )
}

export default Header