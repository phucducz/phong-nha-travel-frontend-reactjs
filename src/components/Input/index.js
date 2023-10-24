import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { forwardRef, useEffect, useState } from 'react';

import style from "./InputStyle.module.scss";

const cx = classNames.bind(style);

const Input = forwardRef(({
    type,
    value,
    placeHolder,
    name,
    fieldName,
    optional,
    mini = false,
    tiny = false,
    small = false,
    large = false,
    error = '',
    touched = false,
    outline,
    className,
    leftIcon,
    rightIcon,
    onFocus,
    onChange,
    onClick,
    onRightIconClick,
    ...passProps
}, ref) => {
    const props = { ...passProps };
    let Comp = 'input';

    const [showError, setShowError] = useState(false);

    if (type) {
        if (type === 'textarea')
            Comp = 'textarea';
        else
            props.type = type;
    }

    if (ref && ref.current)
        props.ref = ref;

    if (props.width)
        props.style = { width: passProps.width };

    if (outline)
        outline = `outline-${outline}`;

    const classes = cx('input', {
        [className]: className,
        [outline]: outline,
        small,
        large,
        tiny,
        mini
    });

    useEffect(() => {
        setShowError(false);
    }, [touched]);

    return (
        <div
            className={cx('form-group')}
            style={props.style}
        >
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
            <div
                className={cx('form-group__col', Comp === 'textarea' && 'textarea')}
                style={props.style}
            >
                {leftIcon
                    && <div className={cx('form-group__col__left-icon')}>{leftIcon}</div>
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
                />
                <label className={cx('form-group__col__label', value !== '' && 'non-empty')}>{placeHolder}</label>
                {showError
                    && <div className={cx('form-group__col__error')}>
                        {error}
                    </div>}
                {rightIcon
                    && <div className={cx('form-group__col__right-icon')} onClick={onRightIconClick}>{rightIcon}</div>
                }
            </div>
        </div>
    );
});

Input.propTypes = {
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeHolder: PropTypes.string,
    name: PropTypes.string,
    fieldName: PropTypes.string,
    optional: PropTypes.bool,
    mini: PropTypes.bool,
    tiny: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
    ref: PropTypes.node,
    className: PropTypes.string,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onRightIconClick: PropTypes.func
}

Input.displayName = 'Input';

export default Input;