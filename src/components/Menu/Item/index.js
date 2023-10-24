import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Item.module.scss';
import DropDown from "../DropDown";

const cx = classNames.bind(style);

function Item({
    data,
    placement,
    className,
    active,
    onClick,
    onlyChoose,
    iconPosition = 'right',
    ...passProps
}) {
    const { icon, title, url } = data;

    const classes = cx('menu_li', {
        [className]: className,
    }, active === data.id && 'active');

    return (
        <li className={classes}>
            <div className={cx('d-item')}>
                {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} className={cx('item_icon')} /> }
                {onlyChoose
                    ? title &&
                    <p
                        className={cx('item_a')}
                        onClick={() => onClick(data.id)}
                        {...passProps}
                    >
                        {title}
                    </p>
                    : title &&
                    <Link
                        to={url}
                        className={cx('item_a')}
                        onClick={() => onClick(data.id)}
                        {...passProps}
                    >
                        {title}
                    </Link>
                }
                {data.contentBefore
                    ? <Link
                        to={url}
                        className={cx('item_a')}
                        onClick={() => onClick(data.id)}
                        {...passProps}
                    >
                        <i className={cx('td-bag')}></i>
                    </Link>
                    : icon && iconPosition !== 'left' && <FontAwesomeIcon icon={icon} className={cx('item_icon')} />}
            </div>
            {data.subMenu !== null && data.subMenu
                && <DropDown
                    data={data.subMenu}
                    placement={placement}
                    onClick={onClick}
                    active={active}
                />}
        </li>
    );
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    placement: PropTypes.string,
    className: PropTypes.string,
    setValue: PropTypes.func,
    onClick: PropTypes.func,
}

export default Item;