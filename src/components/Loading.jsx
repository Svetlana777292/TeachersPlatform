const Loading = () => {
    return (
        <>
            <div id="overlay" className=""></div>
            <div id='loadingScreen' className="loading">
                <div className="gear-wrapper">
                    <img className="gear" src="/gear.svg" alt="Загрузка"/>
                </div>
                <h2>Загружаем ваш профиль...</h2>
            </div>
        </>
    )
}

export default Loading