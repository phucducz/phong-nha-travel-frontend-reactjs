import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Menu.module.scss';
import Item from "./Item";

const cx = classNames.bind(style);

function Menu({
    data,
    placement,
    className,
    onClick,
    activeIndex,
    ...passProps
}) {
    const classes = cx('menu-item', {
        [className]: className
    });
    console.log(data);
    return (
        <ul className={classes} {...passProps}>
            {data.map(item => (
                <Item
                    key={item.id}
                    id={item.id}
                    data={item}
                    active={activeIndex}
                    placement={item.placement || placement}
                    onClick={onClick}
                />
            ))}
        </ul>
    );
}

Menu.propTypes = {
    data: PropTypes.array.isRequired,
    placement: PropTypes.string,
    className: PropTypes.string,
}

export default Menu;