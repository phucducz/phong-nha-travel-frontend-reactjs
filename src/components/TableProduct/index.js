import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Item from '~/components/ProductBox/Item';
import { useDebounce, useWindowsResize } from "~/context";
import { formatMoney } from "~/format";
import Input from "../Input";
import style from './TableProduct.module.scss';

const cx = classNames.bind(style);

const ItemProduct = memo(({ status, data, onRemove, onChange, couponValue }) => {
    const [quantity, setQuantity] = useState(data.quantity);
    const [change, setChange] = useState(false);

    const debounce = useDebounce(quantity, 500);

    const handleChange = e => {
        setQuantity(e.target.value);
        setChange(true);
    }

    useEffect(() => {
        if (change === false)
            return;

        onChange && onChange(data.id, quantity, couponValue);
    }, [debounce]);

    return (
        <div className={cx('product__item')}>
            <div className={cx('product__item__action')}>
                <p>delete:</p>
                {status
                    ? <FontAwesomeIcon icon={faCheck} className={cx('done')} />
                    : <FontAwesomeIcon icon={faXmark} className={cx('delete')} onClick={() => onRemove(data)} />
                }
            </div>
            <div className={cx('product__item-name')}>
                <div className={cx('name')}>
                    <p>product:</p>
                    <Link to={`/tours/${data.name.split(' ').join('-')}/${data.tourId}`} target='_blank'>{data.name}</Link>
                </div>
                <div className={cx('booking-date')}>
                    <p>booking date:</p>
                    <p>{data.bookingDate}</p>
                </div>
            </div>
            <div>
                <p>price:</p>
                <p>{formatMoney(data.priceAdult)}</p>
            </div>
            <div className={cx('quantity')}>
                <p>quantity:</p>
                <Input
                    type='number'
                    min={1} max={9}
                    className={cx('quantity')}
                    name='quantity'
                    value={quantity}
                    onChange={e => handleChange(e)}
                />
            </div>
            <div>
                <p>subtotal:</p>
                <p>{formatMoney(data.totalPrice)}</p>
            </div>
        </div>
    );
})

function TableProduct({
    thead,
    data,
    trMore,
    className,
    readOnly = false,
    status = false,
    couponValue,
    onRemove,
    onChange
}) {
    const classes = cx('table-product', {
        [className]: className
    }, 'table');
    const [mobileMode, setMobileMode] = useState(false);

    useWindowsResize(() => {
        if (window.matchMedia('(max-width: 800px)').matches) {
            setMobileMode(true);
            return;
        }
        setMobileMode(false);
    }, []);

    const handleRemove = useCallback(data => {
        onRemove && onRemove(data, couponValue);
    });

    return (
        <>{mobileMode
            ? <div className={cx('product')}>
                {data.map(item =>
                    <ItemProduct
                        data={item}
                        onRemove={handleRemove}
                        onChange={onChange}
                        couponValue={couponValue}
                        status={status}
                    />
                )}
            </div>
            : <table className={classes}>
                <thead>
                    {!mobileMode && <tr>
                        {thead.map((item, index) => <th key={index} colSpan={item.colSpan}><p>{item.title}</p></th>)}
                    </tr>}
                </thead>
                <tbody>
                    {data
                        && data.map(item => (
                            <Item
                                key={item.id}
                                data={item}
                                status={status}
                                value={item.quantity}
                                readOnly={readOnly}
                                onRemove={handleRemove}
                                onChange={onChange}
                                mobileMode={mobileMode}
                            />
                        ))}
                    {trMore && trMore}
                </tbody>
            </table>
        }</>
    );
}

export default TableProduct;