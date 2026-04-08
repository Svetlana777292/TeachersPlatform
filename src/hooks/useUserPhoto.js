import {useEffect, useState} from "react";

function useUserPhoto(userId) {
    const [photo, setPhotoState] = useState(null)
    const [isPhotoLoading, setIsPhotoLoading] = useState(true)

    useEffect(() => {
        if(!userId) return

        const fetchPhoto = async () => {
            setIsPhotoLoading(true)
            try {
                const photoResponse = await fetch(`/api/storage/avatar/${userId}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (photoResponse.ok) {
                    const photoData = await photoResponse.json()
                    setPhotoState(photoData.url)
                }
            }
            catch (error) {
                console.error(error)
            }
            finally{
                setIsPhotoLoading(false)
            }
        }
        fetchPhoto()
    }, [userId])

    const setPhoto = async (file) => {

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
                const photoURL = URL.createObjectURL(file);
                setPhotoState(photoURL);
            }
            else{
                console.log('Ошибка загрузки: ', response.status)
            }
        }
        catch(error){
            console.error(error)
        }
    }

    return { photo, setPhoto, isPhotoLoading }
}

export default useUserPhoto

