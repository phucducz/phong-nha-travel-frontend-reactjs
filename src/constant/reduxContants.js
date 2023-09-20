import {
    // setDataCart,
    // setCartTotalPrice,
    // removeCartItem,
    // restoreCartItem
} from "~/actions/cart";
// import { setDataCheckout } from "~/actions/checkout";
// import { setDataCoupon } from "~/actions/coupon";
// import { setMessage } from "~/actions/message";
import { setDataCheckout } from "~/reducers/checkout";
import { setDataCoupon } from "~/reducers/coupon";
import { setMessage } from "~/reducers/message";
import { removeCartItem, restoreCartItem, setCartTotalPrice, setDataCart } from "~/reducers/cart";
import { deleteService, getService, postService, putService } from "~/services";

// checkout constants
export const BOOKING_TOUR = 'BOOKING_TOUR';
export const SET_DATA_CHECKOUT = 'SET_DATA_CHECKOUT';

// cart constants
export const GET_LIST_CART_ITEM = 'GET_LIST_CART_ITEM';
export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const SET_DATA_CART = 'SET_DATA_CART';
export const SET_PRICE_CART_ITEM = 'SET_PRICE_CART_ITEM';
export const SET_CART_COUPON = 'SET_CART_COUPON';
export const SET_CART_TOTAL_PRICE = 'SET_CART_TOTAL_PRICE';
export const UPDATE_CART_ITEM_COUPON = 'UPDATE_CART_ITEM_COUPON';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';
export const RESTORE_CART_ITEM = 'RESTORE_CART_ITEM';

// message constants
export const SET_MESSAGE = 'SET_MESSAGE';

// coupon constants
export const SET_DATA_COUPON = 'SET_DATA_COUPON';
export const GET_DATA_COUPON = 'GET_DATA_COUPON';

const doBookingTour = async (dispatch, payload) => {
    const { userId, phoneNumber,
        fullName, emailAddress } = payload;

    let listFullName = fullName !== ''
        && fullName.split(' ');
    const data = {
        userId: userId,
        phoneNumber: phoneNumber,
        fullName: fullName,
        firstName: listFullName[0],
        lastName: listFullName[1],
        emailAddress: emailAddress,
        paymentMethodId: 1
    }

    await postService('checkoutsDetail', { ...data });
    dispatch(setDataCheckout({ ...data }));
}

const doGetExistCart = userId => {
    return getService('checkouts', { userId: userId });
}

const doAddCartItem = payload => {
    postService('cart', { type: 'add', ...payload });
}

const doUpdateCartItemCoupon = async payload => {
    await postService('cart', { type: 'update', ...payload });
}

const fetchListCart = id => {
    return getService('cart', { userId: id });
}

const handleFetchListCart = async (dispatch, payload, listCart = []) => {
    const { userId } = payload;

    const result = listCart.length === 0
        ? await fetchListCart(userId)
        : listCart;

    dispatch(setDataCart(result));

    const existCoupon = result.find(item => item.couponId);
    let couponValue = 0;

    if (existCoupon) {
        const coupon = await getService('coupons', {
            id: +existCoupon.couponId
        });
        couponValue = +coupon.value;

        dispatch(setDataCoupon({
            id: coupon.id,
            couponCode: coupon.code,
            couponValue: parseInt(coupon.value),
            checked: true
        }));
    }

    dispatch(setCartTotalPrice({ couponValue: couponValue }));
}

const doCheckCouponCode = couponCode => {
    const response = postService('coupons', {
        couponCode: couponCode
    });

    return response;
}

const doSetQuantity = data => {
    putService('cart', data);
}

const handleChangeQuantityItem = data => {
    let isEmpty = Object.keys(data.list).length < 0;

    if (!isEmpty) {
        return data.list.map(item => {
            if (+item.id === +data.id) {
                item.quantity = data.quantity;
                item.totalPrice = item.quantity * item.price;

                doSetQuantity({
                    id: item.id,
                    quantity: item.quantity,
                });
            }

            return item;
        });
    }

    return data.list;
}

const handleSetTotalPrice = (data, couponValue) => {
    let discountPrice = (price, valueDiscount) => price - (price * valueDiscount / 100);
    return data
        && data.reduce((total, item) => total + discountPrice(item.totalPrice, couponValue), 0);
}

const handleDiscount = async (dispatch, payload) => {
    const response = await doCheckCouponCode(payload.couponCode);
    let message;

    if (+response.status === 0) {
        message = `Mã giảm giá "${payload.couponCode}" không tồn tại. Vui lòng thử mã khác!`;
        dispatch(setMessage({
            message: message,
            status: 'fail'
        }));
    }
    else {
        const { result } = response;

        doUpdateCartItemCoupon({
            userId: payload.userId,
            couponId: parseInt(result.id)
        });

        message = `Bạn được giảm giá ${result.value}%. Hãy tiến hành thanh toán hóa đơn của bạn!`;

        dispatch(setMessage({
            message: message,
            status: 'success'
        }));

        dispatch(setDataCoupon({
            couponCode: payload.couponCode,
            id: +result.id,
            couponValue: +result.value,
            checked: true
        }));

        dispatch(setCartTotalPrice({ couponValue: +result.value }));
    }
}

const doRemoveCartItem = async (dispatch, payload) => {
    const { data, couponValue } = payload;

    const response = await deleteService('cart', {
        id: data.id
    });

    if (response.status === 0) {
        dispatch(setMessage({
            message: 'xóa không thành công',
            status: 'fail',
            actionMessage: 'Thử lại?'
        }));

        return;
    }

    dispatch(setMessage({
        message: 'đã xóa',
        status: 'success',
        actionMessage: 'Khôi phục?'
    }));

    dispatch(removeCartItem({
        ...data,
        couponValue
    }));
}

const doRestoreCartItem = (dispatch, payload) => {
    const { data, userId, couponValue, itemRemove } = payload;
    let dataAdd = {
        ...data,
        userId: userId
    }

    let listItem = itemRemove.filter(item => item.id !== data.id);
    if (listItem.length === 0) {
        dispatch(setMessage({
            message: '',
            status: ''
        }));
    }

    const getListCart = async (data) => {
        const { dataAdd, userId } = data;

        await postService('cart', { type: 'add', ...dataAdd });
        handleFetchListCart(dispatch, { userId: userId });
    }

    dispatch(restoreCartItem({
        type: 'restore',
        data: data,
        itemCurrent: listItem,
        couponValue: couponValue
    }));

    getListCart({
        dataAdd: dataAdd,
        userId: userId
    });
}

const doConfirmData = (userId) => {
    postService('checkouts', { userId: userId });
}

export {
    doBookingTour,
    doAddCartItem,
    handleFetchListCart,
    handleDiscount,
    handleChangeQuantityItem,
    handleSetTotalPrice,
    doUpdateCartItemCoupon,
    doRemoveCartItem,
    doRestoreCartItem,
    fetchListCart,
    doConfirmData,
    doGetExistCart
}