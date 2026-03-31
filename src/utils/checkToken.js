async function checkToken(){
    try{
        const response = await fetch(`/api/token/verify`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response.ok){
            console.log('Токен действителен')
            return true
        }
        else{
            console.log('Токен не обнаружен или срок его действия истек')
            return false
        }
    }
    catch(error){
        console.error('Ошибка доступа: ', error)
        return false
    }
}

export default checkToken