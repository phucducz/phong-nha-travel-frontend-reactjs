import * as request from "~/utils/request";

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
