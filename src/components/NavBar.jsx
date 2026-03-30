import {Link} from "react-router-dom";

const navItems = [
    {href: "/", text: "Finance"},
    {href: "/", text: "Schedule"},
    {href: "/", text: "Profile"},
]

const NavBar = () => {
    return (
        <nav className="menu">
            <ul className="menu-list">
                {navItems.map((item) => (
                    <li className="link">
                        <Link to={item.href}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default NavBar