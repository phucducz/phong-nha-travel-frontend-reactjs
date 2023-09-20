import classNames from "classnames/bind";

import style from './Item.module.scss';
import { CATEGORIES_HREF } from '~/constant';

const cx = classNames.bind(style);

function Item({
    data
}) {
    let to = '#';

    CATEGORIES_HREF.map(item => {
        if (+data.id === +item.id)
            to = item.href;
    });

    return (
        <a className={cx('item')} href={`/tour-category/${to}`}>{data.title}</a>
    )
}

export default Item;