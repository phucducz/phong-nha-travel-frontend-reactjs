import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { getService } from "~/services";
import Pagination from "~/components/Pagination";
import CartStyle from "~/components/CartStyles";

function Cart() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [price, setPrice] = useState('');
    const [tours, setTours] = useState([]);
    const [topics, setTopics] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const toursPerPage = 3;
    const search = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await getService('tours');
            setTours(result);
        }

        const fetchCategories = async () => {
            const result = await getService('topics');
            setTopics(result);
        }

        const fetch = () => {
            fetchAPI();
            fetchCategories();
        }

        fetch();
    }, []);

    const indexOfLastTours = currentPage * toursPerPage;
    const indexOfFirstTours = indexOfLastTours - toursPerPage;
    const currentTours = tours.slice(indexOfFirstTours, indexOfLastTours);

    const handleOnclick = number => setCurrentPage(number);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fetchTour = async () => {
            const result = await getService.get('tours', {
                name: name
            });
            setTours(result);
        }

        fetchTour();
    }

    return (
        <CartStyle>
            <div style={{ marginTop: '15.5rem' }}>
                <div className="container-tour">
                    <div className="w">
                        {currentTours.map(tour => (
                            <div key={tour.id} className="tour-travel">
                                <div className="containerImg">
                                    <img className="imageTour"
                                        src={tour.image}
                                        alt={tour.name}
                                    >
                                    </img>
                                </div>
                                <div className="infoTour">
                                    <div className="content">
                                        <h3>{tour.name}</h3>
                                        <p>{tour.description}</p>
                                    </div>
                                </div>
                                <div className="price">
                                    <h3>{tour.price}</h3>
                                    <h3>per person</h3>
                                    <button
                                        onClick={() => {
                                            navigate(`/cart/tour/${tour.id}`)
                                        }}
                                    >
                                        VIEW MORE
                                    </button>
                                </div>
                            </div>
                        ))}
                        <Pagination
                            toursPerPage={toursPerPage}
                            totalTours={tours.length != 0 ? tours.length : 0}
                            handleOnclick={handleOnclick}
                        />
                    </div>
                    <form
                        className="search"
                        style={{ height: '29.6rem' }}
                        onSubmit={e => handleSubmit(e)}
                    >
                        <h3>Tìm kiếm Tour</h3>
                        <p>Tìm kiếm Tour du lịch ưng ý ngay hôm nay!</p>
                        <input
                            ref={search}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name="name" placeholder="Name" type="text" />
                        {/* <div className="date">
                            <input
                                onChange={(e) => setStart(e.target.value)}
                                value={start}
                                className="start" name="dateStart" type="date" />
                            <input
                                onChange={(e) => setEnd(e.target.value)}
                                value={end}
                                className="end" name="dateEnd" type="date" />
                        </div>
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            name="search" placeholder="Name" type="text" /> */}
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="category" name="category">
                            {topics.map(topic => (
                                <option>{topic.title}</option>
                            ))}
                        </select>
                        <input className="find" name="find" value="FIND TOURS" type="submit" />
                    </form>
                </div>
            </div>
        </CartStyle>
    )
}

export default Cart;