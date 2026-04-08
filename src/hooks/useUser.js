import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function useUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(`/api/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })

                if(response.ok){
                    const data = await response.json()
                    setUser(data)
                }
                else{
                    setError("Unautorized")
                }
            }
            catch(error) {
                setError(error)
            }
            finally{
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        if(error){
            return navigate('/login/')
        }
    }, [error])

    return {user, navigate, error, setUser, isLoading}
}

export default useUser
