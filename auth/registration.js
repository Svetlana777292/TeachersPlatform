const form = document.getElementById('registration-form')
const button = document.getElementById('button')
const selectedRoleElement = document.querySelector('input[name="role"]:checked')
const nameField = form.querySelector('[name="name"]')
const usernameField = form.querySelector('[name="username"]')
const surnameField = form.querySelector('[name="surname"]')
const emailField = form.querySelector('[name="email"]')
const passwordField = form.querySelector('[name="password"]')


function showError(name, message) {
    const errorContainer = document.getElementById(name + 'Error')

    if(errorContainer) {
        errorContainer.innerText = message
        errorContainer.hidden = false
    }
}

function hideError(name) {
    const errorContainer = document.getElementById(name + 'Error')

    if(errorContainer) {
        errorContainer.textContent = ''
        errorContainer.hidden = true
    }
}

function validateInput(input){
    let errorMessage = null
    const value = input.value
    const name = input.name

    //Идентификация ошибок
    switch(name){
        case 'surname':
        case 'name':
            const namePattern = /^[а-яА-ЯёЁ]{2,}$/;
            if(!namePattern.test(value)){
                errorMessage = 'Допускается только кириллица (минимум 2 символа).'
            }
            break;

        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

            if(!emailPattern.test(value)){
                errorMessage = 'Проверьте корректность введенного адреса.'
            }
            break;

        case 'username':
            const usernamePattern = /^[a-zA-z0-9]{3,}$/;

            if(!usernamePattern.test(value)){
                errorMessage = 'Имя пользователя состоит из латинских символов и цифр.'
            }
            break;

        case 'password':
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

            if(!passwordPattern.test(value)){
                errorMessage = 'Пароль слишком слабый (минимум 8 симоволов).'
            }
            break;

        default:
            if(value.length === 0){
                errorMessage = 'Поле обязательно к заполнению.'
            }
            break;
    }

    //Вывод ошибки
    if(errorMessage){
        showError(name, errorMessage)
        return false
    }
    else{
        hideError(name)
        return true
    }
}

async function submitFormData(){
    const formData = {
        username: usernameField.value,
        email: emailField.value,
        role: selectedRoleElement.value,
        name: nameField.value,
        surname: surnameField.value,
        password: passwordField.value
    }

    try{
        const response = await fetch(`${CONFIG.API_URL}/register`, {
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

form.addEventListener('focusout', (event) => {
    validateInput(event.target)
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const inputs = [usernameField, emailField, selectedRoleElement, nameField, surnameField,  passwordField]
    let isFormValid = true

    inputs.forEach(input => {
        const isValid = validateInput(input)
        if(!isValid){
            isFormValid = false
        }
    })

    if(isFormValid){
        submitFormData().catch(console.error)
    }
    else {
        console.log('Ошибка ввода данных')
    }
})





