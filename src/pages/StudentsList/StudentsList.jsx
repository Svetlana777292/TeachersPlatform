import Header from "../../components/Header/Header.jsx";
import useUser from "../../hooks/useUser.js";
import Loading from "../../components/Loading/Loading.jsx";

const StudentsList = () => {
    const {user, isLoading} = useUser()

    if (!user) return null

    if(isLoading) return <Loading />

    return(
        <>
        <Header user={user}/>

        </>
    )
}

export default StudentsList