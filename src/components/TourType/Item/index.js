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
            <img src={data.image}/>
            <p>{data.title}</p>
        </div>
    )
}

export default Item;