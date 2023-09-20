import classNames from "classnames/bind";

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
            {data.map(item => (
                <Item key={item.id} data={item} />
            ))}
        </div>
    );
}

export default TabCategories;