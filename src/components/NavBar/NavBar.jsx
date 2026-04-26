import {Link} from "react-router-dom";
import "./NavBar.css"

const teacherItems = [
    {href: "/", text: "Finance"},
    {href: "/schedule", text: "Schedule"},
    {href: "/studentsList", text: "My students"},
    {href: "/", text: "Profile"},
]

const studentItems = [
    {href: "/", text: "My teachers"},
    {href: "/", text: "Schedule"},
    {href: "/", text: "Profile"},
]

const NavBar = (props) => {
    let navItems

    if(props.role === "teacher") {
        navItems = teacherItems
    }
    else {
        navItems = studentItems
    }

    return (
        <nav className="menu">
            <ul className={props.className}>
                {navItems.map((item) => (
                    <li className="link" key={item.text}>
                        <Link to={item.href}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar