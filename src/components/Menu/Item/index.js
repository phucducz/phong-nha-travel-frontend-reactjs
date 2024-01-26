import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Item.module.scss';
import DropDown from "../DropDown";
import { routes } from '~/config';
import { useSelector } from 'react-redux';

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
    const user = useSelector(state => state.user);

    const { icon, title, url } = data;

    const classes = cx('menu_li', {
        [className]: className,
    }, active === data.id && 'active');
    
    return (
        <li className={classes}>
            <div className={cx('d-item')}>
                {icon && iconPosition === 'left' && <FontAwesomeIcon icon={icon} className={cx('item_icon')} />}
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
                    (typeof data.to === 'undefined'
                        ? <Link
                            to={data.id === 20
                                ? typeof user.currentUser.id === 'undefined' ? routes.Login : routes.Account
                                : url}
                            className={cx('item_a', 'link__tag')}
                            onClick={() => onClick(data.id)}
                            {...passProps}
                        >
                            {title}
                        </Link>
                        : <a
                            href={data.id === 20
                                ? typeof user.currentUser.id === 'undefined' ? routes.Login : routes.Account
                                : data.to}
                            className={cx('item_a', 'a__tag')}
                            {...passProps}
                        >
                            {title}
                        </a>
                    )
                }
                {data.contentBefore
                    ? (typeof data.to === 'undefined'
                        ? <Link
                            to={url}
                            className={cx('item_a', 'link__tag')}
                            onClick={() => onClick(data.id)}
                            {...passProps}
                        >
                            <i className={cx('td-bag')}></i>
                        </Link>
                        : <a
                            href={data.to}
                            className={cx('item_a', 'a__tag')}
                            {...passProps}
                        >
                            <i className={cx('td-bag')}></i>
                        </a>
                    )
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