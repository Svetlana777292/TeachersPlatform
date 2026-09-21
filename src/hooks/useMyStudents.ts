import {useGetAllStudentsQuery} from "../store/api/studentsApi.ts";
import {Student} from "../types.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

interface UseMyStudentsReturn {
    myStudents: Student[],
    isStudentsLoading: boolean,
    isError: boolean,
    error?: FetchBaseQueryError | SerializedError
}

export const useMyStudents = (): UseMyStudentsReturn => {
    const {data: {students: myStudents = []} = {}, isLoading: isStudentsLoading, isError, error} = useGetAllStudentsQuery()

    return {myStudents, isStudentsLoading, isError, error}
}