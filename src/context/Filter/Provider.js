import { useState } from "react";
import Context from "./Context";

function Provider({ children }) {
    const [filterTour, setFilterTour] = useState({
        search: '',
        title: '',
    });

    const handleFilterTour = (field, value) => {
        if (field === 'title')
            setFilterTour({
                ...filterTour,
                [field]: value
            });
        else
            setFilterTour({
                ...filterTour,
                [field]: value
            });
    }

    const values = {
        filterTour,
        setFilterTour,
        handleFilterTour
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export default Provider;