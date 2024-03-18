import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { memo, useEffect, useRef, useState } from "react";

import { useWindowsResize } from "~/context";
import style from './Tab.module.scss';

const cx = classNames.bind(style);

function Tab({
    tabs,
    contents,
    tabRef
}) {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(0);
    const [mobileMode, setMobileMode] = useState(false);
    const contentRef = useRef([]);

    useEffect(() => {
        if (!contents.length) return;

        setData(contents);
    }, [contents]);

    useEffect(() => {
        if (!tabRef.current.length || !data.length) return;

        setData(contents.map((item, index) => ({
            ...item,
            height: tabRef.current[index].offsetHeight
        })));
    }, [tabRef, contents]);

    useWindowsResize(() => {
        if (window.matchMedia('(max-width: 700px').matches) {
            setMobileMode(true);
            return;
        }
        setMobileMode(false);
    }, []);

    const handleActiveTab = (id) => {
        setData(prev =>
            prev.map(item => item.id === id
                ? { ...item, active: !item.active }
                : item
            )
        );
    }

    return (
        <>{!mobileMode
            ? <div className={cx('tab')}>
                <ul className={cx('nav__tour')} >
                    {tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={cx('nav__tour__item', index === toggle && 'active')}
                            onClick={() => setToggle(index)}
                        >
                            <p>{tab}</p>
                        </li>
                    ))}
                </ul>
                {data.map((item, index) => (
                    <div
                        key={item.id}
                        className={cx('tab__item', index === toggle && 'active')}
                    >
                        {item.tab}
                    </div>
                ))}
            </div>
            : <div className={cx('tab-according')}>
                <ul className={cx('tab-according__nav__tour')}>
                    {tabs.map((item, index) => (
                        <li
                            key={index}
                            className={cx('item', data[index].active && 'active')}
                            onClick={() => handleActiveTab(data[index].id)}
                        >
                            <p>{item}</p>
                            <div
                                className={cx('tab-according__tab__item')}
                                ref={ref => contentRef.current[index] = ref}
                                style={{
                                    height: data[index].active
                                        ? `${data[index].height}px`
                                        : 0
                                }}
                            >
                                {data[index].tab}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        }</>
    )
}

Tab.propTypes = {
    tabs: PropTypes.array.isRequired,
    contents: PropTypes.array.isRequired
}

export default memo(Tab);