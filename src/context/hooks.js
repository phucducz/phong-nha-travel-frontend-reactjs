import { useContext, useState, useEffect } from "react";

import { MessageContext } from "./Message";
import { AdminContext } from "./Admin";
import { FilterContext } from "./Filter";

const useMessageBox = () => {
    return useContext(MessageContext);
}

const useAdmin = () => {
    return useContext(AdminContext);
}

const useDebounce = (value, delay) => {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounce(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value]);

    return debounce;
}

const useFilter = () => {
    return useContext(FilterContext);
}

export {
    useMessageBox,
    useAdmin,
    useDebounce,
    useFilter
}