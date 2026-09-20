import {useGetAllStudentsQuery} from "../store/api/studentsApi.ts";

export const useMyStudents = () => {
    const {data: {students: myStudents = []} = {}, isLoading: isStudentsLoading, isError, error} = useGetAllStudentsQuery()

    return {myStudents, isStudentsLoading, isError, error}
}