async function checkToken(func){
    try{
        const response = await fetch(`${CONFIG.API_URL}/token/verify`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            console.log('Токен действителен')
            await func()
        }
        else{
            console.log('Токен не обнаружен или срок его действия истек')
            window.location.href = '/auth/login.html'
        }
    }
    catch(error){
        console.error('Ошибка доступа: ', error)
        window.location.href = '/auth/login.html'
    }
}

export default checkToken