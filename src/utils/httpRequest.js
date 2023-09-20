import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'content-type': 'application/json',
    }
});

export const get = async (path, option = {}) => {
    const res = await httpRequest.get(path, option);
    return res.data;
}

export const post = async (path, option = {}) => {
    const res = await httpRequest.post(path, option);
    return res.data;
}

export const deleteAPI = async (path, option = {}) => {
    const res = await httpRequest.delete(path, option);
    return res.data;
}

export const putAPI = async (path, option = {}) => {
    const res = await httpRequest.put(path, option);
    return res.data;
}

export default httpRequest;