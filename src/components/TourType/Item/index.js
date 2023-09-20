import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    data,
    className,
    ...passProps
}) {
    const classes = cx('item', {
        className
    });

    return (
        <div className={classes} {...passProps}>
            <img src={data.image} alt={data.name} />
            <p>{data.title}</p>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string
}

export default Item;