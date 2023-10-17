import classNames from "classnames/bind";
import PropTypes from 'prop-types';

import style from './TabCategories.module.scss';
import Item from './Item';

const cx = classNames.bind(style);

function TabCategories({
    data,
    className
}) {
    const classes = cx('tab-categories', {
        [className]: className
    });

    return (
        <div className={classes}>
            {data && data.map((item, index) => (
                <Item key={index} data={item} />
            ))}
        </div>
    );
}

TabCategories.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default TabCategories;