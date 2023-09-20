import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { memo } from "react";
import { Link } from 'react-router-dom';

import style from "./ButtonStyle.module.scss";

const cx = classNames.bind(style);

function Button({
    to,
    href,
    value,
    type,
    children,
    className,
    tiny = false,
    small = false,
    large = false,
    rounded = false,
    outline = false,
    cancel = false,
    deleteb = false,
    primary = false,
    disable = false,
    create = false,
    rightIcon,
    leftIcon,
    onClick,
    ...passProps
}) {

    let Component = 'button';
    let props = {
        onClick,
        ...passProps
    };

    if (to) {
        Component = 'Link';
        props.to = to;
    }
    if (href) {
        Component = 'a';
        props.href = href;
    }
    if (value)
        Component = 'input';
    if (type)
        props.type = type;

    if (disable)
        if (Object.keys(props).forEach(key => {
            if (key.startsWith('on') && typeof props[key] === 'function')
                delete props[key];
        }));

    const classes = cx('button', {
        [className]: className,
        large,
        small,
        rounded,
        outline,
        primary,
        cancel,
        deleteb,
        disable,
        create
    });

    return (
        <>
            {value === undefined
                ? (to
                    ? <Link
                        className={classes}
                        to={to}
                    >
                        {leftIcon && <span className={cx('button_icon')}>{leftIcon}</span>}
                        {children && <span className={cx('title')}>{children}</span>}
                        {rightIcon && <span className={cx('button_icon')}>{rightIcon}</span>}
                    </Link>
                    : <Component
                        className={classes}
                        {...props}
                    >
                        {leftIcon && <span className={cx('button_icon')}>{leftIcon}</span>}
                        {children && <span className={cx('title')}>{children}</span>}
                        {rightIcon && <span className={cx('button_icon')}>{rightIcon}</span>}
                    </Component>)
                : <Component
                    className={classes} {...props}
                    value={value}
                />
            }
        </>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    type: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    tiny: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    outline: PropTypes.bool,
    cancel: PropTypes.bool,
    deleteb: PropTypes.bool,
    primary: PropTypes.bool,
    disable: PropTypes.bool,
    create: PropTypes.bool,
    rightIcon: PropTypes.node,
    leftIcon: PropTypes.node,
    onClick: PropTypes.func,
}

export default memo(Button);