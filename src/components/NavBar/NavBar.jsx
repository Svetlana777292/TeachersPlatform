import {Link} from "react-router-dom";
import "./NavBar.css"

const teacherItems = [
    {href: "/", text: "Finance", src: "../../../public/"},
    {href: "/schedule", text: "Schedule", src: "../../../public/calendarBlack.svg"},
    {href: "/studentsList", text: "My students", src: "../../../public/blackPeople.svg"},
    {href: "/Profile", text: "Profile", src: "../../../public/human.svg"},
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
                    <div className="linkWrapper">
                        <img className="linkIcon" src={item.src}/>
                        <li className="link" key={item.text}>
                            <Link to={item.href}>{item.text}</Link>
                        </li>
                    </div>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar