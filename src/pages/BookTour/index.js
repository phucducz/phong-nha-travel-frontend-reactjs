import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import * as Yup from "yup";

import style from "~/components/BookTourStyles/BookTourStyle.scss";
import { postService, getService } from "~/services";
import * as StateBook from "~/components/State/StateBook.js";
import ModalMessage from "~/components/ModalMessage";
import ErrorStyles from "~/components/ErrorStyles";
import UpdateTourBooked from "~/components/UpdateTourBooked";
import NoticeMessage from "~/components/NoticeMessage";
import { formatMoney } from "~/format";

const cx = classNames.bind(style);

function BookTour() {
    const [tour, setTour] = useState({});
    const { results, paymentMethod, checkout } = StateBook;
    const [status, setStatus] = useState('');
    const { tourId } = useParams();
    const [contentMessage, setContentMessage] = useState({
        status: null,
        icon: "",
        messagePrimary: "",
        messageSub: ""
    });
    const [statusNotice, setStatusNotice] = useState(false);

    // //state form coupon
    const [dataCoupon, setDataCoupon] = useState({});
    const [codeCoupon, setCodeCoupon] = useState('');
    const [checkCoupon, setCheckCoupon] = useState();
    const [resultCoupon, setResultCoupon] = useState('');
    const [couponStatus, setCouponStatus] = useState('');
    const [resultChecked, setResultChecked] = useState({
        data: {},
        message: '',
        status: +0
    });
    const divCoupon = useRef();

    //state form order
    const [active, setActive] = useState(false);
    const radioBank = useState(true);
    const [checkRadio, setCheckRadio] = useState(true);

    //state form checkout
    const [activeConfirm, setActiveConfirm] = useState('none_active');

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            nameCompany: "",
            country: "",
            phoneNumber: "",
            city: "",
            postOffice: "",
            address: "",
            apartment: "",
            email: "",
            note: "",
            bookDate: "",
            quantity: "",
        },

        onSubmit: () => {
            modalMessage.current.style.display = "block";
            setTimeout(() => {
                setActiveConfirm('active');
            }, 200);
        },

        validationSchema: Yup.object({
            firstName: Yup.string()
                .required("Không được để trống!")
                .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/, "Vui lòng nhập họ là chữ và có ít nhất 4 ký tự!"),
            lastName: Yup.string()
                .required("Không được để trống!")
                .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/, "Vui lòng nhập tên là chữ và có ít nhất 4 ký tự!"),
            nameCompany: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập tên công ty đúng định dạng(Không dùng ký tự đặc biệt)"),
            address: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập địa chỉ đúng định dạng(Không dùng ký tự đặc biệt)"),
            apartment: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập phòng đúng định dạng(Không dùng ký tự đặc biệt)"),
            postOffice: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập mã bưu điện đúng định dạng(Không dùng ký tự đặc biệt)"),
            city: Yup.string()
                .required("Không được để trống!")
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập thành phố đúng định dạng(Không dùng ký tự đặc biệt)"),
            phoneNumber: Yup.string()
                .required("Không được để trống!")
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, "Vui lòng nhập số điện thoại đúng định dạng(###-###-####)"),
            email: Yup.string()
                .required("Không được để trống!")
                .matches(/^\S+@\S+\.\S+$/, "Vui lòng nhập địa chỉ email đúng định dạng(abc@xyz.def)"),
            bookDate: Yup.string()
                .required("Không được để trống!")
                .matches("", "Vui lòng nhập đúng định dạng(mm/dd/yyyy)"),
            quantity: Yup.string()
                .required("Không được để trống!")
                .matches(/^0*(\d{1,9})$/, "Vui lòng nhập số lượng là số nguyên!")
        })
    });

    const [totalPrice, setTotalPrice] = useState();
    const [priceCoupon, setPriceCoupon] = useState(+0);
    const [information, setInformation] = useState({});
    const [payload, setPayload] = useState({});

    //ref input checkout
    const inputs = useRef({
        inputFirstName: "",
        inputAddress: "",
        inputCity: "",
        inputCompany: "",
        inputCountry: "",
        inputEmail: "",
        inputApartment: "",
        inputLastName: "",
        inputPostOffice: "",
        inputPhoneNumber: "",
        inputCoupon: "",
        inputBookDate: "",
        inputQuantity: "",
    });

    const inputCoupon = useRef();
    const modalMessage = useRef();
    const coupon = useRef();
    const contentBank = useRef();
    const contentOffice = useRef();
    const btnAccept = useRef();

    const handleActiveForm = () => {
        setActive(!active);
    }

    useEffect(() => {
        const fetchTour = async () => {
            const result = await getService('tours', tourId);
            setTour(result);
            setTotalPrice(result.price);
        }

        const fetchCoupon = async () => {
            const result = await getService('coupons');
            setDataCoupon(result);
        }

        const fetchData = () => {
            fetchTour();
            fetchCoupon();
        }

        fetchData();
    }, []);

    useEffect(() => {
        active == true ? coupon.current.style.height = '16.5rem'
            : coupon.current.style.height = '0';
        inputCoupon.current.focus();
    }, [active]);

    useEffect(() => {
        if (checkRadio == true) {
            contentBank.current.style.height = '4rem';
            contentOffice.current.style.height = '0';
        }
        else {
            contentOffice.current.style.height = '4rem';
            contentBank.current.style.height = '0';
        }
    }, [checkRadio]);

    const handleSubmitCoupon = (e) => {
        e.preventDefault();

        setResultCoupon(codeCoupon);

        const fetchCoupon = async () => {
            const result = await getService('coupons', {
                code: codeCoupon
            });

            setResultChecked(result);
        }

        fetchCoupon();
        setCouponStatus('coupon_active');
        setCodeCoupon('');

        inputCoupon.current.focus();
    }

    useEffect(() => {
        setInformation(formik.values);
    }, [formik.values]);

    useEffect(() => {
        setTotalPrice(tour.price * formik.values.quantity);
    }, [formik.values.quantity]);

    useEffect(() => {
        const { data } = resultChecked;

        resultChecked.status !== 0 ? setPriceCoupon(() =>
            totalPrice - totalPrice * +data.value / 100
        ) : setPriceCoupon(totalPrice);
    }, [totalPrice, resultChecked]);

    useEffect(() => {
        const { data } = resultChecked;

        const payMentId = checkRadio === true ? 1 : 2;
        var couponId;

        if (data != null) {
            setCheckCoupon(1);

            if (resultChecked.status === 0)
                couponId = "null";
            else
                couponId = data.id;
        }
        else {
            setCheckCoupon(0);
            couponId = "null";
        }

        setPayload({
            action: 'insert',
            ...information,
            tourId: +tourId,
            userId: 1,
            payMentId: payMentId,
            couponId: couponId
        });
    }, [information, resultChecked]);

    const handleSubmit = () => {
        const bookTour = async () => {
            const res = await postService("bookedDetails", payload);
            setStatus(res);
        }

        const action = () => {
            bookTour();
            setStatusNotice(true);
        }

        action();
    }

    useEffect(() => {
        if (status)
            status.status === 1
                ? setContentMessage({
                    status: +1,
                    icon: <i className="fa-solid fa-face-smile"></i>,
                    messagePrimary: "đặt tuor thành công !",
                    messageSub: "Hãy kiểm tra giỏ hàng của bạn"
                })
                : setContentMessage({
                    status: +0,
                    icon: <i className="fa-solid fa-face-smile"></i>,
                    messagePrimary: "opps, có lỗi xảy ra",
                    messageSub: "Vui lòng kiểm tra lại thông tin của bạn",
                })
    }, [status]);

    return (
        <>
            <div style={{ marginTop: '13rem' }} className={cx("woocommerce")}>
                <div className={cx("woocommerce_notice")}>
                    <FontAwesomeIcon className={cx('icon_info')} icon={faInfo} />
                    <p>Bạn có mã ưu đãi?</p>
                    <Link
                        className={cx("link")}
                        onClick={handleActiveForm}
                    >Ấn vào đây để nhập mã</Link>
                </div>
                <div className={cx("woommerce_coupon")}>
                    <div className={cx(`check_coupon check-${couponStatus}`)}>
                        {results.map(result => {
                            const { data, value } = resultChecked;

                            return (
                                checkCoupon == result.status &&
                                <div
                                    key={result.status}
                                    ref={divCoupon}
                                    className={cx(checkCoupon == result.status && `${result.className} ${couponStatus}`)}
                                >
                                    {result.i}
                                    {data === null ? <p>Mã giảm giá " {resultCoupon} " không tồn tại!</p>
                                        : <p>Chúc mừng bạn được <span style={{
                                            color: '#2980B9',
                                            fontSize: '1.3rem',
                                            textTransform: 'uppercase'
                                        }}>giảm giá {data.value} %</span> tất cả các Tuor bạn đã đặt</p>}
                                </div>
                            )
                        })}
                    </div>
                    <div
                        ref={coupon}
                        className={cx("status-active")}
                    >
                        <div className={cx("woocommerce_coupon")}>
                            <p>Nếu bạn có mã giảm giá, vui lòng điền vào phía bên dưới.</p>
                            <form
                            >
                                <div className={cx("divInput")}>
                                    <label
                                    >Mã ưu đãi</label>
                                    <input
                                        ref={inputCoupon}
                                        value={codeCoupon}
                                        type='text'
                                        className={cx("inputCoupon")}
                                        onChange={(e) => setCodeCoupon(e.target.value)}
                                    />
                                </div>
                                <input
                                    type='submit'
                                    value='ÁP DỤNG'
                                    className={cx('inputApply')}
                                    onClick={e => handleSubmitCoupon(e)}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <form
                className={cx("checkout-box")}
                onSubmit={formik.handleSubmit}
            >
                <div className={cx("payment-info")}>
                    <div className={cx("box_fill-info")}>
                        <h3>Thông tin thanh toán</h3>
                        <table>
                            <ErrorStyles>
                                <tbody>
                                    <tr>
                                        <tr>
                                            <td>
                                                <label>
                                                    Tên
                                                    <abbr title="Thông tin bắt buộc">*</abbr>
                                                </label>
                                            </td>
                                            <td>
                                                <label>
                                                    Họ
                                                    <abbr title="Thông tin bắt buộc">*</abbr>
                                                </label>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div
                                                    className={cx(`divInput ${formik.errors.firstName && 'error'}`)}
                                                    style={{ width: '23.3rem' }}
                                                >
                                                    <input
                                                        required
                                                        name="firstName"
                                                        value={formik.values.firstName}
                                                        ref={inputs.firstName}
                                                        className={cx("firstName")}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <label
                                                    >Tên</label>
                                                </div>
                                                {formik.errors.firstName === undefined
                                                    ? <p className={cx("inputMessage")}></p>
                                                    : <p className={cx("inputMessage")}>{formik.errors.firstName}</p>
                                                }
                                            </td>
                                            <td>
                                                <div
                                                    className={cx(`divInput ${formik.errors.lastName && 'error'}`)}
                                                    style={{ width: '23.3rem' }}
                                                >
                                                    <input
                                                        required
                                                        name="lastName"
                                                        value={formik.values.lastName}
                                                        onChange={formik.handleChange}
                                                        ref={inputs.lastName}
                                                        className={cx("lastName")}
                                                    />
                                                    <label
                                                    >Họ</label>
                                                </div>
                                                {formik.errors.lastName === undefined
                                                    ? <p className={cx("inputMessage")}></p>
                                                    : <p className={cx("inputMessage")}>{formik.errors.lastName}</p>
                                                }
                                            </td>
                                        </tr>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Tên công ty
                                                <span>(Không bắt buộc)</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.nameCompany && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem' }}
                                                    name="nameCompany"
                                                    value={formik.values.nameCompany}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.nameCompany}
                                                    className={cx("nameCompany")}
                                                />
                                                <label
                                                >Tên công ty</label>
                                            </div>
                                            {formik.errors.nameCompany === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.nameCompany}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label
                                            >
                                                Quốc gia/Khu vực
                                                <abbr title="Thông tin bắt buộc">*</abbr>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.country && 'error'}`)}>
                                                <select
                                                    name="country"
                                                    value={formik.values.country}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.country}
                                                    className={cx("country")}
                                                    style={{
                                                        width: '46.6rem',
                                                        height: '4.5rem',
                                                        fontSize: '1.3rem'
                                                    }}
                                                >
                                                    <option>Việt Nam</option>
                                                    <option>Mỹ</option>
                                                </select>
                                            </div>
                                            {formik.errors.country === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.country}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Địa chỉ
                                                <abbr title="Thông tin bắt buộc">*</abbr>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.address && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem', marginBottom: '1rem' }}
                                                    name="address"
                                                    value={formik.values.address}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.address}
                                                    className={cx("address")}
                                                />
                                                <label
                                                >Địa chỉ</label>
                                            </div>
                                            {formik.errors.address === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.address}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.apartment && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem' }}
                                                    name="apartment"
                                                    value={formik.values.apartment}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.apartment}
                                                    className={cx("apartment")}
                                                />
                                                <label
                                                >Địa chỉ căn hộ, phòng...</label>
                                            </div>
                                            {formik.errors.apartment === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.apartment}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <label>
                                                Mã bưu điện
                                                <span>(tùy chọn)</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.postOffice && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem' }}
                                                    name="postOffice"
                                                    value={formik.values.postOffice}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.postOffice}
                                                    className={cx("postOffice")}
                                                />
                                                <label
                                                >Mã bưu điện</label>
                                            </div>
                                            {formik.errors.postOffice === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.postOffice}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <td>
                                                <label>
                                                    Tỉnh / Thành phố
                                                    <abbr title="Thông tin bắt buộc">*</abbr>
                                                </label>
                                            </td>
                                            <tr>
                                                <td>
                                                    <div className={cx(`divInput ${formik.errors.city && 'error'}`)}>
                                                        <input
                                                            required
                                                            style={{ width: '46.6rem' }}
                                                            name="city"
                                                            value={formik.values.city}
                                                            onChange={formik.handleChange}
                                                            ref={inputs.city}
                                                            className={cx("city")}
                                                        />
                                                        <label
                                                        >Tỉnh / Thành phố</label>
                                                    </div>
                                                    {formik.errors.city === undefined
                                                        ? <p className={cx("inputMessage")}></p>
                                                        : <p className={cx("inputMessage")}>{formik.errors.city}</p>
                                                    }
                                                </td>
                                            </tr>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Số điện thoại
                                                <abbr title="Thông tin bắt buộc">*</abbr>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.phoneNumber && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem' }}
                                                    name="phoneNumber"
                                                    value={formik.values.phoneNumber}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.phoneNumber}
                                                    className={cx("phoneNumber")}
                                                />
                                                <label
                                                >Số điện thoại</label>
                                            </div>
                                            {formik.errors.phoneNumber === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.phoneNumber}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Địa chỉ email
                                                <abbr title="Thông tin bắt buộc">*</abbr>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.email && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem' }}
                                                    name="email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.email}
                                                    className={cx("email")}
                                                />
                                                <label
                                                >Địa chỉ email</label>
                                            </div>
                                            {formik.errors.email === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.email}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Đặt ngày đi:
                                                <abbr title="Thông tin bắt buộc">*</abbr>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.bookDate && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem' }}
                                                    type="date"
                                                    name="bookDate"
                                                    value={formik.values.bookDate}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.book_date}
                                                    className={cx("book_date")}
                                                />
                                            </div>
                                            {formik.errors.bookDate === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.bookDate}</p>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label>
                                                Số người đi:
                                                <abbr title="Thông tin bắt buộc">*</abbr>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className={cx(`divInput ${formik.errors.quantity && 'error'}`)}>
                                                <input
                                                    required
                                                    style={{ width: '46.6rem' }}
                                                    name="quantity"
                                                    value={formik.values.quantity}
                                                    onChange={formik.handleChange}
                                                    ref={inputs.quantity}
                                                    className={cx("quantity")}
                                                />
                                                <label
                                                > Số người đi:</label>
                                            </div>
                                            {formik.errors.quantity === undefined
                                                ? <p className={cx("inputMessage")}></p>
                                                : <p className={cx("inputMessage")}>{formik.errors.quantity}</p>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </ErrorStyles>
                        </table>
                    </div>
                    <div className={cx("box_note")}>
                        <p>Ghi chú đơn hàng (tuỳ chọn)</p>
                        <textarea
                            className={cx("note")}
                            name="note"
                            value={formik.values.note}
                            onChange={formik.handleChange}
                            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                            rows={2} cols={5}
                            style={{
                                width: '48rem',
                                height: '20rem',
                                paddingLeft: '2rem'
                            }}
                        >
                        </textarea>
                    </div>
                </div>
                <div className={cx("order_infomation")}>
                    <h3 className={cx("infomation_title")}>Your order</h3>
                    <table className={cx("infomation_product")}>
                        <td><p>Sản phẩm</p></td>
                        <td><p>Tổng</p></td>
                        <tr>
                            <td>
                                <p>{tour.name}</p>
                                <p>Ngày đặt lịch: {information.bookDate}</p>
                            </td>
                            <td><p>{formatMoney(tour.price)}</p></td>
                        </tr>
                        <tr className={cx("infomation_total")}>
                            <td><p>Tổng</p></td>
                            <td><p>{formatMoney(totalPrice)}</p></td>
                        </tr>
                        <tr className={cx("infomation_total")}>
                            <td><p>Giảm giá</p></td>
                            <td><p>{resultChecked.data !== null
                                ? resultChecked.data.value
                                : 0
                            }%</p></td>
                        </tr>
                        <tr className={cx("infomation_total")}>
                            <td><p>Tổng</p></td>
                            <td><p className={cx("price_coupon")}>{formatMoney(priceCoupon)}</p></td>
                        </tr>
                    </table>
                    <div className={cx("choose_payment")}>
                        <div className={cx("choose_payment_bank")}>
                            <div className={cx("input")}>
                                <input
                                    ref={inputs.
                                        type}
                                    id="raido-bank"
                                    type='radio'
                                    value={radioBank}
                                    name='checkPayment'
                                    defaultChecked='true'
                                    onChange={() => setCheckRadio(!checkRadio)}
                                />
                                <label htmlFor="raido-bank">Chuyển khoản ngân hàng</label>
                            </div>
                            <div
                                className={cx("content")}
                                ref={contentBank}
                            >
                                <p>Sau khi nhận được booking. Phong Nha Travel sẽ liên hệ với khách hàng để thực
                                    hiện xác nhận và đặt cọc tour.</p>
                            </div>
                        </div>
                        <br />
                        <div className={cx("choose_payment_office")}>
                            <div className={cx("input")}>
                                <input
                                    id="radio-office"
                                    type='radio'
                                    value='Tiền mặt tại văn phòng'
                                    name='checkPayment'
                                    onChange={() => setCheckRadio(!checkRadio)}
                                />
                                <label htmlFor="radio-office">Tiền mặt tại văn phòng</label>
                            </div>
                            <div
                                className={cx("content")}
                                ref={contentOffice}
                            >
                                <p>Sau khi nhận được booking. Phong Nha Travel sẽ liên hệ với khách hàng để thực
                                    hiện xác nhận và đặt cọc tour.</p>
                            </div>
                        </div>
                        <div className={cx("policy")}>
                            <p>Phong Nha Travel cam kết bảo mật thông tin khách hàng, thông tin bạn cung cấp sẽ được
                                Phong Nha Travel sử dụng để xử lý đơn đặt Tour. Vui lòng xem
                                <Link className={cx("link")}>chính sách riêng tư.</Link>
                            </p>
                        </div>
                        <div className={cx("divOrder")}>
                            <input
                                ref={btnAccept}
                                className={cx(`buttonOrder`)}
                                type='submit'
                                value="Đặt hàng"
                            />
                        </div>
                    </div>
                </div>
            </form >
            <ModalMessage>
                <div
                    ref={modalMessage}
                    className={cx(`wrap ${activeConfirm}`)}
                >
                    <div className={cx("message")}>
                        <div className={cx("message_title")}>
                            <h3>Xác nhận thông tin đặt hàng</h3>
                        </div>
                        <div className={cx("message_content")}>
                            <div className={cx("container_product")}>
                                <div className={cx("product_image")}>
                                    <img src={tour.image} alt={tour.name} />
                                </div>
                                <div className={cx("product_description")}>
                                    <div className={cx('title')}>
                                        <p className={cx('title_name')}>{tour.name}</p>
                                        <p className={cx('title_quantity')}>Số lượng: {payload.quantity}</p>
                                    </div>
                                    <p className={cx('product_description_price')}>{formatMoney(tour.price * payload.quantity)}</p>
                                    <ul>
                                        <li><p className={cx('product_description_desc')}>{tour.description}</p></li>
                                        <li><p className={cx('product_description_title')}>{tour.title}</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={cx("container_payment")}>
                                <div className={cx("payment_title")}>
                                    <i style={{ color: 'black' }} className="fa-solid fa-cart-shopping"></i>
                                    <h3>Phương thức thanh toán</h3>
                                </div>
                                <div className={cx("payment_methods")}>
                                    {paymentMethod.map(payment => (
                                        <div className={cx(checkRadio === payment.status ? "payment-method payment_active"
                                            : "payment-method")}
                                            onClick={() => setCheckRadio(payment.status)}
                                        >
                                            {payment.i}
                                            {payment.content}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <UpdateTourBooked
                                action='read'
                                content={{
                                    payload,
                                    resultCoupon,
                                    priceCoupon
                                }}
                            />
                        </div>
                        <div className={cx("message_button")}>
                            <button
                                onClick={() => {
                                    setActiveConfirm('');
                                    setStatusNotice(false);
                                    setTimeout(() => {
                                        modalMessage.current.style.display = "none";
                                    }, 500);
                                }}
                            >
                                Thoát</button>
                            <button
                                onClick={() => handleSubmit()}
                            >
                                Đồng ý
                            </button>
                        </div>
                    </div>
                </div>
            </ModalMessage>
            <NoticeMessage
                message={contentMessage}
                setActive={{
                    setActiveConfirm,
                    modalMessage,
                    setStatusNotice,
                    statusNotice
                }}
            />
        </>
    )
}

export default BookTour;