import axios from "axios";

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: { 'content-type': 'application/json' }
});

export const get = async (path, option = {}, header) => {
    const res = await httpRequest.get(path, option, header);
    return res.data;
}

export const post = async (path, option = {}, header = {}) => {
    const res = await httpRequest.post(path, option, header);
    return res.data;
}

export const deleteAPI = async (path, option = {}) => {
    const res = await httpRequest.delete(path, option);
    return res.data;
}

export const putAPI = async (path, option = {}, header = {}) => {
    const res = await httpRequest.put(path, option, header);
    return res.data;
}

// httpRequest.interceptors.request.use(config => {
//     const token = localStorage.getItem('token');
//     config.headers.Authorization = `Bearer ${token}`;

//     return config;
// });

export default httpRequest;