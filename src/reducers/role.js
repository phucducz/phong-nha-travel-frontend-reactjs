import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roles: []
}

const roleReducer = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.roles = action.payload;
        }
    }
});

export const { setData } = roleReducer.actions;

export default roleReducer.reducer;