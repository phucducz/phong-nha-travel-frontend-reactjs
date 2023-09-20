import classNames from "classnames/bind";
import { memo } from "react";

import style from "./ButtonStyle.scss";

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
    disabled = false,
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

    if (to)
        Component = 'Link';
    if (href)
        Component = 'href';
    if (value)
        Component = 'input';
    if (type)
        props.type = type;

    if (disabled)
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
        disabled,
        create
    });

    return (
        <>
            {value === undefined
                ? <Component
                    className={classes}
                    {...props}
                >
                    {leftIcon && <span className={cx('button_icon')}>{leftIcon}</span>}
                    {children && <span className={cx('title')}>{children}</span>}
                    {rightIcon && <span className={cx('button_icon')}>{rightIcon}</span>}
                </Component>
                : <Component
                    className={classes} {...props}
                    value={value}
                />
            }
        </>
    )
}

export default memo(Button);