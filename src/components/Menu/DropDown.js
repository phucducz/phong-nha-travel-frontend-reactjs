import classNames from "classnames/bind";

import style from './DropDown.module.scss';
import Item from "./Item";

const cx = classNames.bind(style);

function DropDown({
    data,
    placement,
    className,
    header
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
        <ul className={classes}>
            {header && header}
            {data.data && data.data.map((item, index) => (
                <Item key={index} data={item} />
            ))}
        </ul>
    );
}

export default DropDown;