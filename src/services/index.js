import * as httpRequest from "~/utils/httpRequest";

const putService = async (path, q = {}, headers = {}) => {
    try {
        const res = await httpRequest.putAPI(path, q, headers);
        return res;
    }
    catch (error) {
        return error;
    }
}

const getService = async (path, q = {}) => {
    try {
        const res = await httpRequest.get(path, {
            params: { ...q }
        });
        return res;
    }
    catch (error) {
        throw new Error(error);
    }
}

const postService = async (path, option = {}, headers = {}) => {
    try {
        const res = await httpRequest.post(path, option, headers);
        return res;
    }
    catch (error) {
        return error;
    }
}

const deleteService = async (path, q = {}) => {
    try {
        const res = await httpRequest.deleteAPI(path, {
            params: { ...q }
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