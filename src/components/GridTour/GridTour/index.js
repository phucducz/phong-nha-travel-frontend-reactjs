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
    title,
    className,
    ...passProps
}) {
    const [tours, setTours] = useState([]);
    const [gridTourItems, setGridTourItems] = useState({});
    const [action, setAction] = useState({
        count: 0,
        index: 0,
    });

    let flex = false, round = false, slider = false;

    if (title) {
        flex = title.flex;
        round = title.round;
        slider = title.slider;
    }

    const classes = cx('tour-item', {
        [className]: className,
        slider,
        flex
    });

    const rounded = round;

    useEffect(() => {
        const newArr = title && flex ? data.slice(0, 6) : data;

        setTours(newArr);
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
                return { count: 0 }
            else
                return { count: action.count - 1 }
        });
    }

    const handleNext = () => {
        let itemCurrent = 3;

        setAction(() => {
            if (tours.length <= itemCurrent)
                return { count: 0 }
            else if (action.count === tours.length - itemCurrent)
                return { count: tours.length - itemCurrent }
            else
                return { count: action.count + 1 }
        });
    }

    return (
        <>{tours.length > 0
            && <div className={classes} {...passProps}>
                {title.title}
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
                        style={{ width: `${tours.length * 36}rem` }}
                        className={cx('container-gridtour')}
                    >
                        {tours.map((tour, index) => (
                            index === 0
                                ? <Item
                                    key={index}
                                    data={tour}
                                    style={{ marginLeft: `${gridTourItems.marginLeft}rem` }}
                                    categories={tour.categoryIds}
                                    round={rounded}
                                />
                                : <Item
                                    key={index}
                                    data={tour}
                                    categories={tour.categoryIds}
                                    round={rounded}
                                />
                        ))}
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
        }</>
    );
}

GridTour.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.object,
    className: PropTypes.string
}

export default memo(GridTour);