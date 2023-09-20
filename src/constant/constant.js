import {
    faCalendarDays,
    faCamera,
    faChevronDown,
    faChevronRight,
    faComments,
    faGlobe,
    faHeart,
    faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons";

import { routes } from "~/config";
import TOUR_TYPE_1 from '~/images/tour-deal.jpg';
import TOUR_TYPE_2 from '~/images/tour-hang-ngay.jpg';
import TOUR_TYPE_3 from '~/images/tour-mao-hiem.jpg';
import TOUR_TYPE_4 from '~/images/tour-mien-trung.jpg';
import TOUR_TYPE_5 from '~/images/tour-noi-bat.jpg';
import TOUR_TYPE_6 from '~/images/tour-phong-nha.jpg';
import TOUR_TYPE_7 from '~/images/tour-quang-binh.jpg';
import SLIDER_1 from '~/images/black-forest-gaf3ef4a97_1920.jpg';
import SLIDER_2 from '~/images/dulichhangdongquangbinh.jpeg';
import SLIDER_3 from '~/images/con-duong-da-lat-quang-binh-2-720x530.jpg';
import zalo from '~/images/zalo-icon.png';
import phone from '~/images/phone-icon.png';
import instagram from '~/images/Instagram-Icon.png';

const SLIDER_IMAGES = [
    {
        src: SLIDER_1,
        alt: 'slide-1.jpg'
    }, {
        src: SLIDER_2,
        alt: 'slide-2.jpg'
    }, {
        src: SLIDER_3,
        alt: 'slide-3.jpg'
    }
];

const fieldNames = [
    'Id',
    'Name',
    'Description',
    'Title',
    'Price',
    'Topic',
    'Category'
];

const MENU_ITEMS = [
    {
        title: 'tour hằng ngày',
        url: '/',
        icon: null,
        subMenu: null
    }, {
        title: 'tour quảng bình',
        url: '/',
        icon: null,
        subMenu: null
    }, {
        title: 'tour phong nha',
        url: '/',
        icon: null,
        subMenu: null
    }, {
        title: 'tours khác',
        url: '/',
        icon: faChevronDown,
        subMenu: {
            data: [
                {
                    title: 'tour miền trung',
                    url: '/',
                    icon: faChevronRight,
                    subMenu: {
                        data: [
                            {
                                title: 'tour đà nẵng',
                                icon: faChevronRight,
                                url: '/',
                                subMenu: {
                                    data: [
                                        {
                                            title: 'tour deal',
                                            url: '/',
                                            icon: null,
                                            subMenu: null
                                        }, {
                                            title: 'tour deal',
                                            url: '/',
                                            icon: faChevronRight,
                                            subMenu: {
                                                data: [
                                                    {
                                                        title: 'tour deal',
                                                        url: '/',
                                                        icon: null,
                                                        subMenu: null
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }, {
                                title: 'tour hội an',
                                icon: null,
                                url: '/',
                                subMenu: null
                            }
                        ]
                    }
                }, {
                    title: 'tour deal',
                    url: '/',
                    icon: null,
                    subMenu: null
                }, {
                    title: 'tour nổi bật',
                    url: '/',
                    icon: null,
                    subMenu: null
                }, {
                    title: 'tour mạo hiểm',
                    url: '/',
                    icon: null,
                    subMenu: null
                }
            ]
        }
    }, {
        title: 'thuê xe',
        url: '/',
        icon: null,
        subMenu: null
    }, {
        title: 'cẩm nang',
        url: '/camnang',
        icon: null,
        subMenu: null
    }, {
        title: 'liên hệ',
        url: '/lienhe',
        icon: null,
        subMenu: null
    }, {
        url: routes.Cart,
        icon: faChevronDown,
        contentBefore: 'n',
        placement: 'bottom-end',
        subMenu: {
            data: [
                {
                    title: 'trang giỏ hàng',
                    icon: null,
                    url: routes.CartPage,
                    subMenu: null
                }, {
                    title: 'trang thanh toán',
                    icon: null,
                    url: '/',
                    subMenu: null
                }, {
                    title: 'trang tài khoản',
                    icon: null,
                    url: '/account',
                    subMenu: null
                }
            ]
        }
    }
];

const GRIDTOUR_ITEMS_REMARKABLE = {
    id: 0,
    topic: 1,
    marginLeft: 0,
};

const GRIDTOUR_ITEMS_DAILY = [
    {
        id: 0,
        topic: 2,
        slider: false,
    }, {
        id: 1,
        topic: 2,
        slider: false,
    }
];

const GRIDTOUR_ITEMS_PREFERENTIAL = [
    {
        id: 0,
        slider: false,
    }, {
        id: 1,
        slider: false,
    }
];

const PAGESINGLE_ITEMS = [
    {
        icon: faGlobe,
        title: 'đa dạng tour',
        content: 'Phong Nha Travel cung cấp nhiều loại Tour hằng ngày, mạo hiểm, trọn gói…'
    }, {
        icon: faMoneyBillWave,
        title: 'giá tour hợp lý',
        content: 'Phong Nha Travel tối ưu hóa chi phí cho khách hàng book được tour giá hợp lý nhất, chất lượng tốt nhất.'
    }, {
        icon: faCamera,
        title: 'điểm đến nhiều cảnh đẹp',
        content: 'Phong Nha Travel sẽ lựa chọn những điểm dừng, những điểm đến đẹp để cho du khách có những khung cảnh đẹp nhất.'
    }, {
        icon: faCalendarDays,
        title: 'hệ thống book tour nhanh',
        content: 'Đội ngũ kỹ thuật của Phong Nha Travel luôn tối ưu hệ thống đảm bảo cho khách hàng có trải nghiệm book tour dễ dàng và nhanh nhất.'
    }, {
        icon: faComments,
        title: 'đội ngũ hỗ trợ tận tình',
        content: 'Hotline của Phong Nha Travel luôn thường trực. Đội ngũ hướng dẫn nhiều kinh nghiệm sẽ mang đến cho bạn những chuyến đi an tâm.'
    }, {
        icon: faHeart,
        title: 'to travel - to discovery',
        content: 'Hơn cả du lịch, mỗi chuyến đi còn là những trải nghiệm khám phá. Phong Nha Travel sẽ luôn đồng hành cùng bạn.'
    }
];

const TOURREIVEW_ITEMS = [
    {
        userId: +1,
        userName: 'Dương Đức',
        userImg: null,
        tourName: 'Tour ghép Phong Nha hằng ngày',
        comment: 'Phong nha travel rất tuyệt vời. Làm việc chuyên nghiệp, Gia đình chúng tôi rất vui dc trãi nghiệm QB cùng phong nha travel',
        rating: +4
    }, {
        userId: +1,
        userName: 'Dương Đại',
        userImg: null,
        tourName: 'Tour ghép Phong Nha hằng ngày',
        comment: 'Phong nha travel rất tuyệt vời. Làm việc chuyên nghiệp, Gia đình chúng tôi rất vui dc trãi nghiệm QB cùng phong nha travel',
        rating: +5
    }
];

const TOURSTYPE_ITEMS = [
    {
        image: TOUR_TYPE_1,
        title: 'tour deal'
    }, {
        image: TOUR_TYPE_2,
        title: 'tour hằng ngày'
    }, {
        image: TOUR_TYPE_3,
        title: 'tour mạo hiểm'
    }, {
        image: TOUR_TYPE_4,
        title: 'tour miền trung'
    }, {
        image: TOUR_TYPE_5,
        title: 'tour nổi bật'
    }, {
        image: TOUR_TYPE_6,
        title: 'tour phong nha trọn gói'
    }, {
        image: TOUR_TYPE_7,
        title: 'tour quảng bình trọn gói'
    }
];

const CATEGORY_ICONS = [
    {
        id: 6,
        title: 'tour nổi bật',
        code: 'td__star'
    }, {
        id: 4,
        title: 'tour hằng ngày',
        code: 'td__earth'
    }, {
        id: 7,
        title: 'tour deal',
        code: 'td__deal'
    }, {
        id: 5,
        title: 'tour phong nha trọn gói',
        code: 'td__pn'
    }
];

const SOCIAL_NETWORKS = [
    {
        src: zalo,
        href: 'https://zalo.me/0763700336',
        bgColor: 'default',
        target: '_blank'
    }, {
        src: phone,
        href: 'tel:0763700336',
        bgColor: 'phone',
        content: '0763700336'
    }, {
        src: instagram,
        href: '#',
        bgColor: 'instagram'
    }
];

export {
    SLIDER_IMAGES,
    fieldNames,
    MENU_ITEMS,
    GRIDTOUR_ITEMS_REMARKABLE,
    GRIDTOUR_ITEMS_DAILY,
    GRIDTOUR_ITEMS_PREFERENTIAL,
    PAGESINGLE_ITEMS,
    TOURREIVEW_ITEMS,
    TOURSTYPE_ITEMS,
    CATEGORY_ICONS,
    SOCIAL_NETWORKS
}