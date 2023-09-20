import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Item.module.scss';
import DropDown from "./DropDown";

const cx = classNames.bind(style);

function Item({
    data,
    placement
}) {
    const { icon, title, url } = data;

    return (
        <li className={cx('menu_li')}>
            <div className={cx('d-item')}>
                {title && <Link to={url} className={cx('item_a')}>{title}</Link>}
                {data.contentBefore
                    ? <i className={cx('td-bag')}></i>
                    : (
                        icon && <FontAwesomeIcon icon={icon} className={cx('item_icon')} />
                    )
                }
            </div>
            {data.subMenu !== null && data.subMenu
                && <DropDown
                    data={data.subMenu}
                    placement={placement}
                />}
        </li>
    );
}

export default Item;