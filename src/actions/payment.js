const getListPayment = payload => {
    return {
        type: 'GET_DATA_PAYMENT',
        payload: payload
    }
}

export {
    getListPayment
}