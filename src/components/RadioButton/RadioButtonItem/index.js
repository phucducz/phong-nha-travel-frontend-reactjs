import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './RadioButton.module.scss';

const cx = classNames.bind(style);

function RadioButtonItem({
    title,
    id,
    onClick,
    ...passProps
}) {
    return (
        <div className={cx('item')}>
            <input
                type="radio"
                index={id}
                id={title}
                value={title}
                onClick={onClick}
                {...passProps}
            />
            <label htmlFor={title}>{title}</label>
        </div>
    );
}

RadioButtonItem.propTypes = {
    onClick: PropTypes.func,
}

export default RadioButtonItem;