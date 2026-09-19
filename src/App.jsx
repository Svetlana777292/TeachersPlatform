import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import Loading from "./components/Loading/Loading.jsx";
import SchedulePage from "./pages/SchedulePage/SchedulePage.jsx";
import {useVerifyUserQuery} from "./store/api/userApi.js";
import PeoplePage from "./pages/People/PeoplePage/PeoplePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./utils/toastStyles.css"
import FinancePage from "./pages/FinancePage/FinancePage.jsx";
import StudentLessonPage from "./pages/StudentLessonsPage/StudentLessonPage.jsx";

function App() {
  const {isSuccess: isTokenValid, isLoading} = useVerifyUserQuery()

  if(isLoading){
      return <Loading />
  }

  return (
    <>
      <Routes>
        <Route path="/register/" element={<RegisterPage/>}/>
        <Route path="/login/" element={<LoginPage/>}/>
        <Route path="/" element={isTokenValid ? <ProfilePage /> : <LoginPage/>}/>
        <Route path="/profile/" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path="/people/" element={<ProtectedRoute><PeoplePage /></ProtectedRoute>}/>
        <Route path="/schedule/" element={<ProtectedRoute><SchedulePage/></ProtectedRoute>}/>
        <Route path="/finance/" element={<ProtectedRoute><FinancePage/></ProtectedRoute>}/>
        <Route path="/lessons/" element={<ProtectedRoute><StudentLessonPage/></ProtectedRoute>}/>

        <Route path="/payments/*" element={<PaymentRedirect />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer autoClose={3000} position={"top-center"} toastClassName="appToast" className="appToastContainer" hideProgressBar={true}/>
    </>
  )
}

function PaymentRedirect() {
  React.useEffect(() => {
    window.location.href = "/finance/";
  }, []);
  return <Loading />;
}

export default App
