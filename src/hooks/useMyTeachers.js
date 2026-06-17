import {useGetAllTeachersQuery} from "../store/api/teachersApi.js";

export const useMyTeachers = () => {
    const {data: {teachers: myTeachers = []} = {}} = useGetAllTeachersQuery()

    return {myTeachers}
}
