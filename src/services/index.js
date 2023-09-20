import * as request from "~/utils/request";

const putService = async (path, q = {}) => {
    try {
        const res = await request.putAPI(path, q);
        return res;
    }
    catch (error) {
        return error;
    }
}

const getService = async (path, q = {}) => {
    try {
        const res = await request.get(path, {
            params: {
                q
            }
        });
        return res;
    }
    catch (error) {
        throw new Error(error);
    }
}

const postService = async (path, option = {}) => {
    try {
        const res = await request.post(path, option);
        return res;
    }
    catch (error) {
        return error;
    }
}

const deleteService = async (path, q = {}) => {
    try {
        const res = await request.deleteAPI(path, {
            params: {
                q
            }
        });
        return res;
    } catch (error) {
        return error;
    }
}

export {
    getService,
    postService,
    putService,
    deleteService
}