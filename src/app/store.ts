import { configureStore } from '@reduxjs/toolkit'
import urlReducer from '../features/urlSlice'


const store = configureStore({
    reducer: {
        url: urlReducer
    },
})
export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
