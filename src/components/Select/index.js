import PropTypes from 'prop-types';
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
    tiny = false,
    onChange,
    className,
    ...passProps
}) {
    const classes = cx('select', {
        small,
        large,
        tiny,
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

Select.propTypes = {
    data: PropTypes.array.isRequired,
    content: PropTypes.string,
    name: PropTypes.string,
    fieldName: PropTypes.string,
    optional: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
}

export default Select;