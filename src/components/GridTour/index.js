import { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import * as getService from "~/apiService/getService.js";
// import { GridTourStyle as styles } from "~/components/GridTourStyle";
import styles from "../GridTourStyle/GridTourStyle.scss";

const cx = classNames.bind(styles);

function GridTour(children) {
    const [count, setCount] = useState(0);
    const [tours, setTours] = useState([]);
    const [tym, setTym] = useState([]);
    const navigate = useNavigate();

    const lengthTour = tours.length;

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await getService.get('tours');
            setTours(result);
        }
        fetchAPI();
    }, []);

    function setTour(marginLeft) {
        const containerPresented = document.querySelectorAll('.trapi')[children.index];
        const containerGridtour = containerPresented.querySelectorAll('.container-presented .container-gridtour .gridtours__standout');
        const tourFirst = containerGridtour[0];
        tourFirst.setAttribute('style', `
            margin-left: ${marginLeft}%
        `);
    }

    useEffect(() => {
        setTimeout(() => {
            let marginLeft = -((360 + 39) / 2520 * 100 * count);
            setTour(marginLeft);
        }, 100);
    }, [count]);

    return (
        <div
            className={cx('trapi')}
            style={{ width: '116rem', margin: '0 auto', position: 'relative' }}
        >
            {children.children != null ?
                <>
                    {children.children.props.children.map(children => {
                        return children;
                    })}
                    <button className={cx('prevBtn')}
                        onClick={() => setCount(count === 0 ? count : count - 1)}>
                        <i
                            style={{ fontSize: '2rem' }}
                            className={cx("fa-solid fa-chevron-left")}
                        ></i>
                    </button>
                    <div
                        className={cx('container-presented')}>
                        <div
                            style={{ width: '2520px' }}
                            className={cx(tours.length === 0 ? "container-gridtour" : "container-gridtour")}
                        >
                            {tours.map(tour => {
                                return (
                                    tour.topicId == children.topic
                                    && <div
                                        style={{ width: 'calc((116rem / 3) - 2.6rem)' }}
                                        key={tour.id}
                                        className={cx("gridtours__standout")}
                                        onClick={() => navigate(`/cart/tour/${tour.id}`)}
                                    >
                                        <div style={{ width: 'calc((116rem / 3) - 2.6rem)' }}>
                                            <i
                                                className={cx("fa-solid fa-cart-shopping adjust-change")}>
                                            </i>
                                            <i
                                                onClick={() => setTym(prevTym => [...prevTym, {
                                                    id: tour.id,
                                                    action: "tym"
                                                }])}
                                                className={cx("fa-solid fa-heart adjust-change")}>
                                            </i>
                                            <div className={cx("cn-image")}>
                                                <img
                                                    src={tour.image}
                                                    className={cx("gridtours__standout-image")}
                                                    alt="Tour Quảng Bình" />
                                            </div>
                                            <p
                                                className={cx("gridtours__standout-price")}
                                            >{tour.price}</p>
                                            <div
                                                className={cx("crossbar")}
                                            ></div>
                                            <div
                                                className={cx("gridtours__standout-content")}
                                            >
                                                <h3>{tour.name}</h3>
                                                <p
                                                    className={cx("description-tour")}
                                                >{tour.description}</p>
                                            </div>
                                            <div
                                                className={cx('fa')}
                                                style={{ width: '1rem', height: '1rem', margin: '3rem auto 0 auto' }}>
                                                <i
                                                    className={cx("fa-solid fa-arrow-right")}
                                                ></i></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <button
                        className={cx('nextBtn')}
                        onClick={() => setCount(count >= (lengthTour - 3) ? count : count + 1)}>
                        <i
                            style={{ fontSize: '2rem' }}
                            className={cx("fa-solid fa-chevron-right")}
                        ></i>
                    </button>
                </>
                :
                <>
                    <button
                        className={cx('prevBtn')}
                        onClick={() => setCount(count === 0 ? count : count - 1)}
                    >
                        <i
                            style={{ fontSize: '2rem' }}
                            className={cx("fa-solid fa-chevron-left")}
                        ></i>
                    </button>
                    <div className={cx('container-presented')}>
                        <div
                            style={{ width: '2520px' }}
                            className={cx(tours.length === 0 ? "container-gridtour" : "container-gridtour")}
                        >
                            {tours.map(tour => {
                                return (
                                    tour.topicId == children.topic
                                    && <div
                                        style={{ width: 'calc((116rem / 3) - 2.6rem)' }}
                                        key={tour.id}
                                        className={cx("gridtours__standout")}
                                        onClick={() => navigate(`/cart/tour/${tour.id}`)}
                                    >
                                        <div style={{ width: 'calc((116rem / 3) - 2.6rem)' }}>
                                            <i className={cx("fa-solid fa-cart-shopping adjust-change")}></i>
                                            <i
                                                onClick={() => setTym(prevTym => [...prevTym, {
                                                    id: tour.id,
                                                    action: "tym"
                                                }])}
                                                className={cx("fa-solid fa-heart adjust-change")}>
                                            </i>
                                            <div className={cx("cn-image")}>
                                                <img
                                                    src={tour.image}
                                                    className={cx("gridtours__standout-image")}
                                                    alt="Tour Quảng Bình"
                                                />
                                            </div>
                                            <p
                                                className={cx("gridtours__standout-price")}
                                            >{tour.price}</p>
                                            <div
                                                className={cx("crossbar")}
                                            ></div>
                                            <div
                                                className={cx("gridtours__standout-content")}
                                            >
                                                <h3>{tour.name}</h3>
                                                <p
                                                    className={cx("description-tour")}
                                                >{tour.description}</p>
                                            </div>
                                            <div
                                                className={cx('fa')}
                                                style={{ width: '1rem', height: '1rem', margin: '3rem auto 0 auto' }}
                                            >
                                                <i
                                                    className={cx("fa-solid fa-arrow-right")}
                                                >
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                    <button
                        className={cx('nextBtn')}
                        onClick={() => setCount(count >= (lengthTour - 3) ? count : count + 1)}
                    >
                        <i
                            style={{ fontSize: '2rem' }}
                            className={cx("fa-solid fa-chevron-right")}
                        >
                        </i>
                    </button>
                </>
            }
        </div >
    )
}

export default memo(GridTour);