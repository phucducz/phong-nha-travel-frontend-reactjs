import classNames from "classnames/bind";

import style from './Menu.module.scss';
import Item from "./Item";

const cx = classNames.bind(style);

function Menu({
    data,
    placement,
    className,
    ...passProps
}) {
    const classes = cx('menu-item', {
        [className]: className
    });

    return (
        <ul className={classes} {...passProps}>
            {data.map((item, index) => (
                <Item
                    key={index}
                    data={item}
                    placement={item.placement || placement}
                />
            ))}
        </ul>
    );
}

export default Menu;