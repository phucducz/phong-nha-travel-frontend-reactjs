import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Wrapper.module.scss';
import Item from "../CheckBoxItem";

const cx = classNames.bind(style);

function GroupCheckBox({
    data,
    title,
    optional,
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
                {optional
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
                        onChange={onChange}
                    />
                ))}
            </div>
        </div>
    );
}

GroupCheckBox.propTypes = {
    data: PropTypes.array.isRequired,
    defaultChecked: PropTypes.array,
    title: PropTypes.string.isRequired,
    optional: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
}

export default GroupCheckBox;