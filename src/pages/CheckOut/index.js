import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faInfo, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from './CheckOut.module.scss';
import Input from "~/components/Input";
import Button from "~/components/Button";
import CouponForm from "~/components/CouponForm";
import { CheckBox } from "~/components/CheckBox";
import { formatMoney } from "~/format";
import RadioButton from "~/components/RadioButton";
import { routes } from "~/config";
import { getService } from "~/services";
import ConfirmData from "~/components/ConfirmData";
import {
    doConfirmData,
    handleDiscount,
    handleFetchUserDataById
} from "~/constant/reduxContants";
import WoocommerceMessage from "~/components/WoocommerceMessage";
import TableProduct from "~/components/TableProduct";
import { clearMessage, setMessage } from "~/reducers/message";
import { setDataPayment } from "~/reducers/payment";
import { clearCoupon, setDataCoupon } from "~/reducers/coupon";

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

function CheckOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const coupon = useSelector(state => state.coupon);
    const message = useSelector(state => state.message);
    const cart = useSelector(state => state.cart);
    const checkoutDetail = useSelector(state => state.checkoutDetail);

    const [active, setActive] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);

    // fake user id
    const userId = 1;

    const formik = useFormik({
        initialValues: {
            id: 0,
            companyName: '',
            address: '',
            country: '',
            apartment: '',
            zipCode: '',
            city: '',
            addressOther: '',
            note: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            fullName: '',
            paymentMethodId: 1,
            userId: userId,
            bookingDate: '',
            phoneNumber: '',
            totalPrice: 0,
            coupon: '',
            couponId: 0,
            couponValue: 0,
            cart: [],
            payments: []
        },
        initialTouched: {
            companyName: false,
            country: false,
            apartment: false,
            zipCode: false,
            city: false,
            addressOther: false,
            note: false,
            firstName: false,
            lastName: false,
            address: false,
            phoneNumber: false,
            emailAddress: false
        },
        onSubmit: () => formik.values.cart.length > 0
            && setVisibleModalConfirm(!visibleModalConfirm),
        validationSchema: Yup.object({
            companyName: Yup.string()
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập tên công ty đúng định dạng(Không dùng ký tự đặc biệt)"),
            address: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập địa chỉ đúng định dạng(Không dùng ký tự đặc biệt)"),
            apartment: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập phòng đúng định dạng(Không dùng ký tự đặc biệt)"),
            zipCode: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập mã bưu điện đúng định dạng(Không dùng ký tự đặc biệt)"),
            city: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập thành phố đúng định dạng(Không dùng ký tự đặc biệt)"),
            phoneNumber: Yup.string()
                .required("Không được để trống!")
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/, "Vui lòng nhập số điện thoại có 10 số!"),
            emailAddress: Yup.string()
                .required("Không được để trống!")
                .matches(/^\S+@\S+\.\S+$/, "Vui lòng nhập địa chỉ email đúng định dạng(abc@xyz.def)"),
            country: Yup.string().required("Không được để trống!")
        }),
    });

    useEffect(() => {
        const getListPayment = async () => {
            const result = await getService('payments');
            dispatch(setDataPayment(result));

            return result;
        }

        const fetchCart = userId => {
            handleFetchUserDataById(dispatch, {
                userId: userId,
            });
        }

        const fetchData = async () => {
            const payments = await getListPayment();

            fetchCart(userId);

            formik.setFieldValue('payments', payments);
        }

        fetchData();
    }, []);

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            ...coupon,
            totalPrice: cart.totalPrice,
            cart: cart.cartItemsCurrent,
            ...checkoutDetail.information,
            couponId: coupon.id,
            checkoutDetailId: checkoutDetail.information.id
        });
    }, [cart, checkoutDetail.information, coupon]);

    const checkBoxInputs = [
        {
            className: 'first-name',
            fieldName: 'Tên:',
            value: formik.values.firstName,
            error: formik.errors.firstName,
            name: 'firstName',
            content: 'Tên',
            touched: formik.touched.firstName
        }, {
            className: 'last-name',
            fieldName: 'Họ:',
            value: formik.values.lastName,
            error: formik.errors.lastName,
            name: 'lastName',
            content: 'Họ',
            touched: formik.touched.lastName
        }, {
            className: false,
            fieldName: 'Tên công ty:',
            value: formik.values.companyName,
            error: formik.errors.companyName,
            name: 'companyName',
            content: 'Tên công ty',
            touched: formik.touched.companyName,
            optional: true
        }, {
            className: false,
            fieldName: 'Quốc gia/khu vực:',
            value: formik.values.country,
            error: formik.errors.country,
            name: 'country',
            content: 'Quốc gia/khu vực',
            touched: formik.touched.country
        }, {
            className: false,
            fieldName: 'Địa chỉ:',
            value: formik.values.address,
            error: formik.errors.address,
            name: 'address',
            content: 'Địa chỉ',
            touched: formik.touched.address
        }, {
            className: false,
            fieldName: '',
            value: formik.values.apartment,
            error: formik.errors.apartment,
            name: 'apartment',
            content: 'Apartment, suite, unit, etc. (optional)',
            touched: formik.touched.apartment,
            optional: true
        }, {
            className: false,
            fieldName: 'Mã bưu điện:',
            value: formik.values.zipCode,
            error: formik.errors.zipCode,
            name: 'zipCode',
            content: 'Mã bưu điện',
            touched: formik.touched.zipCode
        }, {
            className: false,
            fieldName: 'Tỉnh/thành phố:',
            value: formik.values.city,
            error: formik.errors.city,
            name: 'city',
            content: 'Tỉnh/thành phố',
            touched: formik.touched.city,
            optional: false
        }, {
            className: false,
            fieldName: 'Số điện thoại:',
            value: formik.values.phoneNumber,
            error: formik.errors.phoneNumber,
            name: 'phoneNumber',
            content: 'Số điện thoại',
            touched: formik.touched.phoneNumber
        }, {
            className: false,
            fieldName: 'Địa chỉ email:',
            value: formik.values.emailAddress,
            error: formik.errors.emailAddress,
            name: 'emailAddress',
            content: 'Địa chỉ email',
            touched: formik.touched.emailAddress
        }
    ];

    const confirmData = [
        {
            title: 'Họ tên',
            content: formik.values.fullName
        }, {
            title: 'Tên công ty',
            content: formik.values.companyName
        }, {
            title: 'Quốc gia',
            content: formik.values.country
        }, {
            title: 'Địa chỉ nhà',
            content: formik.values.address
        }, {
            title: 'Địa chỉ căn hộ, phòng',
            content: formik.values.apartment
        }, {
            title: 'Mã bưu điện',
            content: formik.values.zipCode
        }, {
            title: 'Số điện thoại',
            content: formik.values.phoneNumber
        }, {
            title: 'Địa chỉ email',
            content: formik.values.emailAddress
        }, {
            title: 'Ghi chú',
            content: formik.values.note
        }
    ];

    const confirmDataMore = [
        {
            title: 'Mã giảm giá',
            content: coupon.checked === true
                ? formik.values.couponCode : 'Không áp dụng'
        }, {
            title: 'Giảm giá',
            content: coupon.checked === true
                ? `${formik.values.couponValue}%` : '0%'
        }, {
            title: 'Tổng tiền',
            content: formatMoney(formik.values.totalPrice)
        }, {
            title: 'Phương thức thanh toán',
            content: formik.values.paymentMethodId === 1
                ? 'Thanh toán trực tuyến' : 'Thanh toán trực tiếp'
        }
    ];

    const handleApplyCoupon = useCallback((couponCode) => {
        setCouponCode('');

        if (coupon.checked) {
            dispatch(setMessage({
                message: 'Bạn đã dùng hết số lần giảm giá. Vui lòng tiến hành thanh toán hóa đơn!',
                status: 'fail'
            }));

            setActive(false);
            return;
        }

        handleDiscount(dispatch, {
            couponCode: couponCode,
            // fake user id
            userId: 1
        });
    }, [coupon]);

    const handleConfirmData = async data => {
        if (data.cart.length) {
            await doConfirmData(data, cart.cartItemsCurrent);

            dispatch(setMessage({
                message: '',
                status: '',
                actionMessage: null
            }));

            navigate('/cart');

            return;
        }
    }

    return (
        <div className={cx('woocommerce')}>
            <div className={cx('woocommerce__coupon')}>
                <div className={cx('coupon__icon')}>
                    <FontAwesomeIcon icon={faInfo} />
                </div>
                <p className={cx('coupon__content')}>Bạn có mã ưu đãi?</p>
                <span
                    className={cx('coupon__show')}
                    onClick={() => setActive(!active)}
                >
                    Ấn vào đây để nhập mã.
                </span>
            </div>
            <WoocommerceMessage data={{ message: message }} />
            <div className={cx('woocommerce__checkout-coupon', active && 'active')}>
                <div className={cx('checkout-coupon__form')}>
                    <div className={cx('checkout-coupon__form__label')}>
                        <p>Nếu bạn có phiếu giảm giá, vui lòng điền vào phía bên dưới.</p>
                    </div>
                    <CouponForm
                        value={couponCode}
                        className={'checkout-coupon__input'}
                        onChange={e => setCouponCode(e.target.value)}
                        handleSubmit={handleApplyCoupon}
                    />
                </div>
            </div >
            <form onSubmit={formik.handleSubmit} className={cx('woocommerce__checkout__form')}>
                <div className={cx('form__box')}>
                    <div className={cx('form__box__1')}>
                        <p>Thông tin thanh toán</p>
                        {checkBoxInputs.map((input, index) => (
                            <div
                                key={index}
                                className={cx(input.className)}
                            >
                                <Input
                                    required
                                    fieldName={input.fieldName}
                                    value={input.value}
                                    name={input.name}
                                    placeHolder={input.content}
                                    optional={input.optional && input.optional}
                                    error={input.error}
                                    onChange={formik.handleChange}
                                    onFocus={() => formik.setFieldTouched(`${input.name}`, true)}
                                    touched={input.touched}
                                    small={(input.className === 'first-name' || input.className === 'last-name') && true}
                                />
                            </div>
                        ))}
                    </div>
                    <div className={cx('form__box__2')}>
                        <CheckBox
                            data={{
                                title: 'Giao hàng tới địa chỉ khác'
                            }}
                            checked={formik.values.addressOther}
                            onChange={() => formik.setValues({
                                ...formik.values,
                                addressOther: !formik.values.addressOther
                            })}
                        />
                        <Input
                            type='textarea'
                            fieldName='Ghi chú đơn hàng:'
                            value={formik.values.note}
                            name='note'
                            placeHolder='Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn.'
                            optional={true}
                            onChange={formik.handleChange}
                        />
                    </div>
                </div>
                <div className={cx('form__product-box')}>
                    <div className={cx('product-box__heading')}>
                        <h3>Your order</h3>
                    </div>
                    <div className={cx('product-box__order')}>
                        <table className={cx('order__table', 'table')}>
                            <thead>
                                <tr>
                                    <td><h3>product</h3></td>
                                    <td><h3>subtotal</h3></td>
                                </tr>
                            </thead>
                            <tbody>
                                {formik.values.cart
                                    && formik.values.cart.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <span className={cx('title')}>{item.name}</span>
                                                <span className={cx('quantity')}> x {item.quantity}</span>
                                                <span className={cx('booking-date')}>Booking Date: {item.bookingDate}</span>
                                            </td>
                                            <td><span>{formatMoney(item.totalPrice)}</span></td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td><h3>Tổng</h3></td>
                                    <td>
                                        <p>{formik.values.cart
                                            && formatMoney(formik.values.cart.reduce((total, item) => {
                                                return parseInt(total) + parseInt(item.totalPrice);
                                            }, 0))}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><h3>Giảm giá</h3></td>
                                    <td><p>{`${formik.values.couponValue} %`}</p></td>
                                </tr>
                                <tr>
                                    <td><h3>giao hàng</h3></td>
                                    <td><p>Giao hàng miễn phí</p></td>
                                </tr>
                                <tr>
                                    <td><h3>total</h3></td>
                                    <td><p>{formatMoney(cart.totalPrice)}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('product-box__methods__payment')}>
                        <div className={cx('checkout-payment')}>
                            {formik.values.payments
                                && formik.values.payments.map(payment => (
                                    <div key={payment.id}>
                                        <RadioButton
                                            data={{
                                                title: payment.name
                                            }}
                                            checked={+formik.values.paymentMethodId === +payment.id && true}
                                            onChange={() => formik.setValues({
                                                ...formik.values,
                                                paymentMethodId: +payment.id
                                            })}
                                        />
                                        <div className={cx('payment-bacs', +formik.values.paymentMethodId === +payment.id && 'active')}>
                                            <p>Sau khi nhận được booking. Phong Nha Travel sẽ
                                                liên hệ với khách hàng để thực
                                                hiện xác nhận và đặt cọc tour.
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className={cx('place-order')}>
                            <p>
                                Phong Nha Travel cam kết bảo mật thông tin khách hàng,
                                thông tin bạn cung cấp sẽ được Phong Nha Travel sử
                                dụng để xử lý đơn đặt Tour. Vui lòng xem
                                <a target='_blank' rel="noreferrer" href={routes.Policy}> chính sách riêng tư.</a>
                            </p>
                            <div className={cx('box__place-order__button')}>
                                <Button
                                    type='submit'
                                    disable={!formik.values.cart.length > 0}
                                >
                                    Đặt hàng
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ConfirmData
                className={cx('woocommerce__confirm-data')}
                title='xác nhận thông tin đặt hàng'
                visible={visibleModalConfirm}
                setVisible={setVisibleModalConfirm}
                onConfirmClick={{
                    data: { ...formik.values, type: 'pay' },
                    destination: '/cart',
                    action: handleConfirmData
                }}
            >
                <div className={cx('confirm-data__infomation')}>
                    <div className={cx('tour__information__order')}>
                        <div className={cx('order__title')}>
                            <FontAwesomeIcon icon={faCartPlus} />
                            <p>Thông tin đơn hàng:</p>
                        </div>
                        <TableProduct
                            thead={thead}
                            data={formik.values.cart}
                            readOnly
                        />
                    </div>
                    <div className={cx('tour__information')}>
                        <div className={cx('tour__information__user')}>
                            <div className={cx('user__title')}>
                                <FontAwesomeIcon icon={faPerson} />
                                <p>Thông tin khách hàng:</p>
                            </div>
                            <div className={cx('user__content')}>
                                {confirmData.map((data, index) => (
                                    <div key={index} className={cx('content')}>
                                        <p>{data.title}: </p>
                                        <p>{data.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={cx('tour__information__ship')}>
                            <div className={cx('ship__title')}>
                                <FontAwesomeIcon icon={faCartPlus} />
                                <p>Thông tin thanh toán:</p>
                            </div>
                            <div className={cx('ship__content')}>
                                {confirmDataMore.map((data, index) => (
                                    <div key={index} className={cx('content')}>
                                        <p>{data.title}: </p>
                                        <p>{data.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ConfirmData>
        </div >
    )
}

export default CheckOut;