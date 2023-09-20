import classNames from 'classnames/bind';
import style from './UpdateStyle.scss';

const cx = classNames.bind(style);

function UpdateTourBooked(props) {
    const { content, action } = props;

    const { payload } = content;

    return (
        <div className={cx('wrapper')}>
            <div className={cx("personal_information")}>
                {action === 'read'
                    ? <>
                        <div className={cx('user')}>
                            <div className={cx("personal_information_title")}>
                                <i className="fa-solid fa-person"></i>
                                <h3>Thông tin người dùng</h3>
                            </div>
                            <div className={cx('personal_information_user')}>
                                <div className={cx('information_user')}>
                                    <div className="user_content">
                                        <p>{payload.lastName} {payload.firstName}</p>
                                        <p>{payload.nameCompany}</p>
                                        <p>{payload.country}</p>
                                        <p>{payload.phoneNumber}</p>
                                        <p>{payload.postOffice}</p>
                                        <p>{payload.city}</p>
                                        <p>{payload.address}</p>
                                        <p>{payload.apartment}</p>
                                        <p>{payload.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('tour')}>
                            <div className={cx("tour_information_title")}>
                                <i className="fa-solid fa-person"></i>
                                <h3>Thông tin chuyến đi</h3>
                            </div>
                            <div className={cx('order')}>
                                <div className="tour_content">
                                    <div>
                                        <h3>Ngày đặt:</h3>
                                        <p>{payload.bookDate === "" ? "--/--/----" : payload.bookDate}</p>
                                    </div>
                                    <div>
                                        <h3>Mã giảm giá:</h3>
                                        <p style={{ color: '#2980B9' }}>{payload.couponId === undefined || payload.couponId === "null"
                                            ? "Không áp dụng" : payload.resultCoupon}</p>
                                    </div>
                                    <div>
                                        <h3>Số lượng:</h3>
                                        <p>{payload.quantity}</p>
                                    </div>
                                    <div>
                                        <h3>Tổng số tiền:</h3>
                                        <p>{content.priceCoupon} ₫</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <>
                        <div className={cx('user')}>
                            <div className={cx("personal_information_title")}>
                                <i className="fa-solid fa-person"></i>
                                <h3>Thông tin người dùng</h3>
                            </div>
                            <div className={cx('personal_information_user')}>
                                <div className={cx('information_user')}>
                                    <div className="user_content">
                                        <input
                                            type='text'
                                            className={cx('firstName')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('lastName')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('nameCompany')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('country')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('phoneNumber')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('postOffice')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('city')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('address')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('apartment')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('email')}
                                        />
                                        <input
                                            type='text'
                                            className={cx('date')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('tour')}>
                            <div className={cx("tour_information_title")}>
                                <i className="fa-solid fa-person"></i>
                                <h3>Thông tin chuyến đi</h3>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default UpdateTourBooked;