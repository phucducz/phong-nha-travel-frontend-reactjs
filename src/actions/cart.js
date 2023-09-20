import {
    SET_DATA_CART,
    SET_PRICE_CART_ITEM,
    SET_CART_TOTAL_PRICE,
    UPDATE_CART_ITEM_COUPON,
    REMOVE_CART_ITEM,
    RESTORE_CART_ITEM,
} from "~/constant/reduxContants"

const updateCartItemCoupon = payload => {
    return {
        type: UPDATE_CART_ITEM_COUPON,
        payload
    }
}

const setDataCart = payload => {
    return {
        type: SET_DATA_CART,
        payload
    }
}

const setCartItem = payload => {
    return {
        type: SET_PRICE_CART_ITEM,
        payload
    }
}

const setCartTotalPrice = payload => {
    return {
        type: SET_CART_TOTAL_PRICE,
        payload
    }
}

const removeCartItem = payload => {
    return {
        type: REMOVE_CART_ITEM,
        payload
    }
}

const restoreCartItem = payload => {
    return {
        type: RESTORE_CART_ITEM,
        payload
    }
}

export {
    setDataCart,
    setCartItem,
    updateCartItemCoupon,
    setCartTotalPrice,
    removeCartItem,
    restoreCartItem
}