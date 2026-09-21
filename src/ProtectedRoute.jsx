import { Navigate } from "react-router-dom";
import { useVerifyUserQuery } from "./store/api/userApi.ts";
import Loading from "./components/Loading/Loading.jsx";

const ProtectedRoute = ({ children }) => {
    const { isSuccess, isLoading } = useVerifyUserQuery();

    if (isLoading) return <Loading />;
    if (!isSuccess) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
