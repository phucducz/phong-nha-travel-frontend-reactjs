import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";

import Item from './Item';
import style from './ToursType.module.scss';

const cx = classNames.bind(style);

function ToursType({
    data,
    className
}) {
    const [count, setCount] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const itemRef = useRef();

    let itemPresent = 4;

    const classes = cx('tours-type', {
        [className]: className
    });

    useEffect(() => {
        let widthItem = itemRef.current ? itemRef.current.offsetWidth : 262.5;
        let spaceMargin = 30;

        setMarginLeft((-widthItem - spaceMargin) * count);
    }, [count]);

    return (
        <div className={classes}>
            <FontAwesomeIcon
                className={cx('tours-type__prev')}
                icon={faChevronLeft}
                onClick={() => setCount(count === 0 ? data.length - itemPresent : count - 1)}
            />
            <div className={cx('tours-type__present')}>
                {data.map((item, index) => (
                    index === 0
                        ? <Item
                            style={{ marginLeft: `${marginLeft}px` }}
                            key={index}
                            data={item}
                            itemRef={itemRef}
                        />
                        : <Item key={index} data={item} />
                ))}
            </div>
            <FontAwesomeIcon
                className={cx('tours-type__next')}
                icon={faChevronRight}
                onClick={() => setCount(count === data.length - itemPresent ? 0 : count + 1)}
            />
        </div>
    );
}

ToursType.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default ToursType;