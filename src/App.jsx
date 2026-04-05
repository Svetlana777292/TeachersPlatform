import {Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/Dashboard/ProfilePage.jsx";
import {useEffect, useRef, useState} from "react";
import checkToken from "./utils/checkToken.js";
import Loading from "./components/Loading.jsx";

function App() {
  const [token, setToken] = useState(false)
    const [loading, setLoading] = useState(true)
    const hasChecked = useRef(false)

  useEffect(() => {
    if(hasChecked.current) return

    hasChecked.current = true

    async function verifyToken() {
        try{
            const result = await checkToken()
            setToken(result)
        }
        catch(error){
            console.log(error)
            setToken(false)
        }
        finally{
            setLoading(false)
        }
    }

    verifyToken()
  }, [])

  if(loading){
      return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path="/register/" element={<RegisterPage/>}/>
        <Route path="/login/" element={<LoginPage/>}/>
        <Route path="/" element={token ? <ProfilePage /> : <LoginPage/>}/>
        <Route path="/Profile/" element={<ProfilePage/>}/>
      </Routes>
    </>
  )
}

export default App
