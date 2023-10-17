import { setDataCheckout } from "~/reducers/checkout";
import { setDataCoupon } from "~/reducers/coupon";
import { setMessage } from "~/reducers/message";
import cart, { removeCartItem, restoreCartItem, setCartItemsPaid, setCartTotalPrice, setDataCart } from "~/reducers/cart";
import { deleteService, getService, postService, putService } from "~/services";
import { setDataCheckoutDetail } from "~/reducers/checkoutDetail";

const doCreateCheckoutDetail = async (dispatch, payload) => {
    await postService('checkoutDetails', { ...payload });
    dispatch(setDataCheckout({ ...payload }));
}

const doGetExistCart = userId => {
    return getService('checkouts', { userId: userId });
}

const doCreateCartItem = async payload => {
    await postService('cart', { ...payload });
}

const doApplyCoupon = async payload => {
    await postService('checkouts', payload);
}

const fetchListCart = id => {
    return getService('cart', { userId: id });
}

const fetchUserDataById = async userId => {
    const result = await getService('users', { id: userId });

    return result[0];
}

const handleFetchUserDataById = async (dispatch, payload, listCart = []) => {
    const { userId } = payload;

    let result = {};

    if (listCart.length === 0) {
        const response = await fetchUserDataById(userId);

        result = response.listCart;
        await dispatch(setDataCheckoutDetail(response.checkoutDetail));
    }
    else
        result = listCart;

    let dataCart = result.map(item => {
        let { id, bookingDate, quantity, tour } = item;

        return {
            ...tour,
            id: id,
            tourId: tour.id,
            bookingDate: bookingDate,
            quantity: quantity,
            totalPrice: quantity * tour.priceAdult,
            checkout: item.checkout
        }
    });

    let cartItem = result.find(item => {
        let checkout = item.checkout;

        return !checkout || checkout.status === 'unpaid' || checkout.date === null;
    });

    let coupon = {
        id: null,
        code: null,
        value: 0,
        checked: false
    };

    let checkout = null;

    if (cartItem)
        checkout = cartItem.checkout;

    if (checkout && checkout.coupon)
        coupon = {
            ...coupon,
            ...checkout.coupon,
            checked: true
        };

    dispatch(setDataCart({ cart: dataCart, coupon: coupon }));
    dispatch(setCartItemsPaid({
        cartCurrent: dataCart.filter(item => !item.checkout || item.checkout.status === 'unpaid' || item.checkout.date === null),
        cartPaid: dataCart.filter(item => item.checkout && item.checkout.date && item.checkout.status === 'paid'),
        coupon: coupon
    }));

    if (coupon) {
        dispatch(setDataCoupon({
            id: coupon.id,
            couponCode: coupon.code,
            couponValue: coupon.value,
            checked: coupon.checked
        }));
    }

    dispatch(setCartTotalPrice({ couponValue: coupon.value }));
}

const doGetCouponByCode = async couponCode => {
    const response = await getService('coupons', { code: couponCode });

    return response;
}

const doSetQuantity = data => {
    putService('cart', data);
}

const handleBookClick = (dispatch, cartData, checkoutDetailData) => {
    doCreateCartItem(cartData);
    doCreateCheckoutDetail(dispatch, checkoutDetailData);
}

const handleChangeQuantityItem = data => {
    let isEmpty = Object.keys(data.list).length < 0;

    if (!isEmpty) {
        return data.list.map(item => {
            if (+item.id === +data.id) {
                item.quantity = data.quantity;
                item.totalPrice = item.quantity * item.priceAdult;

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

const handleSetTotalPrice = (data, value) => {
    let discountPrice = (price, valueDiscount) => price - (price * valueDiscount / 100);

    return data
        && data.reduce((total, item) => total + discountPrice(item.totalPrice, value), 0);
}

const handleDiscount = async (dispatch, payload) => {
    const result = await doGetCouponByCode(payload.couponCode);
    let message;

    if (!result.id) {
        message = `Mã giảm giá "${payload.couponCode}" không tồn tại. Vui lòng thử mã khác!`;
        dispatch(setMessage({
            message: message,
            status: 'fail'
        }));
    }
    else {
        doApplyCoupon({
            userId: payload.userId,
            couponId: result.id,
            type: 'apply coupon'
        });

        message = `Bạn được giảm giá ${result.value}%. Hãy tiến hành thanh toán hóa đơn của bạn!`;

        dispatch(setMessage({
            message: message,
            status: 'success'
        }));

        dispatch(setDataCoupon({
            id: result.id,
            couponCode: payload.couponCode,
            couponValue: result.value,
            checked: true
        }));

        dispatch(setCartTotalPrice({ couponValue: result.value }));
    }
}

const doRemoveCartItem = async (dispatch, payload) => {
    const { data, couponValue } = payload;

    const response = await deleteService('cart', { id: data.id });

    if (response.status === 500) {
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
    const { data, userId, couponValue, itemRemoved } = payload;
    let dataRestore = {
        id: data.id,
        quantity: data.quantity,
        tourId: data.tourId,
        bookingDate: data.bookingDate,
        userId: userId
    }

    let listItem = itemRemoved.filter(item => item.id !== data.id);

    if (listItem.length === 0) {
        dispatch(setMessage({
            message: '',
            status: ''
        }));
    }

    const handleRestore = async data => {
        const { dataRestore, userId } = data;

        await postService('cart', { ...dataRestore });
        handleFetchUserDataById(dispatch, { userId: userId });
    }

    dispatch(restoreCartItem({
        type: 'restore',
        data: data,
        itemCurrent: listItem,
        couponValue: couponValue
    }));

    handleRestore({
        dataRestore: dataRestore,
        userId: userId
    });
}

const doConfirmData = async (data, cartCurrentData) => {
    const { companyName, country, zipcode, city, note, firstName, lastName, fullName, address,
        apartment, phoneNumber, emailAddress, userId, paymentMethodId, couponId, checkoutDetailId } = data;

    const postData = {
        companyName, country, zipcode, city, note, firstName, lastName, fullName, address,
        apartment, phoneNumber, emailAddress, userId, paymentMethodId, couponId, checkoutDetailId
    }

    let cartCurrent;

    cartCurrent = cartCurrentData.find(item => {
        let checkout = item.checkout;

        return checkout && (checkout.status === 'unpaid' || checkout.date === null);
    });

    if (cartCurrent)
        postData.checkoutsId = cartCurrent.checkout.id;

    await postService('checkouts', { ...postData, type: 'pay' });
}

export {
    doCreateCheckoutDetail,
    doCreateCartItem,
    handleBookClick,
    handleFetchUserDataById,
    handleDiscount,
    handleChangeQuantityItem,
    handleSetTotalPrice,
    doRemoveCartItem,
    doRestoreCartItem,
    fetchListCart,
    doConfirmData,
    doGetExistCart
}