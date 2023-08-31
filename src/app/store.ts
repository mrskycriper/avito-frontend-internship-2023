import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import urlReducer from '../features/urlSlice'
import pageReducer from '../features/pageSlice'

const rootReducer = combineReducers({
    url: urlReducer,
    page: pageReducer,
})

const store = configureStore({
    reducer: rootReducer
})
export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
