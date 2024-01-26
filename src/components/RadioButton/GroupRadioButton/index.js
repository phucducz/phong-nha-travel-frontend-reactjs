import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './GroupRadioButton.module.scss';
import { RadioButton } from '..';

const cx = classNames.bind(style);

function GroupRadioButton({
    data,
    activeId,
    title,
    optional,
    className,
    onChange,
    onClick,
    ...passProps
}) {
    const classes = cx('form-group', {
        [className]: className
    });

    return (
        <div className={classes}>
            <label className={cx('form-group__title')}>
                {title}
                {!optional && <span className={cx('label-option')}>
                    <abbr title="required">*</abbr>
                </span>}
            </label>
            <div className={cx('form-group__input')}>
                {data && data.map(item => (
                    <RadioButton
                        key={item.id}
                        id={item.id}
                        title={item.role}
                        checked={activeId === item.id}
                        onChange={() => onChange(item)}
                        {...passProps}
                    />
                ))}
            </div>
        </div>
    )
}

GroupRadioButton.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
}

export default GroupRadioButton;