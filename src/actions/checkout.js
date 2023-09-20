import {
    SET_DATA_CHECKOUT,
    BOOKING_TOUR
} from "~/constant/reduxContants"

const setDataCheckout = payload => {
    return {
        type: SET_DATA_CHECKOUT,
        payload: payload
    }
}

const bookingTour = (dispatch, payload) => {
    return {
        type: BOOKING_TOUR,
        dispatch: dispatch,
        payload
    }
}

export {
    setDataCheckout,
    bookingTour
}