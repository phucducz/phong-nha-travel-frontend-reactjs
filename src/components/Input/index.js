import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { forwardRef, useState } from 'react';

import style from "./InputStyle.module.scss";

const cx = classNames.bind(style);

function Input({
    type,
    value,
    content,
    name,
    fieldName,
    optional,
    mini = false,
    tiny = false,
    small = false,
    large = false,
    error = false,
    touched = false,
    onFocus,
    onChange,
    onClick,
    className,
    leftIcon,
    rightIcon,
    ...passProps
}, ref) {
    const props = { ...passProps };
    let Comp = 'input';

    const [showError, setShowError] = useState(false);

    if (type) {
        if (type === 'textarea')
            Comp = 'textarea';
        else
            props.type = type;
    }

    const classes = cx('input', {
        [className]: className,
        small,
        large,
        tiny,
        mini
    });

    return (
        <div className={cx('field')}>
            {fieldName
                && <label>
                    {fieldName}
                    {optional
                        ? <span className={cx('label-optional')}>
                            <span className={cx('colon')}>(tùy chọn)</span>
                        </span>
                        : <span className={cx('label-optional')}>
                            <abbr title="required">*</abbr>
                        </span>
                    }
                </label>
            }
            <div className={cx('divInput', Comp === 'textarea' && 'textarea')}>
                {leftIcon
                    && <div className={cx('leftIcon')}>{leftIcon}</div>
                }
                <Comp
                    className={classes}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                    onFocus={onFocus}
                    onBlur={() => setShowError(error && touched)}
                    {...props}
                    ref={ref}
                />
                <label className={cx('label', value !== '' && 'non-empty')}>{content}</label>
                {showError
                    && <div className={cx('divInput__error')}>
                        {error}
                    </div>}
                {rightIcon
                    && <div className={cx('rightIcon')}>{rightIcon}</div>
                }
            </div>
        </div>
    )
}

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    content: PropTypes.string,
    name: PropTypes.string,
    fieldName: PropTypes.string,
    optional: PropTypes.bool,
    mini: PropTypes.bool,
    tiny: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    error: PropTypes.bool,
    touched: PropTypes.bool,
    ref: PropTypes.node,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    className: PropTypes.string,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
}

export default forwardRef(Input);