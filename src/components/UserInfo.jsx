const UserInfo = ({user, photo, setPhoto}) => {

    function formatDate(isoString){
        const date = new Date(isoString)

        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()

        return `${day}.${month}.${year}`
    }

    async function setUserPhoto(file){

        const formData = new FormData()
        formData.append('photo', file)

        try{
            const response = await fetch(`/api/storage/avatar`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
                credentials: 'include'
            })

            if(response.ok){
                const data = await response.json()
                console.log(data)
                console.log('Фото успешно загружено, URL: ', data.storage_key)

            }
            else{
                console.log('Ошибка загрузки: ', response.status)
            }
        }
        catch(error){
            console.error(error)
        }
    }

    async function getUserPhoto(){
        try{
            const response = await fetch(`/api/storage/avatar/${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            if(response.ok){
                const photoUrl = await response.json()
                return photoUrl.url
            }
        }
        catch(error){
            console.error(error)
        }
    }

    async function handleAvatarChange(e){
        const selectedPhoto = e.target.files[0]
        if(!selectedPhoto) return

        await setUserPhoto(selectedPhoto)
        const url = await getUserPhoto()
        setPhoto(url)
    }

    return (
        <aside className="user-info">
            <div className="avatar-wrapper">
                <input id="avatarInput" type="file" className="avatar-input" accept="image/*" onChange={handleAvatarChange}/>
                <img src={photo} alt="" className="avatar-img"/>
            </div>

            <h1 className="main-title">{user.name + " " + user.surname}</h1>
            <h3 className="role">{user.role}</h3>

            <label htmlFor="avatarInput" className="btn edit-avatar-btn" type="button">Edit avatar</label>

            <dl className="account-info">
                <dt>Registration date</dt>
                <dd>{formatDate(user.createdAt)}</dd>
                <dt>{user.role === "teacher" ? "Total students" : "Active teachers"}</dt>
                <dd>0</dd>
            </dl>
        </aside>
    )
}

export default UserInfo