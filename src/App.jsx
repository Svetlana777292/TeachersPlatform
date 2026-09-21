import React from "react";
import {lazy, Suspense} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
const RegisterPage = lazy(() => import("./pages/Auth/RegisterPage/RegisterPage.jsx"));
const LoginPage = lazy(() => import("./pages/Auth/LoginPage.jsx"));
import Loading from "./components/Loading/Loading.jsx";
const ProfilePage = lazy(() => import("./pages/Profile/ProfilePage.jsx"));
const SchedulePage = lazy(() => import("./pages/SchedulePage/SchedulePage.jsx"));
import {useVerifyUserQuery} from "./store/api/userApi.ts";
const PeoplePage = lazy(() => import ("./pages/People/PeoplePage/PeoplePage.jsx"))
import ProtectedRoute from "./ProtectedRoute.jsx";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./utils/toastStyles.css"
const FinancePage = lazy(() => import("./pages/FinancePage/FinancePage.jsx"));
const StudentLessonPage = lazy(() => import ("./pages/StudentLessonsPage/StudentLessonPage.jsx"))

function App() {
  const {isSuccess: isTokenValid, isLoading} = useVerifyUserQuery()

  if(isLoading){
      return <Loading />
  }

  return (
    <>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
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
