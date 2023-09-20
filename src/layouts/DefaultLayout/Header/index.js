import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import style from './HeaderDefault.module.scss';
import logo from '~/images/logophongnha.png';
import Menu from "~/components/Menu/Menu";
import { MENU_ITEMS } from "~/constant";
import { routes } from "~/config";

const cx = classNames.bind(style);

function Header() {
    return (
        <div className={cx('header_wrapper')}>
            <div className={cx('cn-header')}>
                <Link to={routes.Home} className={cx('header_left')}>
                    <img className={cx('logo')} src={logo} alt='Phong nha Travel' />
                </Link>
                <div className={cx('header_right')}>
                    <Menu
                        data={MENU_ITEMS}
                        placement='bottom-start'
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;


// import classNames from "classnames/bind";
// import { Link } from "react-router-dom";
// import {
//     faEllipsisVertical,
//     faLanguage,
//     faChevronLeft,
//     faQuestion,
//     faKeyboard,
//     faMoon
// } from "@fortawesome/free-solid-svg-icons";

// import style from './HeaderDefault.module.scss';
// import logo from '~/images/logophongnha.png';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { MenuItems } from '~/components/Popper';
// import { Popper as MenuPopper } from '~/components/Popper';

// const cx = classNames.bind(style);

// const MENU_ITEMS = [
//     {
//         icon: faLanguage,
//         title: 'Việt Nam',
//         subMenu: {
//             header: {
//                 icon: faChevronLeft,
//                 title: 'Language'
//             },
//             data: [
//                 {
//                     title: 'English',
//                     code: 'en'
//                 },
//                 {
//                     title: 'Việt Nam',
//                     code: 'vi'
//                 }
//             ]
//         }
//     }, {
//         icon: faQuestion,
//         title: 'Feedback and help'
//     }, {
//         icon: faKeyboard,
//         title: 'Keyboard and shortcut'
//     }, {
//         icon: faMoon,
//         title: 'Dark mode'
//     }
// ]

// function Header() {
//     return (
//         <div className={cx('header__container')}>
//             <div className={cx('menu')}>
//                 <div className={cx('menu-left')}>
//                     <li className={cx('menu-li')}>
//                         <Link to="/" className={cx('menu-a')}>
//                             <img className={cx('logo-image')} src={logo} alt="Phong Nha Travel" />
//                         </Link>
//                     </li>
//                 </div>
//                 <div className={cx('menu-right')}>
//                     <li className={cx('menu-li')}>
//                         <i className={cx('fa-brands fa-dailymotion')}></i>
//                         <Link to="" className={cx('menu-a')}>TOUR HẰNG NGÀY</Link>
//                     </li>
//                     <li className={cx('menu-li has-child')}>
//                         <i className={cx('fa-solid fa-exclamation')}></i>
//                         <Link to="" className={cx('menu-a')}>
//                             TOURS KHÁC
//                         </Link>
//                         <ul className={cx('sub-menu')}>
//                             <li><Link to="">tour miền trung</Link></li>
//                             <li><Link to="">tour deal</Link></li>
//                             <li className={cx('has-child')}><Link to="">tour nổi bật</Link>
//                                 <ul className={cx('sub-menu_standout')}>
//                                     <li><Link to="">tour miền trung</Link></li>
//                                     <li><Link to="">tour deal</Link></li>
//                                     <li><Link to="">tour nổi bật</Link></li>
//                                     <li><Link to="">tour mạo hiểm</Link></li>
//                                 </ul>
//                             </li>
//                             <li><Link to="">tour mạo hiểm</Link></li>
//                         </ul>
//                     </li>
//                     <li className={cx('menu-li')}>
//                         <i className={cx('fa-solid fa-car')}></i>
//                         <Link to="" className={cx('menu-a')}>THUÊ XE</Link>
//                     </li>
//                     <li className={cx('menu-li')}>
//                         <i className={cx('fa-solid fa-address-book')}></i>
//                         <Link to="/Camnang" className={cx('menu-a')}>CẨM NANG</Link>
//                     </li>
//                     <li className={cx('menu-li')}>
//                         <i className={cx('fa-solid fa-phone')}></i>
//                         <Link to="./lienhe.html" className={cx('menu-a')}>LIÊN HỆ</Link>
//                     </li>
//                     <li className={cx('menu-li has-child')}><Link to="/Cart" className={cx('menu-a')}>
//                         <i style={{ color: '#000' }} className={cx('fa-solid fa-cart-shopping')}></i>
//                     </Link>
//                         <ul className={cx('menu-li__sub-menu')}>
//                             <li><Link to="/cartpage">trang giỏ hàng</Link></li>
//                             <li><Link to="">trang thanh toán</Link></li>
//                             <li><Link to="/account">trang tài khoản</Link></li>
//                         </ul>
//                     </li>
//                     <MenuPopper
//                         icon={faEllipsisVertical}
//                         placement='bottom-end'
//                     >
//                         <MenuItems data={MENU_ITEMS} />
//                     </MenuPopper>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Header