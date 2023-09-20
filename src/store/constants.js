const SET_TOURS = 'set_tours';

const get_tour = (payload) => {
    return {
        type: SET_TOURS,
        payload
    }
}

export {
    SET_TOURS,
    get_tour
};