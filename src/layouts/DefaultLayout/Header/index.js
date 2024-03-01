import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useState } from "react";
import Menu from '~/components/Menu';
import { routes } from "~/config";
import { MENU_ITEMS } from "~/constant";
import { useWindowResize } from "~/context";
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

    const handleMenuClick = id => {
        dispatch(setMenuActive({ id: id }));
    };

    useWindowResize(() => {
        if (window.matchMedia('(max-width: 900px)').matches) {
            setMobileMode(true);
            return;
        }
        setMobileMode(false);
    }, []);

    return (
        <div className={cx('header_wrapper')}>
            <div className={cx('cn-header')}>
                <Link to={routes.Home} className={cx('header_left')} onClick={() => dispatch(setMenuActive({ id: 0 }))}>
                    <img className={cx('logo')} src={logo} alt='Phong nha Travel' />
                </Link>
                <div className={cx('header_right')}>
                    {mobileMode && <FontAwesomeIcon
                        icon={activeBar ? faXmark : faBars}
                        className={cx('header_right__icon')}
                        onClick={() => setActiveBar(!activeBar)}
                    />}
                    <div className={cx('ul-responsive', activeBar && 'active')}>
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