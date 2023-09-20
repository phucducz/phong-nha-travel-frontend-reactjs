import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './PageSingle.module.scss';
import Item from './Item';

const cx = classNames.bind(style);

function PageSingle({
    data,
    title,
    subTitle
}) {
    return (
        <div className={cx('page__single')}>
            <div className={cx('page__single__title')}>
                {subTitle && <p className={cx('cm__content')}>{subTitle}</p>}
                {title && <h3 className={cx('cm__title')}>{title}</h3>}
            </div>
            <div className={cx('page__single__content')}>
                {data.map((item, index) => {
                    return (
                        <Item
                            key={index}
                            data={item}
                        />
                    )
                })}
            </div>
        </div>
    );
}

PageSingle.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string,
    subTitle: PropTypes.string,
}

export default PageSingle;