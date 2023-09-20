import { INSERT_TOUR, UPDATE_TOUR, DELETE_TOUR, GET_MESSAGE } from "./constant"

export const insertTour = payload => {
    return {
        type: INSERT_TOUR,
        payload
    }
}

export const updateTour = payload => {
    return {
        type: UPDATE_TOUR,
        payload
    }
}

export const getMessage = payload => {
    return {
        type: GET_MESSAGE,
        payload
    }
}

export const removeTour = payload => {
    return {
        type: DELETE_TOUR,
        payload
    }
}