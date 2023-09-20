import { putService } from "~/services"

export const putTour = (data) => {
    const put = async () => {
        return await putService('tours', data);
    }
} 