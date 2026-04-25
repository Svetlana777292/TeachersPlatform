
async function handleSubmit(method, formData, path, e, func) {
    e.preventDefault()

    try{
        const response = await fetch(`/api/${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })

        if(response.ok){
            func()
        }
        else{
            alert('Ошибка сервера: ' + response.status)
        }
    }
    catch(error){
        console.log('Ошибка сети: ', error)
    }
}

export default handleSubmit