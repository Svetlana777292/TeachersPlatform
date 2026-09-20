import {useGetAllTeachersQuery} from "../store/api/teachersApi.ts";

export const useMyTeachers = () => {
    const {data: {teachers: myTeachers = []} = {}} = useGetAllTeachersQuery()

    return {myTeachers}
}
