import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import style from './StatusHeader.module.scss';

const cx = classNames.bind(style);

function StatusHeader({
    data
}) {
    return (
        <ul className={cx('status-header')}>
            <li>
                <p>YOU ARE HERE</p>
                <FontAwesomeIcon className={cx('status-header__arrow')} icon={faChevronRight} />
            </li>
            {data.map((item, index) => {
                let isActiveArrow = index < data.length - 1 || index === 0;
                const { to, title } = item;

                return (
                    <li key={index}>
                        <Link to={to} className={cx(index === data.length - 1 && 'item-lastest')}>{title}</Link>
                        {isActiveArrow && <FontAwesomeIcon className={cx('status-header__arrow')} icon={faChevronRight} />}
                    </li>
                )
            })}
        </ul>
    )
}

export default StatusHeader;