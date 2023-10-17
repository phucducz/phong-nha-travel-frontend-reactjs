// import {
//     SET_DATA_COUPON,
// } from "~/constant/reduxContants";

// const initialState = {
//     id: null,
//     couponCode: '',
//     couponValue: +0,
//     checked: false
// }

// const couponReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SET_DATA_COUPON:
//             return {
//                 ...action.payload
//             }

//         default:
//             return state;
//     }
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    couponCode: '',
    couponValue: 0,
    checked: false
}

const couponReducer = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setDataCoupon: (state, action) => {
            const { id, couponCode, couponValue, checked } = action.payload;

            state.id = id;
            state.couponCode = couponCode
            state.couponValue = couponValue;
            state.checked = checked;
        },
        clearCoupon: (state, action) => {
            state = initialState;
        }
    }
});

export const { setDataCoupon, clearCoupon } = couponReducer.actions;

export default couponReducer.reducer;