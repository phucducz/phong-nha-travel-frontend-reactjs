// import { SET_MESSAGE } from "~/constant/reduxContants";

// const initialValues = {
//     message: '',
//     status: '',
//     actionMessage: null,
// }

// const messageReducer = (state = initialValues, action) => {
//     switch (action.type) {
//         case SET_MESSAGE:
//             const { message, status, actionMessage } = action.payload;

//             return {
//                 message: message,
//                 status: status,
//                 actionMessage: actionMessage ? actionMessage : null
//             }

//         default:
//             return state;
//     }
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    status: '',
    actionMessage: null,
}

const messageReducer = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action) => {
            const { message, status, actionMessage } = action.payload;

            state.message = message;
            state.status = status;
            state.actionMessage = actionMessage ? actionMessage : null
        }
    }
});

export const { setMessage } = messageReducer.actions;

export default messageReducer.reducer;