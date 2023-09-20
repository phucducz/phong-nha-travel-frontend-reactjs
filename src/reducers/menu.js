import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: 0
}

const menuReducer = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuActive: (state, action) => {
            state.active = action.payload.id;
        }
    }
});

export const { setMenuActive } = menuReducer.actions;

export default menuReducer.reducer;