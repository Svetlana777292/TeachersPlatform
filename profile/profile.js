const menuBtn = document.getElementById('burgerBtn')
const menu = document.getElementById('menuList')
const editPhotoBtn = document.getElementById('editProfileBtn')
const editInfoForm = document.getElementById('editInfoForm')
const editInfoBtn = document.getElementById('editInfoBtn')
const deleteProfileBtn = document.getElementById('deleteProfileBtn')
const logoutBtn = document.getElementById('exitBtn')
const inputs = document.querySelectorAll('.info-areas')
const fullNameTitle = document.getElementById('fullName')
const loadingScreen = document.getElementById('loadingScreen')

function loadProfile(userData) {
    fullNameTitle.innerText = userData.name + ' ' + userData.surname

    inputs[0].value = userData.name
    inputs[1].value = userData.surname
    inputs[2].value = userData.email

    inputs.forEach(input => {
        input.placeholder = input.value
    })

    return 'Done'
}

async function loadUser(){
    try{
        const response = await fetch(`${CONFIG.API_URL}/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if(response.ok){
            const data = await response.json()
            console.log('Данные успешно получены!: ', data)
            const loadingStatus = loadProfile(data)
            if(loadingStatus === 'Done'){
                loadingScreen.classList.toggle('disabled')
            }

        }
        else{
            window.location.href = '/front/auth/login.html'
        }
    }
    catch(error){
        console.error('Ошибка сети: ', error)
    }
}

async function checkToken(){
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
        }
        else{
            console.log('Токен не обнаружен или срок его действия истек')
            window.location.href = '/front/auth/login.html'
        }
    }
    catch(error){
        console.error('Ошибка доступа: ', error)
        window.location.href = '/front/auth/login.html'
    }
}

document.addEventListener('DOMContentLoaded', async () =>{
    await checkToken()
    await loadUser()
})

menuBtn.addEventListener('click', () => {
    console.log('menu is opened')
    menu.classList.toggle('is-open')
})

editInfoBtn.addEventListener('click', (e) => {
    e.preventDefault();

    switch (editInfoBtn.value) {
        case 'edit':
            editInfoBtn.innerText = 'Сохранить'
            inputs.forEach((input) => {
                input.disabled = false
            })
            inputs[0].focus()
            editInfoBtn.value = 'save'
            break
        case 'save':
            editInfoBtn.innerText = 'Изменить профиль'
            inputs.forEach((input) => {
                input.disabled = true
            })
            editInfoBtn.value = 'edit'
            break
    }
})

async function logout() {
    try{
        const response = await fetch(`${CONFIG.API_URL}/logout`,{
            method: 'POST',
            credentials: 'include',
        })

        if(response.ok){
            window.location.replace('/front/auth/login.html')
        } else {
            console.log('logout error')
        }
    } catch(error){
        console.error(error)
    }
}

logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    await logout()
})