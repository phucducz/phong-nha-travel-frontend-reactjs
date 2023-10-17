import classNames from "classnames/bind";
import PropTypes from 'prop-types';

import style from './Item.module.scss';
import { CATEGORIES_HREF } from '~/constant';

const cx = classNames.bind(style);

function Item({
    data
}) {
    return (
        CATEGORIES_HREF.map(item => {
            if (data === item.id)
                return <a className={cx('item')} href={`/tour-category/${item.href}`}>{item.title}</a>
        })
    );
}

Item.propTypes = {
    data: PropTypes.number.isRequired
}

export default Item;