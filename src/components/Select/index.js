import classNames from "classnames/bind";

import style from "./SelectStyle.module.scss";

const cx = classNames.bind(style);

function Select({
    data,
    content,
    name,
    fieldName,
    optional = false,
    small = false,
    large = false,
    onChange,
    className,
    ...passProps
}) {
    const classes = cx('select', {
        small,
        large,
        [className]: className
    });

    return (
        <div className={cx('divSelect')}>
            {fieldName
                && <label>
                    {fieldName}
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
            }
            <select
                className={classes}
                name={name}
                onChange={onChange}
                {...passProps}
            >
                <option> -- select an option -- </option>
                {data
                    && data.map(item => (
                        <option key={item.id} id={item.id}>{item.title}</option>
                    ))
                }
            </select>
            <label className={cx('label')}>{content}</label>
        </div>
    )
}

export default Select;