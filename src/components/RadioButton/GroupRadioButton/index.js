import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './GroupRadioButton.module.scss';
import { RadioButton } from '..';

const cx = classNames.bind(style);

function GroupRadioButton({
    data,
    title,
    optional,
    onChange,
    className,
    ...passProps
}) {
    const classes = cx('wrapper', {
        [className]: className
    });

    return (
        <div className={classes} {...passProps}>
            <label className={cx('wrapper__title')}>
                {title}
                {!optional && <span className={cx('label-option')}>
                    <abbr title="required">*</abbr>
                </span>}
            </label>
            <div className={cx('wrapper__input')}>
                {data && data.map(item => (
                    <RadioButton
                        key={item.id}
                        id={item.id}
                        title={item.role}
                        onChange={onChange}
                    />
                ))}
            </div>
        </div>
    )
}

GroupRadioButton.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func,
}

export default GroupRadioButton;