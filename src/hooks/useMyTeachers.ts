import {useGetAllTeachersQuery} from "../store/api/teachersApi.ts";
import {Teacher} from "../types.ts";

interface UseMyTeachersReturn {
    myTeachers: Teacher[];
}

export const useMyTeachers = (): UseMyTeachersReturn => {
    const {data: {teachers: myTeachers = []} = {}} = useGetAllTeachersQuery()

    return {myTeachers}
}
