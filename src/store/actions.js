import { getService } from "~/services";
import { get_tour } from "./constants";

const fetch_tour_by_name = (payload) => {
    return async dispatch => {
        try {
            const result = await getService('tours', payload);
            if (result.status === 1)
                dispatch(get_tour(result));
        }
        catch {
        }
    }
}

export {
    fetch_tour_by_name
}