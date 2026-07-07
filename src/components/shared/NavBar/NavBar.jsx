import {Link} from "react-router-dom";
import "./NavBar.css"
import ProfileIcon from "../../../assets/icons/ProfileIcon.jsx"
import CalendarIcon from "../../../assets/icons/CalendarIcon.jsx";
import PeopleIcon from "../../../assets/icons/PeopleIcon.jsx";
import MoneyIcon from "../../../assets/icons/MoneyIcon.jsx";

const teacherItems = [
    {href: "/", text: "Finance", icon: MoneyIcon},
    {href: "/schedule", text: "Schedule", icon: CalendarIcon},
    {href: "/people", text: "My students", icon: PeopleIcon},
    {href: "/Profile", text: "Profile", icon: ProfileIcon},
]

const studentItems = [
    {href: "/schedule", text: "Schedule", icon: CalendarIcon},
    {href: "/Profile", text: "Profile", icon: ProfileIcon},
]

const NavBar = (props) => {
    const navItems = props.role === "teacher" ? teacherItems : studentItems;

    return (
        <nav className="menu">
            <ul className={props.className}>
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li
                            className={`link-wrapper ${props.currentPage === item.text ? "active-link" : ""}`}
                            key={item.text}
                        >
                            {Icon && <Icon className="link-icon" />}
                            <Link className="link" to={item.href}>
                                {item.text}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavBar