import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
}

const loadingReducer = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { setLoading } = loadingReducer.actions;

export default loadingReducer.reducer;