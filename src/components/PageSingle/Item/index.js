import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Item.module.scss';
import Icon from "~/components/Icon";

const cx = classNames.bind(style);

function Item({
    data,
    className,
    ...passProps
}) {
    const classes = cx('item', {
        [className]: className
    });

    return (
        <div className={classes} {...passProps}>
            <div className={cx('item__icon')}>
                {data.code && <Icon data={data} />}
            </div>
            <div className={cx('item__content')}>
                {data.title && <h3>{data.title}</h3>}
                {data.content && <p>{data.content}</p>}
            </div>
        </div>
    )
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string
}

export default Item;