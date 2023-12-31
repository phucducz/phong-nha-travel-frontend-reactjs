import {
    faCartShopping,
    faCheck,
    faChevronDown,
    faChevronRight,
    faEye,
    faEyeSlash,
    faTriangleExclamation,
    faTruck,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebookF,
    faLinkedinIn,
    faPinterest,
    faTwitter
} from "@fortawesome/free-brands-svg-icons";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const TOUR_TYPES = [
    {
        id: 0,
        type: 'order-most',
        content: 'tour book nhiều'
    }, {
        id: 1,
        type: 'hot',
        content: 'tour hot'
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
        id: 1,
        title: 'tour hằng ngày',
        url: '/tour-category/tour-hang-ngay',
        icon: null,
        subMenu: null
    }, {
        id: 2,
        title: 'tour quảng bình',
        url: '/tour-category/du-lich-quang-binh',
        icon: null,
        subMenu: null
    }, {
        id: 3,
        title: 'tour phong nha',
        url: '/tour-category/tour-phong-nha',
        icon: null,
        subMenu: null
    }, {
        id: 4,
        title: 'tours khác',
        url: '/tours/search',
        icon: faChevronDown,
        subMenu: {
            data: [
                {
                    id: 5,
                    title: 'tour miền trung',
                    url: '/tour-category/du-lich-mien-trung',
                    icon: faChevronRight,
                    subMenu: {
                        data: [
                            {
                                id: 6,
                                title: 'tour đà nẵng',
                                icon: faChevronRight,
                                url: '/tour-category/',
                                subMenu: {
                                    data: [
                                        {
                                            id: 7,
                                            title: 'tour deal',
                                            url: '/tour-category/',
                                            icon: null,
                                            subMenu: null
                                        }, {
                                            id: 8,
                                            title: 'tour deal',
                                            url: '/tour-category/',
                                            icon: faChevronRight,
                                            subMenu: {
                                                data: [
                                                    {
                                                        id: 9,
                                                        title: 'tour deal',
                                                        url: '/tour-category/',
                                                        icon: null,
                                                        subMenu: null
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }, {
                                id: 10,
                                title: 'tour hội an',
                                icon: null,
                                url: '/tour-category/',
                                subMenu: null
                            }
                        ]
                    }
                }, {
                    id: 11,
                    title: 'tour deal',
                    url: '/tour-category/tour-deal',
                    icon: null,
                    subMenu: null
                }, {
                    id: 12,
                    title: 'tour nổi bật',
                    url: '/tour-category/tour-noi-bat',
                    icon: null,
                    subMenu: null
                }, {
                    id: 13,
                    title: 'tour mạo hiểm',
                    url: '/tour-category/tour-mao-hiem',
                    icon: null,
                    subMenu: null
                }
            ]
        }
    }, {
        id: 14,
        title: 'thuê xe',
        url: '/',
        icon: null,
        subMenu: null
    }, {
        id: 15,
        title: 'cẩm nang',
        url: '/',
        icon: null,
        subMenu: null
    }, {
        id: 16,
        title: 'liên hệ',
        url: '/tour-category/lienhe',
        icon: null,
        subMenu: null
    }, {
        id: 17,
        url: routes.Cart,
        icon: faChevronDown,
        contentBefore: 'n',
        placement: 'bottom-end',
        subMenu: {
            data: [
                {
                    id: 17,
                    title: 'trang giỏ hàng',
                    icon: null,
                    url: routes.Cart,
                    subMenu: null
                }, {
                    id: 19,
                    title: 'trang thanh toán',
                    icon: null,
                    url: routes.CheckOut,
                    subMenu: null
                }, {
                    id: 20,
                    title: 'trang tài khoản',
                    icon: null,
                    url: routes.Account,
                    subMenu: null
                }
            ]
        }
    }
];

const GRIDTOUR_ITEMS = [
    {
        id: 0,
        marginLeft: 0,
        slider: true,
        flex: false
    }, {
        id: 1,
        slider: false,
        flex: true
    }, {
        id: 2,
        marginLeft: 0,
        slider: false,
        flex: false,
        round: true
    }
];
// const GRIDTOUR_ITEMS = [
//     {
//         id: 0,
//         topic: 1,
//         marginLeft: 0,
//         slider: true,
//         flex: false
//     }, {
//         id: 1,
//         topic: 2,
//         slider: false,
//         flex: true
//     }, {
//         id: 2,
//         topic: 1,
//         marginLeft: 0,
//         slider: true,
//         flex: false
//     }
// ];

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
        code: 'td__earth',
        title: 'đa dạng tour',
        content: 'Phong Nha Travel cung cấp nhiều loại Tour hằng ngày, mạo hiểm, trọn gói…'
    }, {
        code: 'td__banknote',
        title: 'giá tour hợp lý',
        content: 'Phong Nha Travel tối ưu hóa chi phí cho khách hàng book được tour giá hợp lý nhất, chất lượng tốt nhất.'
    }, {
        code: 'td__photocamera',
        title: 'điểm đến nhiều cảnh đẹp',
        content: 'Phong Nha Travel sẽ lựa chọn những điểm dừng, những điểm đến đẹp để cho du khách có những khung cảnh đẹp nhất.'
    }, {
        code: 'td__calendar',
        title: 'hệ thống book tour nhanh',
        content: 'Đội ngũ kỹ thuật của Phong Nha Travel luôn tối ưu hệ thống đảm bảo cho khách hàng có trải nghiệm book tour dễ dàng và nhanh nhất.'
    }, {
        code: 'td__chat',
        title: 'đội ngũ hỗ trợ tận tình',
        content: 'Hotline của Phong Nha Travel luôn thường trực. Đội ngũ hướng dẫn nhiều kinh nghiệm sẽ mang đến cho bạn những chuyến đi an tâm.'
    }, {
        code: 'td__heart',
        title: 'to travel - to discovery',
        content: 'Hơn cả du lịch, mỗi chuyến đi còn là những trải nghiệm khám phá. Phong Nha Travel sẽ luôn đồng hành cùng bạn.'
    }
];

const TOURREIVEW_ITEMS = [
    {
        userId: 1,
        userName: 'Dương Đức',
        userImg: null,
        tourName: 'Tour ghép Phong Nha hằng ngày',
        comment: 'Phong nha travel rất tuyệt vời. Làm việc chuyên nghiệp, Gia đình chúng tôi rất vui dc trãi nghiệm QB cùng phong nha travel',
        rating: 4
    }, {
        userId: 1,
        userName: 'Dương Đại',
        userImg: null,
        tourName: 'Tour ghép Phong Nha hằng ngày',
        comment: 'Phong nha travel rất tuyệt vời. Làm việc chuyên nghiệp, Gia đình chúng tôi rất vui dc trãi nghiệm QB cùng phong nha travel',
        rating: 5
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
        code: 'td__star',
        to: 'tour-category/tour-noi-bat'
    }, {
        id: 4,
        title: 'tour hằng ngày',
        code: 'td__earth',
        to: 'tour-category/tour-hang-ngay'
    }, {
        id: 7,
        title: 'tour deal',
        code: 'td__deal',
        to: 'tour-category/tour-deal'
    }, {
        id: 5,
        title: 'tour phong nha trọn gói',
        code: 'td__pn',
        to: 'tour-category/tour-phong-nha-tron-goi'
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

const INFO_TOUR = [
    {
        title: 'Giá tour trọn gói chưa bao gồm:',
        content: [
            'Hóa đơn GTGT',
            'Chi phí cá nhân, chi phí ăn uống, tham quan các điểm ngoài chương trình.'
        ]
    }, {
        title: 'Giá tour trẻ em:',
        content: [
            'Trẻ em từ 1,3m trở lên: giá tour như người lớn.',
            'Trẻ em từ 1,1m đến 1,3m: 50% giá tour người lớn.',
            'Trẻ em dưới 1,1m: Miễn phí.'
        ]
    }, {
        title: 'Nên mang theo gì?',
        content: [
            'Máy ảnh, quay phim.',
            'Sạc dự phòng cho các thiết bị di động.',
            'Sử dụng giày thể thao hoặc các loại giày dép mềm phù hợp với việc đi bộ.',
            'Khăn tắm cỡ lớn.',
            'Bikini, đồ bơi'
        ]
    }, {
        title: 'Lưu ý:',
        content: [
            'Phụ nữ đang mang thai sẽ không được phép tham gia chương trình này vì sự an toàn của bạn.',
            'Nhóm 06 khách trở lên chúng tôi sẽ tổ chức tour riêng hoặc tour ghép tùy theo tình hình thực tế nhưng vẫn bảo đảm chất lượng dịch vụ và chương trình không thay đổi.'
        ]
    }, {
        title: 'Phong Nha Travel',
        content: []
    }
];

const CATEGORIES_HREF = [
    {
        id: 1,
        title: 'Tour Miền Trung',
        href: 'tour-mien-trung'
    }, {
        id: 2,
        title: 'Tour Quảng Bình Trọn Gói',
        href: 'tour-quang-binh-tron-goi'
    }, {
        id: 3,
        title: 'Tour Mạo Hiểm',
        href: 'tour-mao-hiem'
    }, {
        id: 4,
        title: 'Tour Hằng Ngày',
        href: 'tour-hang-ngay'
    }, {
        id: 5,
        title: 'Tour Phong Nha Trọn Gói',
        href: 'tour-phong-nha-tron-goi'
    }, {
        id: 6,
        title: 'Tour Nổi Bật',
        href: 'tour-noi-bat'
    }, {
        id: 7,
        title: 'Tour Deal',
        href: 'tour-deal'
    }
];

const SHARE_BUTTONS = [
    {
        icon: faFacebookF,
        className: 'faFacebookF'
    }, {
        icon: faTwitter,
        className: 'faTwitter'
    }, {
        icon: faLinkedinIn,
        className: 'faLinkedinIn'
    }, {
        icon: faPinterest,
        className: 'faPinterest'
    }
];

const MESSAGE_ICONS = [
    {
        icon: faCheck,
        status: 'success'
    }, {
        icon: faTriangleExclamation,
        status: 'fail'
    }
];

const PASSWORD_RIGHT_ICONS = [
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faEye} />
    }, {
        id: 2,
        icon: <FontAwesomeIcon icon={faEyeSlash} />
    }
];

const SIDEBAR_NAV_ITEMS = [
    {
        id: 1,
        icon: faCartShopping,
        title: 'Products',
        children: [
            {
                id: '1_1',
                title: 'Product Management',
                to: '/products'
            }, {
                id: '1_2',
                title: 'Edit Product',
                to: '/edit-product'
            }
        ]
    }, {
        id: 2,
        icon: faTruck,
        title: 'E-commerce',
        children: [
            {
                id: '2_1',
                title: 'Order management',
                to: '/order-management'
            }
        ]
    }, {
        id: 3,
        icon: faUser,
        title: 'Users',
        children: [
            {
                id: '3_1',
                title: 'User Management',
                to: routes.UserManagement
            }, {
                id: '3_2',
                title: 'Edit Profile',
                to: routes.EditProfile
            }, {
                id: '3_3',
                title: 'Change Password',
                to: '/change-password'
            }
        ]
    }
]

const today = () => {
    let newDate = new Date();
    let bookeDate = `${newDate.getFullYear()}-${newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` :
        `${newDate.getMonth() + 1}`}-${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}`;

    return bookeDate;
};

const toLocalDate = date => {
    const list = date.split('/');

    return `${list[list.length - 1]}-${list[1]}-${list[0]}`;
}

export {
    today,
    toLocalDate,
    SLIDER_IMAGES,
    TOUR_TYPES,
    fieldNames,
    MENU_ITEMS,
    GRIDTOUR_ITEMS,
    GRIDTOUR_ITEMS_PREFERENTIAL,
    PAGESINGLE_ITEMS,
    TOURREIVEW_ITEMS,
    TOURSTYPE_ITEMS,
    CATEGORY_ICONS,
    SOCIAL_NETWORKS,
    INFO_TOUR,
    CATEGORIES_HREF,
    SHARE_BUTTONS,
    MESSAGE_ICONS,
    PASSWORD_RIGHT_ICONS,
    SIDEBAR_NAV_ITEMS
}