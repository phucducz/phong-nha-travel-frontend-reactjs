import { SET_TOURS } from './constants';

const initialState = {
    tours: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOURS:
            return {
                ...state,
                tours: action.payload
            }

        default:
            break;
    }
}

export { initialState };
export default reducer;