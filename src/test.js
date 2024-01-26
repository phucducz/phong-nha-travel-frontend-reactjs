import {
    SET_DATA_CART,
    handleSetTotalPrice
} from "~/constant/reduxContants";

const initialValues = {
    dataCart: [],
    totalPrice: 0,
    activeCoupon: false,
    cartItemsDeleted: []
}

const cartReducer = (state = initialValues, action) => {
    switch (action.type) {
        case SET_DATA_CART:
            return {
                ...state,
                dataCart: action.payload,
                totalPrice: handleSetTotalPrice(state.dataCart, action.payload.couponValue)
            }

        default:
            return state;
    }
}

export default cartReducer;