import * as request from "~/utils/request.js";

export const post = async (path, option = {}) => {
    try {
        const res = await request.post(path, option);
        return res;
    }
    catch (error) {
        return error; 
    }
}