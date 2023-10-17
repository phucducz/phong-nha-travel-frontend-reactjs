// const initialState = {
//     listPayment: []
// }

// const paymentReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'GET_DATA_PAYMENT':
//             return {
//                 ...state,
//                 listPayment: action.payload
//             }

//         default:
//             return state;
//     }
// }

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