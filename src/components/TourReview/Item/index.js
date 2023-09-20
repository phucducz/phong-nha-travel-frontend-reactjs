import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Item.module.scss';
import USER_ICON from '~/images/usericon.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function Item({
    data,
    className
}) {
    const { img, userName, tourName, comment, rating } = data;

    const classes = cx('item', {
        [className]: className
    });

    const ratings = [];

    for (let i = 0; i < rating; i++)
        ratings.push(<FontAwesomeIcon key={i} icon={faStar} />);

    return (
        <div className={classes}>
            <div className={cx('item__user')}>
                {img === null
                    ? <img src={img} alt={userName} />
                    : <img src={USER_ICON} alt={userName} />
                }
                <h3>{userName}</h3>
            </div>
            <div className={cx('item__feedback')}>
                <h3>{tourName}</h3>
                <p>{comment}</p>
                {ratings.map(item => item)}
            </div>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
}

export default Item;