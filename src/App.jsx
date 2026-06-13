import {Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import Loading from "./components/Loading/Loading.jsx";
import SchedulePage from "./pages/SchedulePage/SchedulePage.jsx";
import {useVerifyUserQuery} from "./store/api/userApi.js";
import PeoplePage from "./pages/People/PeoplePage/PeoplePage.jsx";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./utils/toastStyles.css"

function App() {
  const {data: token, isLoading} = useVerifyUserQuery()

  if(isLoading){
      return <Loading />
  }

  const position = window.matchMedia("(max-width: 768px)").matches
        ? "top-center"
        : "bottom-right";

  return (
    <>
      <Routes>
        <Route path="/register/" element={<RegisterPage/>}/>
        <Route path="/login/" element={<LoginPage/>}/>
        <Route path="/" element={token ? <ProfilePage /> : <LoginPage/>}/>
        <Route path="/Profile/" element={<ProfilePage/>}/>
        <Route path="/people/" element={<PeoplePage />}/>
        <Route path="/schedule/" element={<SchedulePage/>}/>
      </Routes>
      <ToastContainer autoClose={false} position={position} toastClassName="appToast" className="appToastContainer" hideProgressBar={true}/>
    </>
  )
}

export default App
