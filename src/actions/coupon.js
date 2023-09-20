import {
    SET_DATA_COUPON, 
} from "~/constant/reduxContants"

const setDataCoupon = payload => {
    return {
        type: SET_DATA_COUPON,
        payload: payload
    }
}

export {
    setDataCoupon,
}