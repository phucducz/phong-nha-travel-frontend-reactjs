import classNames from "classnames/bind";

import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    data,
    defaultChecked,
    onChange
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
                type="checkbox"
                id={data.title}
                value={data.title}
                index={data.id}
                onChange={onChange}
                checked={checked}
            />
            <label htmlFor={data.title}>{data.title}</label>
        </div>
    )
}

export default Item;