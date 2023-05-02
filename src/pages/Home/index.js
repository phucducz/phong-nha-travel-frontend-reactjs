import '@fortawesome/fontawesome-free/css/all.min.css';
import { useReducer, useState, useEffect } from 'react';
import { image, imageFeature } from '~/images';
import { Fragment } from 'react';

import HomeStyle from '~/components/HomeStyles';
import SocialNetWork from '~/components/SocialNetwork';
import GridTour from '~/components/GridTour';

const initState = 0;
const length = imageFeature.length;

const UP_COUNT = 'up';
const DOWN_COUNT = 'down';

const reducer = (state, action) => {
    switch (action) {
        case UP_COUNT:
            return state === length - 1 ? 0 : state + 1;
        case DOWN_COUNT:
            return state === 0 ? length - 1 : state - 1;
        default:
            return action;
    }
}

function Home() {
    const [current, dispatch] = useReducer(reducer, initState);

    return (
        <HomeStyle>
            <div className="container">
                <div className="container__image">
                    <div className="listImg-Feature">
                        {imageFeature.map((img, index) => {
                            return (
                                <div className={current === index ? 'slide-active' : 'slide'} key={index}>
                                    {index === current &&
                                        <img className="imgFeature" src={img} alt="Hang động Quảng Bình" />}
                                </div>
                            )
                        })}
                    </div>
                    <div className="listImg-prarent">
                        {imageFeature.map((img, index) => (
                            <img onClick={() => dispatch(index)}
                                key={index} className="imgElement" src={img} alt="" />
                        ))}
                    </div>
                    <button className="button-left button-img--backg-opa button-img--color"
                        id="button-effect" onClick={() => dispatch(DOWN_COUNT)}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="button-right button-img--backg-opa button-img--color"
                        id="button-effect" onClick={() => dispatch(UP_COUNT)}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div className="gridtours">
                <div className="title">
                    <p className="title-p">Có thể bạn sẽ thích những TOUR du lịch dưới đây</p>
                    <h3 style={{ marginBottom: '2rem' }} className="title-h3">TOUR QUẢNG BÌNH NỔI BẬT</h3>
                    <div className="minus minus--decoration"></div>
                </div>
            </div>
            <GridTour index={0} children={null} topic={1} />
            <GridTour index={1} children={
                <Fragment>
                    <h3 className="gridtour__regular__title">tour hằng ngày</h3>
                    <div className="gridtour__regular">
                        <p className="gridtour__regular__content">Những tour du lịch hằng ngày trên Phong Nha Travel</p>
                        <button className="btn">
                            <a className="btn__detail">XEM CHI TIẾT</a>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </Fragment>}
                topic={2}
            />
            <div className="page-single-title">
                <div className="page-single-title__content">
                    <p style={{ padding: '0 2rem' }}>Chọn Sự Khác Biệt</p>
                    <h3 style={{ margin: '2.8rem 0', padding: '0 2rem 0 2rem' }}>CHỌN PHONG NHA TRAVEL</h3>
                    <div className="page-single__content">
                        <div className="page-single__content-top">
                            <div className="tour-diversity">
                                <div className="tour-diversity__icon"><a></a></div>
                                <div className="tour-diversity__content">
                                    <h3>Đa dạng Tour</h3>
                                    <p>Phong Nha Travel cung cấp
                                        nhiều loại Tour hằng ngày, mạo hiểm, trọn gói…</p>
                                </div>
                            </div>
                            <div className="tour-diversity">
                                <div className="tour-diversity__icon"><a></a></div>
                                <div className="tour-diversity__content">
                                    <h3>Giá Tour hợp lý</h3>
                                    <p>Phong Nha Travel tối ưu hóa
                                        chi phí cho khách hàng book được tour giá hợp lý nhất, chất lượng tốt nhất.</p>
                                </div>
                            </div>
                            <div className="tour-diversity">
                                <div className="tour-diversity__icon"><a></a></div>
                                <div className="tour-diversity__content">
                                    <h3>Điểm đến nhiều cảnh đẹp</h3>
                                    <p>Phong Nha Travel sẽ lựa
                                        chọn những điểm dừng, những điểm đến đẹp để cho du khách có những khung cảnh đẹp
                                        nhất.</p>
                                </div>
                            </div>
                        </div>
                        <div className="page-single__content-bottom">
                            <div className="tour-diversity">
                                <div className="tour-diversity__icon"><a></a></div>
                                <div className="tour-diversity__content">
                                    <h3>Hệ thống Book Tour nhanh</h3>
                                    <p>Đội ngũ kỹ thuật của Phong
                                        Nha Travel luôn tối ưu hệ thống đảm bảo cho khách hàng có trải nghiệm book tour
                                        dễ dàng và nhanh nhất.</p>
                                </div>
                            </div>
                            <div className="tour-diversity">
                                <div className="tour-diversity__icon"><a></a></div>
                                <div className="tour-diversity__content">
                                    <h3>Đội ngũ hỗ trợ tận tình</h3>
                                    <p>Hotline của Phong Nha
                                        Travel luôn thường trực. Đội ngũ hướng dẫn nhiều kinh nghiệm sẽ mang đến cho bạn
                                        những chuyến đi an tâm.</p>
                                </div>
                            </div>
                            <div className="tour-diversity">
                                <div className="tour-diversity__icon"><a></a></div>
                                <div className="tour-diversity__content">
                                    <h3>To Travel - To Discovery</h3>
                                    <p>Phong Nha Travel sẽ lựa
                                        chọn những điểm dừng, những điểm đến đẹp để cho du khách có những khung cảnh đẹp
                                        nhất.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-single__searchtours">
                    <div className="searchtours__container">
                        <div className="title-search">
                            <h3>tìm kiếm tour</h3>
                        </div>
                        <div className="text-search">
                            <div className="text-search__searchtuors searchtuors--w-h-m">
                                <input className="searchtuors__text" type="text" placeholder="Search Tour" />
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className="text-search__tourstartend">
                                <input className="tourstartend__start tourstartend--w-h-m" type="text" placeholder="Start" />
                                <input className="tourstartend__end tourstartend--w-h-m" type="text" placeholder="End" />
                            </div>
                            <div className="text-search__price price--w-h-m"></div>
                            <button type="button" className="text-search__category category--w-h-m-b">Category</button>
                            <button className="text-search__findtour findtour--w-h-m">
                                find tours
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-images__title">
                <span className="images__crossbar"></span>
                <div className="images__icon"></div>
                <h3 className="images__desc">Hình ảnh từ Phong Nha Travel</h3>
                <span className="images__crossbar"></span>
            </div>
            <div className="discovery-review container--margin">
                <div className="discovery">
                    <h3 style={{ paddingBottom: '2rem' }} className="discovery__title word--fontadj">khám phá</h3>
                    <div className="minus minus--decoration"></div>
                    <img className="discovery__img"
                        src={image.imgDiscovery} alt="" />
                    <div className="introduce">
                        <h3 className="introduce__title">thung lũng hava điểm trải nghiệm mới ở sông chày</h3>
                        <p className="introduce__description">Thung Lũng Hava điểm trãi nghiệm mới ở Sông Chày Vị Trí đặc
                            địa nằm trên cung đường danh thắng Phong nha - kẻ bàng Thung lũng</p>
                        <button className="btn">
                            <p className="btn__detail">TÌM HIỂU THÊM</p>
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
                <div className="tour-review">
                    <h3 style={{ paddingBottom: '2rem' }} className="discovery__title word--fontadj">tour review</h3>
                    <div className="minus minus--decoration"></div>
                    <div className="tour-review__decoration --border-bottom">
                        <div className="decoration-bottom-center"></div>
                    </div>
                    <div style={{ width: '630px' }} className="shortcode__tour-review">
                        {/* <div className="avatar --flexbox">
                            <div className="avatar__right">
                                <div className="avatar__user-card">
                                    <img src="images/257756110_1092282088211012_8156563897162783072_n.jpg" alt="" />
                                    <div className="avatar__user-card__name">Huy Ngô</div>
                                </div>
                            </div>
                            <div className="avatar__left">
                                <div className="avattar__user-card">
                                    <div className="avatar__user-card__left__title">
                                        <a href="">Tour ghép Phong Nha hàng ngày</a>
                                    </div>
                                    <div className="avatar__user-card__left__description">Tour rất tuyệt.</div>
                                    <div className="avatar__user-card__icon --flexbox">
                                        <div id="star-vote" className="icon-star"></div>
                                        <div id="star-vote" className="icon-star"></div>
                                        <div id="star-vote" className="icon-star"></div>
                                        <div id="star-vote" className="icon-star"></div>
                                        <div id="star-vote" className="icon-star"></div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <SocialNetWork />
        </HomeStyle >
    )
}

export default Home;