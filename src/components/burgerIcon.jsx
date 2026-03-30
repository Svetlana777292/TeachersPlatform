import '../pages/ProfilePage.css'

const burgerIcon = () => {
    return(
        <svg id="menuIcon" className="burger-icon" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}

export default burgerIcon