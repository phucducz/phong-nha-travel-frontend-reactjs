import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    data,
    defaultChecked,
    onChange,
    checked,
    ...passProps
}) {
    const handleChecked = () => {
        defaultChecked && defaultChecked.map(item => {
            if (data.id == item.id)
                checked = true;
        });
    }
    
    defaultChecked && handleChecked();

    return (
        <div className={cx('item')}>
            <input
                type="checkbox"
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

Item.propTypes = {
    data: PropTypes.object.isRequired,
    defaultChecked: PropTypes.array,
    onChange: PropTypes.func,
}

export default Item;