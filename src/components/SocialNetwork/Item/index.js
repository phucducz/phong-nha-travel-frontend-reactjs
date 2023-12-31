import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    data,
    ...passProps
}) {
    return (
        <a
            className={cx('social-network__item', { [data.bgColor]: data.bgColor })}
            {...passProps}
            href={data.href}
            target={data.target && data.target}
        >
            <span></span>
            <img className={cx('item__image')} src={data.src} alt={data.content} />
            {data.content
                && <div className={cx('content')}>
                    <p>{data.content}</p>
                </div>
            }
        </a>
    );
}

Item.propTypes = {
    data: PropTypes.object.isRequired
}

export default Item;