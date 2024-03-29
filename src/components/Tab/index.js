import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { memo, useState } from "react";

import style from './Tab.module.scss';

const cx = classNames.bind(style);

function Tab({
    tabs,
    contents
}) {
    const [toggle, setToggle] = useState(0);

    return (
        <div className={cx('tab')}>
            <ul className={cx('nav__tour')}>
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={cx('nav__tour__item', index === toggle && 'active-nav__item')}
                        onClick={() => setToggle(index)}
                    >
                        <p>{tab}</p>
                    </li>
                ))}
            </ul>
            {contents.map((content, index) => (
                <div
                    key={content.id}
                    className={cx('tab__item', index === toggle && 'active-tab__item')}
                >
                    {content.tab}
                </div>
            ))}
        </div>
    )
}

Tab.propTypes = {
    tabs: PropTypes.array.isRequired,
    contents: PropTypes.array.isRequired
}

export default memo(Tab);