import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { useState, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import style from './GridTourStyle.module.scss';
import Item from "../Item";
import Button from "~/components/Button";

const cx = classNames.bind(style);

function GridTour({
    data,
    dataItem,
    categories,
    slider = true,
    flex = false,
    round = false,
    className,
    ...passProps
}) {
    const [tours, setTours] = useState([]);
    const [gridTourItems, setGridTourItems] = useState(dataItem);
    const [action, setAction] = useState({
        count: 0,
        index: 0,
    });

    const classes = cx('tour-item', {
        [className]: className,
        slider,
        flex
    });

    const rounded = round;

    useEffect(() => {
        setTours(() => []);
    }, []);

    useEffect(() => {
        let arrayItem = [];
        let existItem = false;

        dataItem.topic
            ? data.map(tour => {
                if (+tour.topicId === +dataItem.topic) {
                    existItem = arrayItem.find(item => item.id === tour.id);
                    !existItem && arrayItem.push(tour);
                }
                return 0;
            })
            : setTours(data);

        let newArray = [];

        flex ? newArray = arrayItem.slice(0, 6) : newArray = arrayItem;

        setTours(newArray);
    }, [data]);

    useEffect(() => {
        const { count } = action;
        let widthItem = 39;

        setGridTourItems(prev => ({
            ...prev,
            marginLeft: -widthItem * count
        }));
    }, [action]);

    const handlePrevious = () => {
        setAction(() => {
            if (action.count === 0)
                return {
                    count: 0,
                    index: dataItem.id
                }
            else
                return {
                    count: action.count - 1,
                    index: dataItem.id
                }
        });
    }

    const handleNext = () => {
        let itemCurrent = 3;

        setAction(() => {
            if (tours.length <= itemCurrent)
                return {
                    count: 0,
                    index: dataItem.id
                }
            else if (action.count === tours.length - itemCurrent)
                return {
                    count: tours.length - itemCurrent,
                    index: dataItem.id,
                }
            else
                return {
                    count: action.count + 1,
                    index: dataItem.id,
                }
        });
    }

    return (
        <>
            {tours.length > 0
                && <div className={classes} {...passProps}>
                    {dataItem.title && dataItem.title}
                    {slider
                        && <Button
                            tiny
                            className={cx('tour-item__prevButton')}
                            leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
                            onClick={() => handlePrevious()}
                        />
                    }
                    <div className={cx('container-presented')}>
                        <div
                            style={{ width: `${data.length * 36}rem` }}
                            className={cx('container-gridtour')}
                        >
                            {tours.map((tour, index) => {
                                return (
                                    index === 0
                                        ? <Item
                                            key={tour.id}
                                            data={tour}
                                            style={{ marginLeft: `${gridTourItems.marginLeft}rem` }}
                                            categories={categories}
                                            round={rounded}
                                            type={tour.type && tour.type}
                                        />
                                        : <Item
                                            key={tour.id}
                                            data={tour}
                                            categories={categories}
                                            round={rounded}
                                            type={tour.type && tour.type}
                                        />
                                )
                            }
                            )}
                        </div>
                    </div>
                    {slider
                        && <Button
                            tiny
                            className={cx('tour-item__nextButton')}
                            rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
                            onClick={() => handleNext()}
                        />
                    }
                </div>
            }
        </>
    )
}

GridTour.propTypes = {
    data: PropTypes.array.isRequired,
    dataItem: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    slider: PropTypes.bool,
    flex: PropTypes.bool,
    round: PropTypes.bool,
    className: PropTypes.string,
}

export default memo(GridTour);