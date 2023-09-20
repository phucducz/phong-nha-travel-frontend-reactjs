import classNames from "classnames/bind";

import style from './Wrapper.module.scss';
import Item from "../Item";

const cx = classNames.bind(style);

function Wrapper({
    data,
    defaultChecked,
    title,
    optinal,
    onChange,
    className
}) {
    const classes = cx('wrapper', {
        [className]: className
    });

    return (
        <div className={classes}>
            <label className={cx('wrapper__title')}>
                {title}
                {optinal
                    ? <span className={cx('label-option')}>
                        (optional)
                        <span className={cx('colon')}>:</span>
                    </span>
                    : <span className={cx('label-option')}>
                        (required)
                        <span className={cx('colon')}>:</span>
                        <abbr title="required">*</abbr>
                    </span>
                }
            </label>
            <div className={cx('wrapper__input')}>
                {data && data.map(item => (
                    <Item
                        key={item.id}
                        data={item}
                        defaultChecked={defaultChecked}
                        onChange={onChange}
                    />
                ))}
            </div>
        </div>
    )
}

export default Wrapper;