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
            state.dataCart = action.payload;
            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, action.payload.couponValue);
        },
        setCartItemsCurrent: (state, action) => {
            const { dataCart, cartItemsPaid } = state;

            let itemArray = dataCart.map(item => {
                let itemCurrent = cartItemsPaid.find(itemPaid => itemPaid.id === item.id);

                if (!itemCurrent)
                    return item;
                return null;
            });
            let itemsCurrent = itemArray.filter(item => item !== null);
            
            state.cartItemsCurrent = itemsCurrent;
            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, action.payload.couponValue);
        },
        setCartItemsPaid: (state, action) => {
            const { dataCart } = state;
            const { payload } = action;

            let itemArray = dataCart.map(item => {
                let itemCurrent = payload.find(itemPaid => itemPaid.id === item.id);

                if (!itemCurrent)
                    return item;
                return null;
            });
            let itemsCurrent = itemArray.filter(item => item !== null);

            state.cartItemsCurrent = itemsCurrent;
            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, action.payload.couponValue);
            state.cartItemsPaid = payload;
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
            let newData = state.dataCart;
            let itemsDeleted = newData.find(item => item.id === action.payload.id);
            let dataCurrent = newData.filter(item => item.id !== action.payload.id);
            let dataDeleted = [...state.cartItemsDeleted, itemsDeleted];

            state.dataCart = dataCurrent;
            state.cartItemsDeleted = dataDeleted;
            state.totalPrice = handleSetTotalPrice(state.cartItemsCurrent, action.payload.couponValue)
        },
        restoreCartItem: (state, action) => {
            const { dataCart } = state;
            let newDataStore = dataCart;
            let newCartItemDeleted = action.payload.itemCurrent;

            if (action.payload.type === 'reset')
                newCartItemDeleted = [];
            else {
                newDataStore.push(action.payload.data);
            }

            state.dataCart = newDataStore;
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