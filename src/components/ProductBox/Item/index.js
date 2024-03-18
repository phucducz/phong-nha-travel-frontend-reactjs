import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Input from "~/components/Input";
import { useDebounce } from "~/context";
import { formatMoney } from "~/format";
import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    data,
    value,
    status,
    couponValue,
    onChange,
    onRemove,
    readOnly,
    mobileMode
}) {
    let id = data.id;

    const [quantity, setQuantity] = useState(value);
    const [change, setChange] = useState(false);

    const debounce = useDebounce(quantity, 500);

    const handleChange = e => {
        setQuantity(e.target.value);
        setChange(true);
    }

    useEffect(() => {
        if (change === false)
            return;

        onChange && onChange(id, quantity, couponValue);
    }, [debounce]);

    let listName = data.name.split(' ');
    let tourName = listName.join('-');

    return (
        <tr>
            <td className={cx('table-product__remove')}>
                {!readOnly
                    && <div className={cx('remove__icon', status && 'item-paid')}>
                        {status
                            ? <FontAwesomeIcon icon={faCheck} />
                            : <FontAwesomeIcon icon={faXmark} onClick={() => onRemove(data)} />
                        }
                    </div>
                }
            </td>
            <td className={cx('table-product__thumbnail')}>
                <Link
                    to={`/tours/${tourName}/${data.tourId}`}
                    target='_blank'
                >
                    <img src={data.listImage && data.listImage[0].image} alt={data.name} />
                </Link>
            </td>
            <td className={cx('table-product__name')}>
                <Link
                    to={`/tours/${tourName}/${data.tourId}`}
                    className={cx('name')}
                    target='_blank'
                >
                    {data.name}
                </Link>
                <p className={cx('booking-date')}>
                    <span>Booking Date:</span>
                    <span>{data.bookingDate}</span>
                </p>
            </td>
            <td className={cx('table-product__price')}>
                <p>{formatMoney(data.priceAdult)}</p>
            </td>
            <td className={cx('table-product__quantity')}>
                {!readOnly && !status
                    ? <Input
                        type='number'
                        min={1} max={9}
                        className={cx('quantity')}
                        name='quantity'
                        value={quantity}
                        onChange={e => handleChange(e)}
                    />
                    : <p>{quantity}</p>
                }
            </td>
            <td className={cx('table-product__subtotal')}>
                <p>{formatMoney(data.totalPrice)}</p>
            </td>
        </tr>
    );
}

export default Item;