import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Menu from '~/components/Menu';
import { routes } from "~/config";
import { MENU_ITEMS } from "~/constant";
import { useWindowsMouseDown, useWindowsResize } from "~/context";
import logo from '~/images/logophongnha.png';
import { setMenuActive } from "~/reducers/menu";
import style from './HeaderDefault.module.scss';

const cx = classNames.bind(style);

function Header() {
    const dispatch = useDispatch();
    const menu = useSelector(state => state.menu);
    const { active } = menu;

    const [mobileMode, setMobileMode] = useState(false);
    const [activeBar, setActiveBar] = useState(false);
    const menuRef = useRef();

    const handleMenuClick = id => {
        dispatch(setMenuActive({ id: id }));
        setActiveBar(false);
    };

    useWindowsResize(() => {
        if (window.matchMedia('(max-width: 930px)').matches) {
            setMobileMode(true);
            return;
        }
        setMobileMode(false);
    }, []);

    useWindowsMouseDown((e) => {
        if (!menuRef.current) return;

        if (menuRef.current.contains(e.target)) {
            setActiveBar(true);
            return;
        }

        setActiveBar(false);
    }, []);

    return (
        <div className={cx('header__wrapper')}>
            <div className={cx('cn-header')}>
                <Link to={routes.Home} className={cx('header__left')} onClick={() => dispatch(setMenuActive({ id: 0 }))}>
                    <img className={cx('logo')} src={logo} alt='Phong nha Travel' />
                </Link>
                <div className={cx('header__right')}>
                    {mobileMode && <FontAwesomeIcon
                        icon={activeBar ? faXmark : faBars}
                        className={cx('header__right__icon')}
                        onClick={() => setActiveBar(!activeBar)}
                    />}
                    <div ref={menuRef} className={cx('ul-responsive', activeBar && 'active')}>
                        <Menu
                            data={MENU_ITEMS}
                            placement='bottom-start'
                            onClick={handleMenuClick}
                            activeIndex={active}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;