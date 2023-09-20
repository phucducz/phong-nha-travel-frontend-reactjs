import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Wrapper.module.scss';
import Item from "../Item";

const cx = classNames.bind(style);

function Wrapper({
    data,
    className
}) {
    const classes = cx('wrapper', {
        [className]: className
    });

    return (
        <div className={classes}>
            <h3 className={cx('title')}>tour reviews </h3>
            <div className={cx('review_menu')}>
                {data && data.map((item, index) => (
                    <Item key={index} data={item} />
                ))}
            </div>
        </div>
    )
}

Wrapper.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default Wrapper;