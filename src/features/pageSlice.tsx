import {createSlice} from '@reduxjs/toolkit'
import GameCatalog from "../components/GameCatalog";
import GamePage from "../components/GamePage";
import {ReactElement} from "react";

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: <GameCatalog/> as ReactElement,
    },
    reducers: {
        loadCatalog: (state) => {
            state.value = <GameCatalog/> as ReactElement
        },
        loadGamePage: (state, action) => {
            state.value = <GamePage {...action.payload.toString()}/> as ReactElement
        },
    },
})

export const {loadCatalog, loadGamePage} = pageSlice.actions

export default pageSlice.reducer