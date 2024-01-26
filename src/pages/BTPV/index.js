import classNames from "classnames/bind";

import style from './BTPVStyle.module.scss';
import { useState } from "react";

const cx = classNames.bind(style);

const ITEMS = [
    {
        id: 1,
        backColor: 'var(--color-green)'
    }, {
        id: 2,
        backColor: 'var(--color-red)'
    }, {
        id: 3,
        backColor: 'purple'
    }, {
        id: 4,
        backColor: 'var(--color-yellow)'
    }
]

function BTPV() {
    const [itemActive, setItemActive] = useState({
        id: 0,
        backColor: ''
    });

    return (
        <div className={cx('container')}>
            <div className={cx('container__row')}>
                {ITEMS.map(item => (
                    <div
                        key={item.id}
                        className={cx('col__item', item.id === itemActive.id && 'active')}
                        style={{
                            backgroundColor: item.backColor,
                            width: '60px',
                            height: '60px',
                            margin: '0 10px'
                        }}
                        onClick={() => setItemActive(item)}
                    >
                    </div>
                ))}
            </div>
            <div
                className={cx('container__row-circle')}
                style={{ backgroundColor: `${itemActive.backColor}` }}>
            </div>
        </div>
    );
}

export default BTPV;