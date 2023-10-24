import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList: [],
    userActive: -1
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.userList = action.payload;
        }
    }
});

export const { setData } = userReducer.actions;

export default userReducer.reducer;