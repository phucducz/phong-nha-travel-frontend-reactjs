import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    leftIcon,
    title,
    content,
    className,
    ...passProps
}) {
    const classes = cx('item', {
        [className]: className
    });

    return (
        <div className={classes} {...passProps}>
            <div className={cx('item__icon')}>
                {leftIcon && <FontAwesomeIcon icon={leftIcon} />}
            </div>
            <div className={cx('item__content')}>
                {title && <h3>{title}</h3>}
                {content && <p>{content}</p>}
            </div>
        </div>
    )
}

export default Item;