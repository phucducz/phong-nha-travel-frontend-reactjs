import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchData: {},
    result: [],
}

const searchReducer = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchData: (state, action) => {
            state.searchData = action.payload;
        },
        setResultData: (state, action) => {
            const { result } = action.payload;
            state.result = result;
        }
    }
});

export const { setSearchData, setResultData } = searchReducer.actions;

export default searchReducer.reducer;