import { Children, useEffect, useState } from "react";
import { Fragment } from "react";

function TourAPI() {
    const toursAPI = 'http://localhost:8000/tours';
    const [tours, setTours] = useState([]);
    useEffect(() => {
        fetch(toursAPI)
            .then(response => response.json())
            .then(tours => setTours(tours))
    }, []);

    return (
        <div className="container-gridtour">
        </div>
    )
}

export default TourAPI