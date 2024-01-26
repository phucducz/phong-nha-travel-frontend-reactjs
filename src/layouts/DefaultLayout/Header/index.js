import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Menu from '~/components/Menu';
import { routes } from "~/config";
import { MENU_ITEMS } from "~/constant";
import logo from '~/images/logophongnha.png';
import { setMenuActive } from "~/reducers/menu";
import style from './HeaderDefault.module.scss';

const cx = classNames.bind(style);

function Header() {
    const menu = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const { active } = menu;

    const handleMenuClick = id => {
        dispatch(setMenuActive({ id: id }));
    };

    return (
        <div className={cx('header_wrapper')}>
            <div className={cx('cn-header')}>
                <Link to={routes.Home} className={cx('header_left')} onClick={() => dispatch(setMenuActive({ id: 0 }))}>
                    <img className={cx('logo')} src={logo} alt='Phong nha Travel' />
                </Link>
                <div className={cx('header_right')}>
                    <Menu
                        data={MENU_ITEMS}
                        placement='bottom-start'
                        onClick={handleMenuClick}
                        activeIndex={active}
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;