import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

import style from './ProductBox.module.scss';
import CouponForm from "../CouponForm";
import TableProduct from "../TableProduct";
import WoocommerceMessage from "../WoocommerceMessage";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);

function ProductBox({
    data,
    thead,
    scrollY,
    className,
    onApply,
    onChangeItem,
    onRemoveItem,
}) {
    const classes = cx('product-box', {
        [className]: className,
    });

    const dispatch = useDispatch();

    const couponRef = useRef();
    const [coupon, setCoupon] = useState('');
    const [dataTable, setDataTable] = useState([]);

    const handleApplyClick = () => {
        const { checked, couponValue } = data.coupon;

        setCoupon('');
        onApply && onApply(coupon, {
            checked: checked,
            couponValue: couponValue
        });
    }

    useEffect(() => {
        setDataTable([
            {
                id: 0,
                data: data.cartPaid,
                status: true,
                className: 'mb-0',
                classScroll: [
                    'product-box__scroll',
                    data.cartPaid.length > 4
                        ? `product-box__scroll__${scrollY}`
                        : `product-box__scroll__${data.cartPaid.length}`
                ],
                message: {
                    message: 'Bạn chưa thanh toán sản phẩm nào trong giỏ hàng!',
                    status: 'fail'
                }
            }, {
                id: 1,
                data: data.cartCurrent,
                status: false,
                className: '',
                classScroll: [
                    'product-box__scroll',
                    data.cartCurrent.length > 4
                        ? `product-box__scroll__${scrollY}`
                        : `product-box__scroll__${data.cartCurrent.length}`
                ],
                message: {
                    message: 'Chưa có sản phẩm nào trong giỏ hàng!',
                    status: 'fail'
                }
            }
        ]);
    }, [data]);

    return (
        dataTable.map(item => (
            <div key={item.id} className={classes}>
                {Object.keys(item.data).length > 0
                    ? <div className={cx(item.classScroll, item.status && 'none-action')}>
                        <TableProduct   
                            thead={thead}
                            data={item.data}
                            status={item.status}
                            trMore={
                                !item.status && <tr className={cx(scrollY && 'footer')}>
                                    <td colSpan={6}>
                                        <CouponForm
                                            small
                                            value={coupon}
                                            ref={couponRef}
                                            onChange={e => setCoupon(e.target.value)}
                                            handleSubmit={handleApplyClick}
                                        />
                                    </td>
                                </tr>
                            }
                            dispatch={dispatch}
                            couponValue={data.coupon.couponValue}
                            onChange={onChangeItem}
                            onRemove={onRemoveItem}
                        />
                    </div>
                    :
                    <div className={cx('woocommerce__return')}>
                        <WoocommerceMessage
                            className={cx('woocommerce__return__message', item.className)}
                            data={{ message: item.message }}
                        />
                        {!item.status
                            && <Button Button
                                to='/'
                                leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
                                className={cx('woocommerce_return_button', 'button')}
                            >
                                trở về trang chính
                            </Button>
                        }
                    </div>
                }
            </div >
        ))
    )
}

export default ProductBox;