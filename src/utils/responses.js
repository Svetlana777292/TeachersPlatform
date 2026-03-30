
async function handleSubmit(formData, path, e, navigate) {
    e.preventDefault()

    try{
        const response = await fetch(`api/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })

        if(response.ok){
            navigate('/profile/')
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