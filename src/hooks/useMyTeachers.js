import {useGetAllTeachersQuery} from "../store/api/teachersApi.js";
import {useMemo} from "react";

export const useMyTeachers = () => {
    const {data: {teachers: myTeachers = []} = {}} = useGetAllTeachersQuery()
    const teachersCount = useMemo(() => myTeachers?.length, [myTeachers])

    return {myTeachers, teachersCount}
}
