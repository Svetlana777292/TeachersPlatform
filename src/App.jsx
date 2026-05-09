import {Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import Loading from "./components/Loading/Loading.jsx";
import StudentsList from "./pages/StudentsList/StudentsList.jsx";
import SchedulePage from "./pages/SchedulePage/SchedulePage.jsx";
import {useVerifyUserQuery} from "./store/api/userApi.js";

function App() {
  const {data: token, isLoading} = useVerifyUserQuery()

  if(isLoading){
      return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path="/register/" element={<RegisterPage/>}/>
        <Route path="/login/" element={<LoginPage/>}/>
        <Route path="/" element={token ? <ProfilePage /> : <LoginPage/>}/>
        <Route path="/Profile/" element={<ProfilePage/>}/>
        <Route path="/studentsList/" element={<StudentsList/>}/>
        <Route path="/schedule/" element={<SchedulePage/>}/>
      </Routes>
    </>
  )
}

export default App
