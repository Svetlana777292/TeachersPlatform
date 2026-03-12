const form = document.getElementById('login-form')
const emailField = form.querySelector('[name="email"]')
const passwordField = form.querySelector('[name="password"]')
const errorArea = document.getElementById('login-error')

async function submitFormData(){

    const selectedRoleElement = document.querySelector('input[name="role"]:checked')

    const formData = {
        role: selectedRoleElement.value,
        email: emailField.value,
        password: passwordField.value,
    }

    try{
        const response = await fetch(`${CONFIG.API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        })

        if(response.ok){
            window.location.replace('/profile/profile.html')
        }
        else{
            alert('Ошибка сервера: ' + response.status)
        }
    }
    catch(error){
        errorArea.innerText = 'Проверьте корректность введенных данных.'
        console.log('Ошибка сети: ', error)
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    if(!emailField.value || !passwordField.value){
        errorArea.innerText = 'Заполните все поля!'
        return
    }

    await submitFormData().catch(console.error)
});