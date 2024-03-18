import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listPayment: []
}

const paymentReducer = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setDataPayment: (state, action) => {
            state.listPayment = action.payload;
        }
    }
});

export const { setDataPayment } = paymentReducer.actions;

export default paymentReducer.reducer;