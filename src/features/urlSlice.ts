import {createSlice} from '@reduxjs/toolkit'
import iFilterState from "./iFilterState";

export const urlSlice = createSlice({
    name: 'url',
    initialState: {
        value: {sort: "5", platform: "3", tags: ""} as iFilterState,
    },
    reducers: {
        setSort: (state, action) => {
            state.value.sort = action.payload.toString()
        },
        setPlatform: (state, action) => {
            state.value.platform = action.payload.toString()
        },
        setTags: (state, action) => {
            state.value.tags = action.payload.toString()
        },
    },
})

export const {setSort, setPlatform, setTags} = urlSlice.actions

export default urlSlice.reducer