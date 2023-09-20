import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { image } from '~/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './HomeStyle.module.scss';
import { SLIDER_IMAGES } from "~/constant";
import { GridTour } from '~/components/GridTour';
import Button from '~/components/Button';
import {
    PAGESINGLE_ITEMS,
    GRIDTOUR_ITEMS,
    GRIDTOUR_ITEMS_PREFERENTIAL,
    TOURSTYPE_ITEMS,
    TOURREIVEW_ITEMS
} from '~/constant';
import { getService } from '~/services';
import PageSingle from '~/components/PageSingle';
import SearchBox from '~/components/SearchBox';
import { TourReview } from '~/components/TourReview';
import ToursType from '~/components/TourType';
import Slider from '~/components/Slider';
import { setTourCategories } from '~/reducers/tourCategories';
import { setMenuActive } from '~/reducers/menu';

const cx = classNames.bind(style);

function Home() {
    const dispatch = useDispatch();
    const tourCategories = useSelector(state => state.tourCategories);

    const navigate = useNavigate();

    const [tours, setTours] = useState([]);
    const [categories, setCategories] = useState({ data: [] });

    useEffect(() => {
        const fetchTours = async () => {
            // php service

            const result = await getService('tours', {
                q: 'hot_order'
            });
            
            // java service

            // const result = await getService('tours');
            
            setTours(result);
        }

        const fetchCategories = async () => {
            const result = await getService('categories');
            result.splice(0, 0, { id: 0, title: 'Category' });

            setCategories({ data: result });
        }

        const fetchToursCategories = async () => {
            const result = await getService('tourCategories');

            dispatch(setTourCategories(result));
        }

        const fetchData = () => {
            fetchTours();
            fetchCategories();
            fetchToursCategories();
        }

        fetchData();
    }, []);

    const handleNavigate = (id, url) => {
        navigate(url);
        id > 0 && dispatch(setMenuActive(id));
    }

    GRIDTOUR_ITEMS[0].title = (
        <div className={cx('gridtours')}>
            <div className={cx('title')}>
                <p className={cx('title-p')}>Có thể bạn sẽ thích những TOUR du lịch dưới đây</p>
                <h3 style={{ marginBottom: '2rem' }} className={cx('cm__title')}>tour quảng bình nổi bật</h3>
            </div>
        </div>
    );

    GRIDTOUR_ITEMS[1].title = (
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
                    onClick={() => handleNavigate(1, '/tour-category/tour-hằng-ngày')}
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
            {GRIDTOUR_ITEMS.map(item => (
                <GridTour
                    key={item.id}
                    data={tours}
                    dataItem={item}
                    categories={tourCategories.listData}
                    slider={item.slider}
                    flex={item.flex}
                />
            ))}
            <div className={cx('cn-page')}>
                <div className={cx('wrapper__page')}>
                    <PageSingle
                        data={PAGESINGLE_ITEMS}
                        title='chọn phong nha travel'
                        subTitle='chọn sự khác biệt'
                    />
                    <SearchBox searchData={categories} />
                </div>
            </div>
            <GridTour
                data={tours}
                dataItem={{
                    title: (
                        <div className={cx('gridtour')}>
                            <h3 className={cx('cm__title')}>tour đang ưu đãi</h3>
                            <div className={cx('gridtour__regular')}>
                                <p className={cx('cm__content')}>Những tour có giá được tối ưu hấp dẫn trên Phong Nha Travel</p>
                                <Button
                                    primary
                                    large
                                    rounded
                                    rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                    className={cx('gridtour__regular__button')}
                                    onClick={() => handleNavigate(-1, '/tour-category/tour-deal')}
                                >
                                    xem chi tiết
                                </Button>
                            </div>
                        </div>
                    ),
                    topic: 3
                }}
                categories={tourCategories.listData}
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
        </div>
    )
}

export default Home;