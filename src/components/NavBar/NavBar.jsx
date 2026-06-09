import {Link} from "react-router-dom";
import "./NavBar.css"
import ProfileIcon from "../../../public/ProfileIcon.jsx"
import CalendarIcon from "../../../public/CalendarIcon.jsx";
import PeopleIcon from "../../../public/PeopleIcon.jsx";
import MoneyIcon from "../../../public/MoneyIcon.jsx";

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
                            className={`linkWrapper ${props.currentPage === item.text ? "activeLink" : ""}`}
                            key={item.text}
                        >
                            {Icon && <Icon className="linkIcon" />}
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