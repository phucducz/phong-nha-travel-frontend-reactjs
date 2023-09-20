import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listData: []
}

const tourCategoriesReducer = createSlice({
    name: 'tourCategories',
    initialState,
    reducers: {
        setTourCategories: (state, action) => {
            state.listData = action.payload;
        }
    }
});

export const { setTourCategories } = tourCategoriesReducer.actions;

export default tourCategoriesReducer.reducer;