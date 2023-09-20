import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    data,
    onClick,
    ...passProps
}) {
    
    return (
        <div
            className={cx('cn_item')}
            {...passProps}
            onClick={onClick}
        >
            <div className={cx('item')}>
                {data.icon && <FontAwesomeIcon className={cx('item_icon')} icon={data.icon} />}
                <p className={cx('item_content')}>
                    {data.content}
                </p>
            </div>
        </div>
    );
}

export default Item;