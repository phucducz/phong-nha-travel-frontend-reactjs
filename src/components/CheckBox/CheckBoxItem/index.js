import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Item.module.scss';

const cx = classNames.bind(style);

function CheckBoxItem({
    title,
    onChange,
    checked,
    ...passProps
}) {
    return (
        <div className={cx('form-group')}>
            <input
                type="checkbox"
                id={title}
                value={title}
                onChange={onChange}
                checked={checked}
                {...passProps}
            />
            <label htmlFor={title}>{title}</label>
        </div>
    );
}

CheckBoxItem.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}

export default CheckBoxItem;