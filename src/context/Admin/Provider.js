import { useState } from "react";
import { useFormik } from "formik";

import Context from "./Context";

function Provider({ children }) {
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