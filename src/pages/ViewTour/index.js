import classNames from "classnames/bind";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";

import { getService } from "~/services";
import style from './TourView.module.scss';
import { formatMoney } from "~/format";
import TabCategories from "./TabCategories";
import { INFO_TOUR, SHARE_BUTTONS } from "~/constant";
import { routes } from '~/config';
import Icon from "~/components/Icon";
import Tab from "~/components/Tab";
import FormBlock from "~/components/FormBlock";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { doAddCartItem, doBookingTour } from "~/constant/reduxContants";

const cx = classNames.bind(style);

function ViewTour() {
    const { tourId } = useParams();
    const [tour, setTour] = useState({});
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            emailAddress: '',
            phoneNumber: '',
            bookingDate: '',
            quantity: '',
            tourId: +tourId,
            userId: 1
        },

        validationSchema: Yup.object({
            fullName: Yup.string()
                .required('Vui lòng điền đầy đủ họ tên!')
                .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{3,}$/, 'Vui lòng nhập họ tên ít nhất 4 ký tự'),
            emailAddress: Yup.string()
                .required('Vui lòng cung cấp email!')
                .matches(/[A-Za-z0-9'\.\-\s\,]/, "Vui lòng nhập địa chỉ đúng định dạng (Không dùng ký tự đặc biệt)"),
            phoneNumber: Yup.string()
                .required('Vui lòng nhập số điện thoại của bạn!')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/, "Vui lòng nhập số điện thoại đúng định dạng (10 chữ số) !"),
            bookingDate: Yup.string()
                .required('Không được để trống!')
                .matches(
                    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
                    , 'Không có vé cho ngày này!'),
            quantity: Yup.number()
                .required('Vui lòng nhập số lượng vé!')
        }),

        onSubmit: values => handleBookClick(values)
    });

    const FORM_BLOCK_INPUTS = [
        {
            value: formik.values.fullName,
            content: 'Name',
            name: 'fullName',
            rightIcon: <Icon className={cx('form__icon')} data={{ code: 'td__user' }} />,
            error: formik.errors.fullName === undefined ? '' : formik.errors.fullName
        }, {
            value: formik.values.emailAddress,
            content: 'Email',
            name: 'emailAddress',
            rightIcon: <Icon className={cx('form__icon')} data={{ code: 'td__email-2' }} />,
            error: formik.errors.emailAddress === undefined ? '' : formik.errors.emailAddress
        }, {
            value: formik.values.phoneNumber,
            content: 'Phone number',
            name: 'phoneNumber',
            rightIcon: <Icon className={cx('form__icon')} data={{ code: 'td__phone-1' }} />,
            error: formik.errors.phoneNumber === undefined ? '' : formik.errors.phoneNumber
        }, {
            value: formik.values.bookingDate,
            content: 'Date',
            name: 'bookingDate',
            rightIcon: <Icon className={cx('form__icon')} data={{ code: 'td__calendar' }} />,
            error: formik.errors.bookingDate === undefined ? '' : formik.errors.bookingDate
        }, {
            value: formik.values.quantity,
            content: 'Quantity',
            name: 'quantity',
            rightIcon: <Icon className={cx('form__icon')} data={{ code: 'td__user-plus' }} />,
            error: formik.errors.quantity === undefined ? '' : formik.errors.quantity
        }
    ];

    useEffect(() => {
        const getTour = async () => {
            // php service
            const response = await getService('tours', {
                type: 'view',
                tourId: tourId,

            });
            setTour(response[0]);

            // java spring boot service
            // const result = await getService(`tours/${tourId}`);
            // setTour(result);
        }

        const getCategories = async () => {
            // php server

            // const result = await getService('tourCategories', {
            //     id: tourId
            // });

            // java spring boot server

            const result = await getService('tourCategories', { id: tourId });
            setCategories(result);
        }

        const fetchData = () => {
            getTour();
            getCategories();
        }

        fetchData();
    }, []);

    useEffect(() => {
        formik.values.fullName !== '' && formik.setValues({
            ...formik.values,
            price: +tour.price,
            tourName: tour.name,
            image: tour.image,
            description: tour.description
        });
    }, [formik.values.fullName]);

    const handleBookClick = values => {
        doAddCartItem(values);
        doBookingTour(dispatch, values);
        navigate('/checkout');
    }

    return (
        <div className={cx('container')}>
            <div className={cx('container__image')}>
                <h3>{tour.name}</h3>
                <div className={cx('image')} style={{ backgroundImage: `url(../../${tour.image})` }}></div>
            </div>
            <div className={cx('tab-pane')}>
                <div className={cx('tab-pane__left')}>
                    <Tab
                        tabs={['chi tiết', 'lộ trình', 'hình ảnh']}
                        contents={[
                            {
                                tab: (
                                    <div className={cx('review')}>
                                        <TabCategories data={categories} />
                                        <div className={cx('review__title')}>
                                            <Link to={routes.Home}>{tour.name}</Link>
                                        </div>
                                        <div className={cx('review__content')}>
                                            <p>{tour.description}</p>
                                        </div>
                                        <table className={cx('table')}>
                                            <tbody>
                                                <tr>
                                                    <td className={cx('td-center-content')} colSpan={2}><p>Giá tour trọn gói VND cho mỗi khách</p></td>
                                                </tr>
                                                <tr className={cx('bg-even')}>
                                                    <td className={cx('td-width')}><p>Giá TOUR người lớn</p></td>
                                                    <td className={cx('td-width')}><p>{formatMoney(tour.price || tour.priceAdult)}/khách</p></td>
                                                </tr>
                                                <tr colSpan={2}>
                                                    <td className={cx('td-width')}><p>Giá TOUR trẻ em</p></td>
                                                    <td className={cx('td-width')}><p>{formatMoney(tour.priceChildren)}/khách</p></td>
                                                </tr>
                                                <tr className={cx('bg-even')}>
                                                    <td colSpan={2} style={{ height: '14.6rem' }}>
                                                        <p>Giá tour trọn gói trên dành cho nhóm 20 khách.</p>
                                                        <p>
                                                            Nhóm khách đoàn từ 20 khách trở lên vui lòng liên hệ về Phong Nha Travel
                                                            <span className={cx('phone')}>0763700336</span>
                                                            để có giá tốt hơn !
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className={cx('review__price')}>
                                            <div>
                                                <h3>Giá tour trọn gói đã bao gồm:</h3>
                                                <ul>
                                                    <li>Xe tham quan du lịch đời mới máy lạnh đón tiễn tại Đồng Hới suốt chương trình.</li>
                                                    <li>Hướng dẫn viên tiếng Việt hoặc tiếng Anh chuyên tour suốt tuyến.</li>
                                                    <li>02 bữa trưa tại nhà hàng OZO – Nhà hàng Đá Nhảy: 120.000đ/ 01 khách/ 01 bữa.</li>
                                                    <li>
                                                        Vé tham quan các điểm theo chương trình:
                                                        <ul>
                                                            <li>Vé tham quan Công viên Ozo</li>
                                                        </ul>
                                                    </li>
                                                    <li>Nước suối Lavie 500ml: 02 chai/ 01 khách/ 01 ngày.</li>
                                                    <li>Khăn lạnh: 02 cái/ 01 khách/ 01 ngày.</li>
                                                    <li>Bảo hiểm du lịch, mức bồi thường tối đa: 20.000.000 đồng/ 01 khách/ 01 vụ.</li>
                                                </ul>
                                            </div>
                                            {INFO_TOUR.map((item, index) => (
                                                <div key={index}>
                                                    <h3>{item.title}</h3>
                                                    <ul>
                                                        {item.content.map((content, index) => <li key={index}>{content}</li>)}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }, {
                                tab: (
                                    <div className={cx('review')}>
                                        <div className={cx('review__title')}>
                                            <Link to={routes.Home}>{tour.name}</Link>
                                        </div>
                                        <div className={cx('review__content')}>
                                            <p>{tour.description}</p>
                                        </div>
                                        <div className={cx('review__price')}>
                                            <div>
                                                <h3>Giá tour trọn gói đã bao gồm:</h3>
                                                <ul>
                                                    <li>Xe tham quan du lịch đời mới máy lạnh đón tiễn tại Đồng Hới suốt chương trình.</li>
                                                    <li>Hướng dẫn viên tiếng Việt hoặc tiếng Anh chuyên tour suốt tuyến.</li>
                                                    <li>02 bữa trưa tại nhà hàng OZO – Nhà hàng Đá Nhảy: 120.000đ/ 01 khách/ 01 bữa.</li>
                                                    <li>
                                                        Vé tham quan các điểm theo chương trình:
                                                        <ul>
                                                            <li>Vé tham quan Công viên Ozo</li>
                                                        </ul>
                                                    </li>
                                                    <li>Nước suối Lavie 500ml: 02 chai/ 01 khách/ 01 ngày.</li>
                                                    <li>Khăn lạnh: 02 cái/ 01 khách/ 01 ngày.</li>
                                                    <li>Bảo hiểm du lịch, mức bồi thường tối đa: 20.000.000 đồng/ 01 khách/ 01 vụ.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }, {
                                tab: (
                                    <div className={cx('review')}>
                                        <div className={cx('review__title')}>
                                            <Link to={routes.Home}>{tour.name}</Link>
                                        </div>
                                        <div className={cx('review__content')}>
                                            <p>{tour.description}</p>
                                        </div>
                                    </div>
                                )
                            }
                        ]}
                    />
                    <div className={cx('share-button')}>
                        {SHARE_BUTTONS.map((item, index) => (
                            <div key={index} className={cx('share-button__item', item.className)}>
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('tab-pane__right')}>
                    <div className={cx('book__price')}>
                        <div className={cx('price')}>
                            <div className={cx('price__value')}>
                                <Icon data={{ code: 'td__price-tag' }} />
                                <h3>{formatMoney(tour.priceAdult || tour.price_adult)}</h3>
                                {tour.type
                                    && <div className={cx('price__label-round', tour.type)}>
                                        <div className={cx('price__label-round__content')}>
                                            {tour.type === 'hot'
                                                ? <p>tour hot</p>
                                                : <p>tour book nhiều</p>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className={cx('price__label')}>
                                <p>One tour per person</p>
                            </div>
                        </div>
                    </div>
                    <FormBlock
                        className={cx('form')}
                        title='Book the tour'
                        onSubmit={formik.handleSubmit}
                    >
                        {FORM_BLOCK_INPUTS.map((item, index) => (
                            <Input
                                key={index}
                                required
                                className={cx('form__input')}
                                value={item.value}
                                content={item.content}
                                name={item.name}
                                rightIcon={item.rightIcon}
                                onChange={formik.handleChange}
                                error={item.error}
                            />
                        ))}
                        <div className={cx('form__price-detail')}>
                            <span>{formik.values.quantity} x </span>
                            <span>{formatMoney(tour.price || tour.priceAdult)} = </span>
                            <span>{formatMoney(+formik.values.quantity * +(tour.price || tour.priceAdult))}</span>
                        </div>
                        <Button
                            className={cx('form__button')}
                            type='submit'
                            onClick={formik.handleSubmit}
                            to={routes.CheckOut}
                            value='book now'
                        />
                    </FormBlock>
                </div>
            </div>
        </div>
    )
}

export default ViewTour;