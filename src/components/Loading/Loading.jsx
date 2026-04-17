import "./Loading.css"

const Loading = () => {
    return (
        <>
            <div className="loading">
                <div className="gear-wrapper">
                    <img className="gear" src="/gear.svg" alt="Загрузка"/>
                </div>
                <h2>Your profile is loading...</h2>
            </div>
        </>
    )
}

export default Loading