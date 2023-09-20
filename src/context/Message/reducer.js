import {
    GET_MESSAGE
} from "./constant";

const initState = {
    message: ['null']
};

function reducer(state = initState, action) {
    switch (action.type) {
        case GET_MESSAGE:
            let newMessage = action.payload;

            return state.message = newMessage;

        default:
            throw new Error(`Unknown action type: ${action.type}!`);
    }
}

export { initState };
export default reducer;