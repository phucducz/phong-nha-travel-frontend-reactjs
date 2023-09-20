import { useReducer, useState } from "react";
import { useFormik } from "formik";

import Context from "./Context";
import { tourReducer, initialState } from "~/store";


function Provider({ children }) {
    const [state, dispatch] = useReducer(tourReducer, initialState);

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            description: '',
            image: '',
            price: +0,
            title: '',
            topics: [],
            categories: []
        },
    });

    const [search, setSearch] = useState('');

    const [tours, setTours] = useState();
    const [tour, setTour] = useState({});
    const [topics, setTopics] = useState([]);
    const [topic, setTopic] = useState();
    const [categories, setCategories] = useState();
    const [category, setCategory] = useState([]);

    const values = {
        state,
        dispatch,
        formik,
        search,
        setSearch,
        tours,
        setTours,
        tour,
        setTour,
        topics,
        setTopics,
        topic,
        setTopic,
        categories,
        setCategories,
        category, 
        setCategory
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export default Provider;