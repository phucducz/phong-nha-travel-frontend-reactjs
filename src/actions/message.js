import {
    SET_MESSAGE
} from "~/constant/reduxContants";

const setMessage = payload => {
    return {
        type: SET_MESSAGE,
        payload
    }
}

export {
    setMessage,
}