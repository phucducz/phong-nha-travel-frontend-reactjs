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

const useMenu = initialState => {
    const [menu, setMenu] = useState(initialState);

    return [menu, setMenu];
}

const useWindowsResize = (handleWindowResize, dependencies = []) => {
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize);
    }, [...dependencies]);
}

const useWindowsMouseDown = (handleWindowResize, dependencies = []) => {
    useEffect(() => {
        window.addEventListener('mousedown', handleWindowResize);

        return () => window.removeEventListener('mousedown', handleWindowResize);
    }, [...dependencies]);
}

export {
    useMessageBox,
    useAdmin,
    useDebounce,
    useFilter,
    useMenu,
    useWindowsResize,
    useWindowsMouseDown
}