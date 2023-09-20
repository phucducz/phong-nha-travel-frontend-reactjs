import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-solid-svg-icons";

import { getService } from "~/services";
import styles from '~/components/CartPageStyles/CartPageStyle.scss';
import NoticeMessage from "~/components/NoticeMessage";
import DataView from "~/components/DataView";

const cx = classNames.bind(styles);

function CartPage() {
    const [tourBooked, setTourBooked] = useState([]);
    const [status, setStatus] = useState('');
    const [quantity, setQuantity] = useState(+1);
    const [contentMessage, setContentMessage] = useState({
        status: null,
        icon: "",
        messagePrimary: "",
        messageSub: ""
    });

    const [payload, setPayload] = useState({});

    const [tourId, setTourId] = useState();
    const [statusNotice, setStatusNotice] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getService('bookedDetails', {
                userId: 1,
            });
            setTourBooked(res);
            setStatus('');
        }

        fetchAPI();
    }, [status]);

    const handleOnlick = (id) => {
        const option = {
            tableName: 'booke_details',
            quantity: quantity,
            bookedTourId: id
        };

        const fetchAPI = async () => {
            // const res = await postService.post('update', option);

            // setStatus('update success!');
        }

        fetchAPI();
    }

    const confirmDelete = (tourId) => {
        setStatusNotice(true);
        setTourId(tourId);
        setContentMessage({
            status: +0,
            icon: <i className="fa-solid fa-face-smile"></i>,
            messagePrimary: "Bạn có chắc muốn hủy bỏ chuyến du lịch này không!",
            messageSub: ""
        });
    }

    return (
        <div className={cx("container-product")}>
            <div className={cx("product-box")}>
                <div className={cx("product-box_title")}>
                    <div style={{ width: '55.1rem' }}>
                        <h3>Sản phẩm</h3>
                    </div>
                    <h3>Giá</h3>
                    <h3>Số lượng</h3>
                    <h3 style={{ width: '9rem' }}>Tổng</h3>
                </div>
                {tourBooked.length != 0 &&
                    tourBooked.map((tour, index) => {
                        return (
                            <DataView
                                key={index}
                                index={index}
                            >
                                <div className={cx("item_name")}>
                                    <FontAwesomeIcon
                                        icon={faRectangleXmark}
                                        className="fa-rectangle-xmark"
                                        onClick={() => confirmDelete(tour.bookDetailId)}
                                    />
                                    <img src={tour.image} />
                                    <div>
                                        <Link className={cx("link-name")}><h3>{tour.name}</h3></Link>
                                        <p>Booking Date: {tour.bookDate}</p>
                                    </div>
                                </div>
                                <div className={cx("item_price")}><h3>{tour.price} <Link className={cx("link")}>đ</Link></h3></div>
                                <div className={cx("item_quantity")}>
                                    <input
                                        readOnly
                                        type='text'
                                        name='quantity'
                                        value={quantity}
                                    />
                                </div>
                                <div className={cx("item_total")}>
                                    <h3>{tour.quantity * tour.price} <Link className={cx("link")}>đ</Link></h3>
                                    <i
                                        id={tour.bookDetailId}
                                        style={{ paddingLeft: '2rem' }}
                                        className={cx("fa-solid fa-pen-to-square")}
                                        onClick={() => handleOnlick(tour.bookDetailId)}
                                    ></i>
                                </div>
                            </DataView>
                        )
                    })}
                <div className={cx("product-action")}>
                    <div className={cx("product-box_coupon")}>
                        <input
                            className={cx("inputCoupon")}
                            type='text'
                            placeholder="Coupon code"
                        />
                        <p>Mã giảm giá:</p>
                        <button
                            className={cx("buttonCoupon")}
                            type='text'
                        >
                            <h3>Áp dụng</h3>
                        </button>
                    </div>
                </div>
            </div>
            <NoticeMessage
                message={contentMessage}
                setActive={{
                    setStatusNotice,
                    statusNotice,
                    setStatus
                }}
                action="delete"
                payload={+tourId}
            />
        </div>
    )
}

export default CartPage;