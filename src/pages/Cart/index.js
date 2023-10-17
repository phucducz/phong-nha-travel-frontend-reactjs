import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from './CartStyle.module.scss';
import { formatMoney } from "~/format";
import Input from "~/components/Input";
import Button from "~/components/Button";
import ProductBox from "~/components/ProductBox";
import WoocommerceMessage from "~/components/WoocommerceMessage";
import { routes } from "~/config";
import {
    doRemoveCartItem,
    doRestoreCartItem,
    handleDiscount,
    handleFetchUserDataById
} from "~/constant/reduxContants";
import {
    restoreCartItem,
    setCartItemsCurrent,
    setPriceCartItem
} from "~/reducers/cart";
import { clearMessage, setMessage } from "~/reducers/message";

const cx = classNames.bind(style);

const thead = [
    {
        title: 'product',
        colSpan: 3
    }, {
        title: 'price',
        colSpan: 1
    }, {
        title: 'quantity',
        colSpan: 1
    }, {
        title: 'subtotal',
        colSpan: 1
    }
];

function Cart() {
    const dispatch = useDispatch();

    const coupon = useSelector(state => state.coupon);
    const message = useSelector(state => state.message);
    
    const { dataCart, totalPrice, cartItemsPaid,
        activeCoupon, cartItemsDeleted, cartItemsCurrent
    } = useSelector(state => state.cart);

    const [activeShipping, setActiveShipping] = useState(false);

    // fake user id
    const userId = 1;
    
    useEffect(() => {
        const fetchCart = userId => {
            handleFetchUserDataById(dispatch, {
                userId: userId,
            });
        }

        fetchCart(userId);
    }, []);

    const handleApplyCoupon = useCallback((couponCode, dataCoupon) => {
        dispatch(restoreCartItem({
            type: 'reset',
            couponValue: dataCoupon.couponValue
        }));

        if (dataCoupon.checked) {
            dispatch(setMessage({
                message: 'Bạn đã dùng hết số lần giảm giá. Vui lòng tiến hành thanh toán hóa đơn!',
                status: 'fail'
            }));

            return;
        }

        handleDiscount(dispatch, {
            couponCode: couponCode,
            // fake user id
            userId: 1
        });
    }, []);

    const handleChangeQuantity = useCallback((id, quantity, couponValue) => {
        dispatch(setPriceCartItem({
            id: id,
            quantity: parseInt(quantity),
            coupon: couponValue
        }));
    }, []);

    const handleRemoveItem = useCallback((data, couponValue) => {
        doRemoveCartItem(dispatch, {
            data: data,
            coupon: couponValue
        });
    }, []);

    const handleRestoreCartItem = useCallback((data, couponValue, itemRemoved) => {
        // fake user id
        let userId = 1;
        doRestoreCartItem(dispatch, {
            data: data,
            userId: userId,
            couponValue: couponValue,
            itemRemoved: itemRemoved
        });
    }, []);

    useEffect(() => {
        let data = dataCart.filter(item => !item.checkout || item.checkout.status === 'unpaid' || item.checkout.date === null);

        dispatch(setCartItemsCurrent({
            cartCurrent: data,
            coupon: coupon
        }));
    }, [dataCart]);

    return (
        <div className={cx('woocommerce')}>
            {cartItemsDeleted.length > 0
                ? cartItemsDeleted.map(item => (
                    <WoocommerceMessage
                        key={item.id}
                        data={{
                            message: message,
                            coupon: coupon,
                            item: item,
                            itemRemoved: cartItemsDeleted
                        }}
                        action={handleRestoreCartItem}
                    />
                ))
                : <WoocommerceMessage
                    data={{ message: message }}
                    action={handleRestoreCartItem}
                />
            }
            <ProductBox
                data={{
                    cart: dataCart,
                    coupon: coupon,
                    cartPaid: cartItemsPaid,
                    cartCurrent: cartItemsCurrent
                }}
                className={cx('box-shadow', 'woocommerce__product-box')}
                thead={thead}
                scrollY={5}
                onChangeItem={handleChangeQuantity}
                onRemoveItem={handleRemoveItem}
                onApply={handleApplyCoupon}
            />
            <div className={cx('cart-collaterals')}>
                <div className={cx('cart_collaterals__total')}>
                    <h3>cart totals</h3>
                    <div className={cx('cart-collaterals__product', 'box-shadow')}>
                        <table className={cx('table')}>
                            <tbody>
                                <tr className={cx('height-auto')}>
                                    <td className={cx('header', 'padding__1-2')}>
                                        <p>subtotal</p>
                                    </td>
                                    <td>
                                        <p>
                                            {formatMoney(cartItemsCurrent.reduce((total, item) => {
                                                return parseInt(total) + parseInt(item.totalPrice);
                                            }, 0))}
                                        </p>
                                    </td>
                                </tr>
                                <tr className={cx('height-auto')}>
                                    <td className={cx('header', 'header-shipping')}>
                                        <p>giao hàng</p>
                                    </td>
                                    <td>
                                        <p className={cx('padding-none')}>Giao hàng miễn phí</p>
                                        <p className={cx('padding-none')}>Vận chuyển đến Đồng Tháp.</p>
                                        <p className={cx('change-address', 'padding-none')}>
                                            <span onClick={() => setActiveShipping(!activeShipping)}>Đổi địa chỉ</span>
                                            <span><FontAwesomeIcon icon={faTruck} /></span>
                                        </p>
                                        <div className={cx('shipping-calculator', activeShipping && 'active')}>
                                            <Input
                                                small
                                                required
                                                value=''
                                                name=''
                                                placeHolder='Thành phố'
                                                onChange={() => { }}
                                            />
                                            <Input
                                                small
                                                required
                                                value=''
                                                name=''
                                                placeHolder='Mã bưu điện'
                                                onChange={() => { }}
                                            />
                                            <Button>cập nhật</Button>
                                        </div>
                                    </td>
                                </tr>
                                {activeCoupon && coupon.id
                                    && <tr className={cx('height-auto')}>
                                        <td className={cx('header')}>
                                            <p>giảm giá</p>
                                        </td>
                                        <td>
                                            <p>{coupon.couponValue}%</p>
                                        </td>
                                    </tr>
                                }
                                <tr className={cx('height-auto')}>
                                    <td className={cx('header')}>
                                        <p>total</p>
                                    </td>
                                    <td>
                                        <p>{formatMoney(totalPrice)}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <Button
                            to={routes.CheckOut}
                            className={cx('cart-collaterals__product__button')}>
                            tiến hành thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;