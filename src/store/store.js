import {configureStore} from "@reduxjs/toolkit"
import {userApi} from "./api/userApi.js"
import {studentsApi} from "./api/studentsApi.js";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [studentsApi.reducerPath]: studentsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(studentsApi.middleware)
})
