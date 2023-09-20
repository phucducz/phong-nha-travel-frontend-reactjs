import classNames from 'classnames/bind';
import { useEffect, useReducer, useState } from 'react';
import { image, imageFeature } from '~/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import style from '~/components/HomeStyles/HomeStyle.module.scss';
import { SLIDER_IMAGES } from "~/constant";
import SocialNetWork from '~/components/SocialNetworks';
import { GridTour } from '~/components/GridTour';
import Button from '~/components/Button';
import {
    PAGESINGLE_ITEMS,
    GRIDTOUR_ITEMS_REMARKABLE,
    GRIDTOUR_ITEMS_DAILY,
    GRIDTOUR_ITEMS_PREFERENTIAL,
    SOCIAL_NETWORKS
} from '~/constant';
import { getService } from '~/services';
import PageSingle from '~/components/PageSingle';
import { SearchBox } from '~/components/SearchBox';
import { TourReview } from '~/components/TourReview';
import { TOURREIVEW_ITEMS } from '~/constant';
import { ToursType } from '~/components/TourType';
import { TOURSTYPE_ITEMS } from '~/constant';
import Slider from '~/components/Slider';

const cx = classNames.bind(style);

function Home() {
    const [tours, setTours] = useState([]);
    const [toursOrder, setToursOrder] = useState([]);
    const [toursHot, setToursHot] = useState([]);
    const [toursPreferential, setToursPreferential] = useState([]);
    const [categories, setCategories] = useState({ data: [] });
    const [toursCategories, setToursCategories] = useState({ data: [] });

    useEffect(() => {
        const fetchTours = async () => {
            const result = await getService('tours');
            setTours(result);
        }

        const fetchCategories = async () => {
            const result = await getService('categories');
            result.splice(0, 0, { title: 'Category' });
            setCategories(() => ({
                data: result
            }));
        }

        const fetchToursCategories = async () => {
            const result = await getService('toursCategories');
            setToursCategories(result);
        }

        const fetchTourOrderMost = async () => {
            const result = await getService('tours', {
                type: 'order_most'
            });
            setToursPreferential(prev => [
                ...prev,
                ...result
            ]);
        }

        const fetchTourHot = async () => {
            const result = await getService('tours', {
                type: 'hot'
            });
            setToursPreferential(prev => [
                ...prev,
                ...result
            ]);
        }

        const fetch = () => {
            fetchTours();
            fetchCategories();
            fetchToursCategories();
            fetchTourOrderMost();
            fetchTourHot();
        }

        fetch();
    }, []);

    GRIDTOUR_ITEMS_REMARKABLE.title = (
        <div className={cx('gridtours')}>
            <div className={cx('title')}>
                <p className={cx('title-p')}>Có thể bạn sẽ thích những TOUR du lịch dưới đây</p>
                <h3 style={{ marginBottom: '2rem' }} className={cx('cm__title')}>tour quảng bình nổi bật</h3>
            </div>
        </div>
    );

    GRIDTOUR_ITEMS_DAILY[0].title = (
        <div className={cx('gridtour')}>
            <h3 className={cx('cm__title')}>tour hằng ngày</h3>
            <div className={cx('gridtour__regular')}>
                <p className={cx('cm__content')}>Những tour du lịch hằng ngày trên Phong Nha Travel</p>
                <Button
                    primary
                    large
                    rounded
                    rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    className={cx('gridtour__regular__button')}
                >
                    xem chi tiết
                </Button>
            </div>
        </div>
    );

    GRIDTOUR_ITEMS_PREFERENTIAL[0].title = (
        <div style={{ paddingTop: '3rem' }} className={cx('gridtour')}>
            <h3 className={cx('cm__title')}>tour đang ưu đãi</h3>
            <div className={cx('gridtour__regular')}>
                <p className={cx('cm__content')}>Những tour có giá được tối ưu hấp dẫn trên Phong Nha Travel</p>
                <Button
                    primary
                    large
                    rounded
                    rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                    className={cx('gridtour__regular__button')}
                >
                    xem chi tiết
                </Button>
            </div>
        </div>
    );

    return (
        <div className={cx('home-body')}>
            <Slider images={SLIDER_IMAGES} />
            <GridTour
                data={tours}
                dataItem={GRIDTOUR_ITEMS_REMARKABLE}
                categories={toursCategories}
                slider={true}
            />
            {GRIDTOUR_ITEMS_DAILY.map(item => (
                <GridTour
                    key={item.id}
                    data={tours}
                    dataItem={item}
                    categories={toursCategories}
                    slider={item.slider}
                />
            ))}
            <div className={cx('cn-page')}>
                <div className={cx('wrapper__page')}>
                    <PageSingle
                        data={PAGESINGLE_ITEMS}
                        title='chọn phong nha travel'
                        subTitle='chọn sự khác biệt'
                    />
                    <SearchBox categories={categories} />
                </div>
            </div>
            <GridTour
                data={toursPreferential}
                dataItem={{
                    title: (
                        <div style={{ paddingTop: '3rem' }} className={cx('gridtour')}>
                            <h3 className={cx('cm__title')}>tour đang ưu đãi</h3>
                            <div className={cx('gridtour__regular')}>
                                <p className={cx('cm__content')}>Những tour có giá được tối ưu hấp dẫn trên Phong Nha Travel</p>
                                <Button
                                    primary
                                    large
                                    rounded
                                    rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                    className={cx('gridtour__regular__button')}
                                >
                                    xem chi tiết
                                </Button>
                            </div>
                        </div>
                    )
                }}
                categories={toursCategories}
                slider={false}
                flex
                round
            />
            <div className={cx('wrapper-find')}>
                <div className={cx('tours-type')}>
                    <div className={cx('tours-type__title')}>
                        <p>Find a Tour by</p>
                        <h3>phong nha travel</h3>
                    </div>
                    <div className={cx('tours-type__slider')}>
                        <ToursType data={TOURSTYPE_ITEMS} />
                    </div>
                </div>
                <div className={cx('discovery-review')}>
                    <div className={cx('discovery')}>
                        <h3 className={cx('discovery__title')}>khám phá</h3>
                        <img className={cx('discovery__img')} src={image.imgDiscovery} alt="" />
                        <div className={cx('introduce')}>
                            <h3 className={cx('introduce__title')}>thung lũng hava điểm trải nghiệm mới ở sông chày</h3>
                            <p className={cx('introduce__description')}>Thung Lũng Hava điểm trãi nghiệm mới ở Sông Chày Vị Trí đặc
                                địa nằm trên cung đường danh thắng Phong nha - kẻ bàng Thung lũng</p>
                            <Button
                                className={cx('introduce__button')}
                                rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                rounded
                            >
                                tìm hiểu thêm
                            </Button>
                        </div>
                    </div>
                    <TourReview data={TOURREIVEW_ITEMS} className={cx('review')} />
                </div>
            </div>
            <div className={cx('container-images__title')}>
                <span className={cx('images__crossbar')}></span>
                <div className={cx('images__icon')}></div>
                <h3 className={cx('images__desc')}>Hình ảnh từ Phong Nha Travel</h3>
                <span className={cx('images__crossbar')}></span>
            </div>
            <SocialNetWork data={SOCIAL_NETWORKS} />
        </div>
    )
}

export default Home;