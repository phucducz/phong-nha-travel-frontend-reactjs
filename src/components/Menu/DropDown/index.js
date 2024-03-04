import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './DropDown.module.scss';
import Item from '../Item';

const cx = classNames.bind(style);

function DropDown({
    data,
    placement,
    header,
    className,
    active,
    onlyChoose = false,
    iconPosition,
    onClick,
    style
}) {
    let classes;

    if (placement)
        classes = cx('dropdown-item', {
            [placement]: placement,
            [className]: className
        });
    else
        classes = cx('dropdown-item', {
            children: 'children',
            [className]: className
        });

    return (
        <ul className={classes} style={style}>
            {header && header}
            {data.data && data.data.map(item => (
                <Item
                    key={item.id}
                    id={item.id}
                    data={item}
                    active={active}
                    iconPosition={iconPosition}
                    onClick={onClick}
                    onlyChoose={onlyChoose}
                />
            ))}
        </ul>
    );
}

DropDown.propTypes = {
    data: PropTypes.object.isRequired,
    placement: PropTypes.string,
    header: PropTypes.node,
    className: PropTypes.string,
    setValue: PropTypes.func,
    onBlur: PropTypes.func,
    activeDefault: PropTypes.number,
}

export default DropDown;