import {configureStore} from "@reduxjs/toolkit"
import {userApi} from "./api/userApi.js"
import {studentsApi} from "./api/studentsApi.js";
import {lessonsApi} from "./api/lessonsApi.js";
import {storageApi} from "./api/storageApi.js";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [studentsApi.reducerPath]: studentsApi.reducer,
        [lessonsApi.reducerPath]: lessonsApi.reducer,
        [storageApi.reducerPath]: storageApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(studentsApi.middleware)
            .concat(lessonsApi.middleware)
            .concat(storageApi.middleware)
})
