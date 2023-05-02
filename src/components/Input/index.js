import classNames from "classnames/bind";

import style from "./InputStyle.scss";

const cx = classNames.bind(style);

function Input({ value, content, onChange, className, ...passProps }) {

    const props = {
        value,
        onChange,
        ...passProps
    }

    console.log(value);

    if (value)
        props.value = value;

    console.log(props);

    const classes = cx({
        [className]: className
    })

    return (
        <div className={cx('divInput')}>
            <input
                {...props}
                className={classes}
            />
            <label
            >{content}</label>
        </div>
    )
}

export default Input;