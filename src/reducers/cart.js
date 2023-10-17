// import {
//     SET_DATA_CART,
//     SET_PRICE_CART_ITEM,
//     SET_CART_TOTAL_PRICE,
//     handleSetTotalPrice,
//     handleChangeQuantityItem,
//     REMOVE_CART_ITEM,
//     RESTORE_CART_ITEM,
// } from "~/constant/reduxContants";

// const initialValues = {
//     dataCart: [],
//     totalPrice: 0,
//     activeCoupon: false,
//     cartItemsDeleted: []
// }

// const cartReducer = (state = initialValues, action) => {
//     switch (action.type) {
//         case SET_DATA_CART:
//             return {
//                 ...state,
//                 dataCart: action.payload,
//                 totalPrice: handleSetTotalPrice(state.dataCart, action.payload.couponValue)
//             }

//         case SET_PRICE_CART_ITEM:
//             let newList = handleChangeQuantityItem({
//                 list: state.dataCart,
//                 quantity: action.payload.quantity,
//                 id: action.payload.id,
//             });

//             return {
//                 ...state,
//                 dataCart: newList,
//                 totalPrice: handleSetTotalPrice(state.dataCart, action.payload.couponValue)
//             }

//         case SET_CART_TOTAL_PRICE:
//             const { couponValue } = action.payload;

//             return {
//                 ...state,
//                 totalPrice: handleSetTotalPrice(state.dataCart, couponValue),
//                 activeCoupon: couponValue !== 0 ? true : false
//             }

//         case REMOVE_CART_ITEM:
//             let newData = state.dataCart;
//             let itemsDeleted = newData.find(item => item.id === action.payload.id);
//             let dataCurrent = newData.filter(item => item.id !== action.payload.id);
//             let dataDeleted = [...state.cartItemsDeleted, itemsDeleted];

//             return {
//                 ...state,
//                 dataCart: dataCurrent,
//                 cartItemsDeleted: dataDeleted,
//                 totalPrice: handleSetTotalPrice(dataCurrent, action.payload.couponValue)
//             }

//         case RESTORE_CART_ITEM:
//             const { dataCart } = state;
//             let newDataStore = dataCart;
//             let newCartItemDeleted = action.payload.itemCurrent;

//             if (action.payload.type === 'reset')
//                 newCartItemDeleted = [];
//             else {
//                 newDataStore.push(action.payload.data);
//             }

//             return {
//                 ...state,
//                 dataCart: newDataStore,
//                 cartItemsDeleted: newCartItemDeleted,
//                 totalPrice: handleSetTotalPrice(newDataStore, action.payload.couponValue)
//             }

//         default:
//             return state;
//     }
// }

import { createSlice } from "@reduxjs/toolkit";
import {
    handleSetTotalPrice,
    handleChangeQuantityItem,
} from "~/constant/reduxContants";

const initialState = {
    dataCart: [],
    totalPrice: 0,
    activeCoupon: false,
    cartItemsPaid: [],
    cartItemsCurrent: [],
    cartItemsDeleted: []
}

const cartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setDataCart: (state, action) => {
            const { cart, coupon } = action.payload;
            state.dataCart = cart;
            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, coupon.value);
        },
        setCartItemsCurrent: (state, action) => {
            const { payload } = action;

            state.cartItemsCurrent = payload.cartCurrent;
            state.totalPrice = handleSetTotalPrice(payload.cartCurrent, payload.coupon.couponValue);
        },
        setCartItemsPaid: (state, action) => {
            const { payload } = action;

            state.cartItemsCurrent = payload.cartCurrent;
            state.totalPrice = handleSetTotalPrice(payload.cartCurrent, payload.coupon.value);
            state.cartItemsPaid = payload.cartPaid;
        },
        setPriceCartItem: (state, action) => {
            let newList = handleChangeQuantityItem({
                list: state.dataCart,
                quantity: action.payload.quantity,
                id: action.payload.id,
            });

            state.dataCart = newList;
            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, action.payload.couponValue)
        },
        setCartTotalPrice: (state, action) => {
            const { couponValue } = action.payload;

            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, couponValue);
            state.activeCoupon = couponValue !== 0 ? true : false
        },
        removeCartItem: (state, action) => {
            const { dataCart, cartItemsCurrent } = state;
            const { payload } = action;

            let itemsDeleted = dataCart.find(item => item.id === payload.id);
            let dataDeleted = [...state.cartItemsDeleted, itemsDeleted];

            state.dataCart = dataCart.filter(item => item.id !== payload.id);
            state.cartItemsDeleted = dataDeleted;
            state.totalPrice = handleSetTotalPrice(cartItemsCurrent, payload.couponValue)
        },
        restoreCartItem: (state, action) => {
            const { dataCart } = state;
            let newDataStore = dataCart;
            let newCartItemDeleted = action.payload.itemCurrent;

            if (action.payload.type === 'reset')
                newCartItemDeleted = [];
            else
                newDataStore.push(action.payload.data);

            state.dataCart = dataCart;
            state.cartItemsDeleted = newCartItemDeleted;
            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, action.payload.couponValue)
        }
    }
});

export const {
    setDataCart,
    setPriceCartItem,
    setCartTotalPrice,
    removeCartItem,
    restoreCartItem,
    setCartItemsPaid,
    setCartItemsCurrent
} = cartReducer.actions;

export default cartReducer.reducer;