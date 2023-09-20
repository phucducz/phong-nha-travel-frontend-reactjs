import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./InputStyle.module.scss";

const cx = classNames.bind(style);

function Input({
    type,
    value,
    content,
    name,
    fieldName,
    option,
    mini = false,
    tiny = false,
    small = false,
    large = false,
    onChange,
    onClick,
    className,
    leftIcon,
    rightIcon,
    ...passProps
}) {
    const props = {
        value,
        ...passProps
    }

    let Comp = 'input';

    if (value)
        props.value = value;
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
        <div className='field'>
            {fieldName
                && <label>
                    {fieldName}
                    {option
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
            }
            <div className={cx('divInput')}>
                {leftIcon && <FontAwesomeIcon icon={leftIcon} className={cx('leftIcon')} />}
                <Comp
                    className={classes}
                    name={name}
                    onChange={onChange}
                    {...props}
                />
                <label className={cx('label')}>{content}</label>
                {rightIcon && <FontAwesomeIcon icon={rightIcon} className={cx('rightIcon')} />}
            </div>
        </div>
    )
}

export default Input;