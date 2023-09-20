// import {
//     BOOKING_TOUR,
//     SET_DATA_CHECKOUT
// } from "~/constant/reduxContants";

// const initialState = {
//     dataCheckout: {},
//     active: null
// }

// const checkoutReducer = (state = inititalState, action) => {
//     switch (action.type) {
//         case SET_DATA_CHECKOUT:
//             return {
//                 ...state,
//                 dataCheckout: action.payload
//             }

//         case BOOKING_TOUR:

//             return {
//                 ...state
//             }

//         default:
//             return state;
//     }
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataCheckout: {},
    active: null
}

const checkoutReducer = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setDataCheckout: (state, action) => {
            state.dataCheckout = action.payload;
        }
    }
});

export const { setDataCheckout } = checkoutReducer.actions;

export default checkoutReducer.reducer;