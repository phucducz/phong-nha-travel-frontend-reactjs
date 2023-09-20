import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8080/api/controllers/",
    headers: {
        'content-type': 'application/json',
    }
});

export const get = async (path, option = {}) => {
    const res = await request.get(path, option);
    return res.data;
}

export const post = async (path, option = {}) => {
    const res = await request.post(path, option);
    return res.data;
}

export const deleteAPI = async (path, option = {}) => {
    const res = await request.delete(path, option);
    return res.data;
}

export const putAPI = async (path, option = {}) => {
    const res = await request.put(path, option);
    return res.data;
}

export default request;