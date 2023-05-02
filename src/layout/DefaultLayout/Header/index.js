import { Link, useNavigate } from "react-router-dom";
import HeaderStyle from "~/components/HeaderStyles";
import logo from '~/images/logophongnha.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
    
    return (
        <HeaderStyle>
            <div className="header__container">
                <ul className="menu-ul">
                    <div className="menu-left">
                        <li className="menu-li">
                            <Link to="/" className="menu-a">
                                <img className="logo-image" src={logo} alt="Phong Nha Travel" />
                            </Link>
                        </li>
                    </div>
                    <div className="menu-right">
                        <li className="menu-li">
                            <i className="fa-brands fa-dailymotion"></i>
                            <Link to="" className="menu-a">TOUR HẰNG NGÀY</Link>
                        </li>
                        <li className="menu-li has-child">
                            <i className="fa-solid fa-exclamation"></i>
                            <Link to="" className="menu-a">
                                TOURS KHÁC
                                {/* <span className="sub-menu-icon"></span> */}
                            </Link>
                            <ul className="sub-menu">
                                <li><Link to="">tour miền trung</Link></li>
                                <li><Link to="">tour deal</Link></li>
                                <li className="has-child"><Link to="">tour nổi bật</Link>
                                    <ul className="sub-menu_standout">
                                        <li><Link to="">tour miền trung</Link></li>
                                        <li><Link to="">tour deal</Link></li>
                                        <li><Link to="">tour nổi bật</Link></li>
                                        <li><Link to="">tour mạo hiểm</Link></li>
                                    </ul>
                                </li>
                                <li><Link to="">tour mạo hiểm</Link></li>
                            </ul>
                        </li>
                        <li className="menu-li">
                            <i className="fa-solid fa-car"></i>
                            <Link to="" className="menu-a">THUÊ XE</Link>
                        </li>
                        <li className="menu-li">
                            <i className="fa-solid fa-address-book"></i>
                            <Link to="/Camnang" className="menu-a">CẨM NANG</Link>
                        </li>
                        <li className="menu-li">
                            <i className="fa-solid fa-phone"></i>
                            <Link to="./lienhe.html" className="menu-a">LIÊN HỆ</Link>
                        </li>
                        <li className="menu-li has-child"><Link to="/Cart" className="menu-a">
                            <i style={{ color: '#000' }} className="fa-solid fa-cart-shopping"></i>
                            {/* <span className="sub-menu-icon"></span> */}
                        </Link>
                            <ul className="menu-li__sub-menu">
                                <li><Link to="/cartpage">trang giỏ hàng</Link></li>
                                <li><Link to="">trang thanh toán</Link></li>
                                <li><Link to="/account">trang tài khoản</Link></li>
                            </ul>
                        </li>
                    </div>
                </ul>
            </div>
        </HeaderStyle>
    )
}

export default Header