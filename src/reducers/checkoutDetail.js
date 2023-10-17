import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    information: {}
}

const checkoutDetailReducer = createSlice({
    name: 'checkoutDetailReducer',
    initialState,
    reducers: {
        setDataCheckoutDetail: (state, action) => {
            state.information = action.payload
        }
    }
});

export const { setDataCheckoutDetail } = checkoutDetailReducer.actions;

export default checkoutDetailReducer.reducer;