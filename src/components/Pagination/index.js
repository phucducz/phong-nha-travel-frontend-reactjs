import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from "react";

import style from './PaginationStyle.module.scss';

const cx = classNames.bind(style);

function Pagination({
    data,
    className,
    itemPerPage,
    totalItem,
    onClick
}) {
    const classes = cx('paginate', {
        [className]: className
    });

    const [activePage, setActivePage] = useState(1);
    const numbersPage = [];

    useEffect(() => {
        setActivePage(1);
    }, [data]);

    for (let i = 1; i <= Math.ceil(totalItem / itemPerPage); i++)
        numbersPage.push(i);

    const handleClick = (number, data) => {
        onClick(number, data);
        setActivePage(number);
    }

    return (
        <div className={classes}>
            <ul className={cx('paginate__ul')}>
                {numbersPage.map(number => (
                    <li key={number}>
                        <p
                            className={cx('paginate__p', activePage === number && 'active')}
                            onClick={() => handleClick(number, data)}
                        >
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    className: PropTypes.string,
    itemPerPage: PropTypes.number.isRequired,
    totalItem: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default memo(Pagination);