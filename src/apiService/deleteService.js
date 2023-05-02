import * as request from "~/utils/request.js";

export const deleteAPI = async (path, q = {}) => {
    try {
        const res = await request.deleteAPI(path, {
            params: {
                q
            }
        });
        console.log(q);
        return res;
    } catch (error) {
        return error;
    }
}

export const get = async (path, q = {}) => {
    try {
        const res = await request.get(path, {
            params: {
                q
            }
        });
        return res;
    }
    catch (error) {
        console.log(error);
    }
}