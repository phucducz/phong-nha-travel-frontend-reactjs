import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './RadioButton.module.scss';

const cx = classNames.bind(style);

function RadioButton({
    data,
    defaultChecked,
    onChange,
    ...passProps
}) {
    let checked = false;

    const handleChecked = () => {
        defaultChecked && defaultChecked.map(item => {
            if (data.id == item.id)
                checked = true;
        });
    }

    handleChecked();

    return (
        <div className={cx('item')}>
            <input
                type="radio"
                id={data.title}
                value={data.title}
                index={data.id}
                onChange={onChange}
                checked={checked}
                {...passProps}
            />
            <label htmlFor={data.title}>{data.title}</label>
        </div>
    )
}

RadioButton.propTypes = {
    data: PropTypes.object.isRequired,
    defaultChecked: PropTypes.array,
    onChange: PropTypes.func,
}

export default RadioButton;