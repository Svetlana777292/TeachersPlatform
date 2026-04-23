import "./Loading.css"

const Loading = (props) => {
    return (
        <>
            <div className="loading">
                <div className="gear-wrapper">
                    <img className="gear" src="/gear.svg" alt="Загрузка"/>
                </div>
                <h2>{props.message}</h2>
            </div>
        </>
    )
}

export default Loading