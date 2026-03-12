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
const avatarArea = document.getElementById('avatarArea')
const userAvatarImg = document.getElementById('avatarImg')
let user_id = null

//Загрузка данных
function loadProfile(userData) {
    checkToken(() => getUserPhoto())

    fullNameTitle.innerText = userData.name + ' ' + userData.surname

    inputs[0].value = userData.name
    inputs[1].value = userData.surname
    inputs[2].value = userData.email
    inputs[3].value = userData.phoneNumber || ''
    inputs[4].value = userData.subjects || ''
    inputs[5].value = userData.description || ''


    inputs.forEach(input => {
        input.placeholder = input.value
    })

    return 'Done'
}

//Получение данных
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
            user_id = data.id
            return user_id
        }
        else{
            window.location.href = '/auth/login.html'
        }
    }
    catch(error){
        console.error('Ошибка сети: ', error)
    }
}

//Проверка токена
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
            func()
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

document.addEventListener('DOMContentLoaded', async () =>{
    await checkToken(loadUser)
})

//Открытие меню
menuBtn.addEventListener('click', () => {
    console.log('menu is opened')
    menu.classList.toggle('is-open')
})

avatarArea.onchange = async () => {
    const selectedFile = avatarArea.files[0]

    if(!selectedFile){
        return
    }

    console.log('Файл выбран: ', selectedFile)
    await checkToken(() => setUserPhoto(selectedFile))
    await checkToken(() => getUserPhoto())
}

async function getUserPhoto(){

    try{
        const response = await fetch(`${CONFIG.API_URL}/storage/avatar/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if(response.ok){
            const photoUrl = await response.json()
            userAvatarImg.src = photoUrl.url
        }
    }
    catch(error){
        console.error(error)
    }
}

async function setUserPhoto(file){

    const formData = new FormData()
    formData.append('photo', file)

    try{
        const response = await fetch(`${CONFIG.API_URL}/storage/avatar`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
            credentials: 'include'
        })

        if(response.ok){
            const data = await response.json()
            console.log('Фото успешно загружено, URL: ', data.storage_key)

        }
        else{
            console.log('Ошибка загрузки: ', response.status)
            getUserPhoto()
        }
    }
    catch(error){
        console.error(error)
    }
}

editPhotoBtn.addEventListener('click', (e) => {
    avatarArea.click()
})

//Активация формы
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

//Выход из профиля
async function logout() {
    try{
        const response = await fetch(`${CONFIG.API_URL}/logout`,{
            method: 'POST',
            credentials: 'include',
        })

        if(response.ok){
            window.location.replace('/auth/login.html')
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