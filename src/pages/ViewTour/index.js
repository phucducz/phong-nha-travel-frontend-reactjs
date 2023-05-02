import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as getService from "~/apiService/getService";
import ViewTourStyle from "~/components/ViewTourStyles";

function ViewTour() {
    const { tourId } = useParams();
    const [tour, setTour] = useState({
        description: '',
        id: '',
        name: '',
        price_id: '',
        topic_id: ''
    });

    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);

    const [name, setName] = useState('');
    const inputName = useRef();
    const [email, setEmail] = useState('');
    const inputEmail = useRef();
    const [mobile, setMobile] = useState('');
    const inputMobile = useRef();
    const [date, setDate] = useState('');
    const inputDate = useRef();
    const [quanity, setQuanity] = useState('');
    const inputQuanity = useRef();

    useEffect(() => {
        const fetchAPI = async () => {
            const respond = await getService.get('tours', tourId);
            console.log(respond);
            setTour(respond);
        }

        fetchAPI();
    }, []);

    useEffect(() => {
        setInputs({ name, email, mobile, date, quanity });
    }, [name, email, mobile, date, quanity]);

    useEffect(() => {
        validate(inputs);
    }, [inputs]);

    const validate = inputs => {
        const { name, email, mobile, date, quanity } = inputs;

        let result = [];
        let index = 0;
        const regexEmail =
            /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/;
        return result;
    }

    return (
        <ViewTourStyle>
            <div className="container" style={{ marginTop: '11rem' }}>
                <div className="container_image">
                    <h3>{tour.name}</h3>
                    <img className="image" src={tour.image} />
                </div>
                <div className="wrap_tour">
                    <div>
                        <ul className="nav_tour">
                            <li className="nav_tour-1"><Link to={""}>Chi tiết</Link></li>
                            <li className="nav_tour-2"><Link to={""}>Lịch trình</Link></li>
                            <li className="nav_tour-3"><Link to={""}>Ảnh</Link></li>
                        </ul>
                        <div className="tour_review">
                            <div className="review">
                                <div className="review_title">
                                    <h3>{tour.name}</h3>
                                </div>
                                <div className="review_content">
                                    <p>{tour.description}</p>
                                </div>
                                <table className="table">
                                    <th colSpan={2}><tr><p>Giá tour trọn gói VND cho mỗi khách</p></tr></th>
                                    <tr style={{ backgroundColor: '#e4e4e4' }}>
                                        <td colSpan={2}>
                                            <td className="td-width"><p>Giá TOUR người lớn</p></td>
                                            <td className="td-width"><p> 750.000 VNĐ/mỗi khách</p></td>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <td className="td-width"><p>Giá TOUR trẻ em</p></td>
                                            <td className="td-width"><p> 400.000 VNĐ/mỗi khách</p></td>
                                        </td>
                                    </tr>
                                    <tr style={{
                                        backgroundColor: '#e4e4e4'
                                    }}>
                                        <td colSpan={2} >
                                            <p>Giá tour trọn gói trên dành cho nhóm 20 khách. <br /> Nhóm khách đoàn từ 20
                                                khách trở lên vui lòng liên hệ về Phong Nha Travel
                                                <span
                                                    style={{
                                                        fontSize: '1.6rem',
                                                        color: '#ff6600',
                                                        padding: '0 .4rem'
                                                    }}>0763700336</span>
                                                để có giá tốt hơn !</p>
                                        </td>
                                    </tr>
                                </table>
                                <div className="review_price">
                                    <div>
                                        <h3 style={{ marginTop: '7rem' }}>Giá tour trọn gói đã bao gồm:</h3>
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
                                    <div>
                                        <h3>Giá tour trọn gói chưa bao gồm:</h3>
                                        <ul>
                                            <li>Hóa đơn GTGT</li>
                                            <li>Chi phí cá nhân, chi phí ăn uống, tham quan các điểm ngoài chương trình.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Giá tour trẻ em:</h3>
                                        <ul>
                                            <li>Trẻ em từ 1,3m trở lên: giá tour như người lớn.</li>
                                            <li>Trẻ em từ 1,1m đến 1,3m: 50% giá tour người lớn.</li>
                                            <li>Trẻ em dưới 1,1m: Miễn phí.</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Nên mang theo gì?</h3>
                                        <ul>
                                            <li>Máy ảnh, quay phim.</li>
                                            <li>Sạc dự phòng cho các thiết bị di động.</li>
                                            <li>Sử dụng giày thể thao hoặc các loại giày dép mềm phù hợp với việc đi bộ.</li>
                                            <li>Khăn tắm cỡ lớn.</li>
                                            <li>Bikini, đồ bơi</li>
                                        </ul>
                                    </div>
                                    <h3>Phong Nha Travel</h3>
                                </div>
                            </div>
                        </div>
                        <div className="shareButton">
                            <div className="box">
                                <i className="fa-brands fa-facebook"></i>
                            </div>
                            <div className="box">
                                <i className="fa-brands fa-twitter"></i>
                            </div>
                            <div className="box">
                                <i className="fa-brands fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                    <div className="tour_book">
                        <div className="book_price_decoration">
                            <div className="amount">
                                <i className="fa-solid fa-tag"></i>
                                <h3>{tour.price}</h3>
                            </div>
                            <p>One tour per person</p>
                        </div>
                        {/* <div className="container_book"> */}
                        {/* <h3>Book the Tour</h3>
                            <div className="book_box-input">
                                <input
                                    ref={inputName}
                                    value={name}
                                    className="inputName"
                                    placeholder="Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <i className="fa-solid fa-person"></i>
                            </div>
                            <div className="book_box-input">
                                <input
                                    ref={inputEmail}
                                    value={email}
                                    className="inputEmail"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <i className="fa-solid fa-envelope"></i>
                            </div>
                            <div className="book_box-input">
                                <input
                                    ref={inputMobile}
                                    value={mobile}
                                    className="inputMobile"
                                    placeholder="Mobile"
                                    onChange={(e) => setMobile(e.target.value)}
                                />
                                <i className="fa-solid fa-phone"></i>
                            </div>
                            <div className="book_box-input">
                                <input
                                    type="date"
                                    style={{paddingRight: '.6rem'}}
                                    ref={inputDate}
                                    value={date}
                                    className="inputDate"
                                    placeholder="Date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                            <div className="book_box-input">
                                <input
                                    ref={inputQuanity}
                                    value={quanity}
                                    className="inputQuanity"
                                    placeholder="Quanity"
                                    onChange={(e) => setQuanity(e.target.value)}
                                />
                                <i className="fa-solid fa-person-circle-plus"></i>
                            </div> */}
                        <input
                            className="book_button"
                            type="submit"
                            value="BOOK NOW"
                            onClick={() => navigate(`/checkout/${tour.id}`)}
                        />
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </ViewTourStyle >
    )
}

export default ViewTour;