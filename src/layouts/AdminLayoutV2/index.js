import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsUpDown, faCalendar, faChevronLeft, faGear, faInbox, faList, faRightFromBracket, faSearch, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

import style from './AdminLayoutV2.module.scss';
import logo from '~/images/logophongnha.png'
import { SIDEBAR_NAV_ITEMS } from "~/constant";
import ToolTip from "~/components/ToolTip";
import Input from "~/components/Input";
import DropDown from "~/components/Menu/DropDown";

const cx = classNames.bind(style);

const MENU_ITEMS = [
    {
        id: 1,
        icon: faUser,
        title: 'my account'
    }, {
        id: 2,
        icon: faCalendar,
        title: 'calendar'
    }, {
        id: 3,
        icon: faInbox,
        title: 'inbox'
    }, {
        id: 4,
        icon: faRightFromBracket,
        title: 'logout'
    }
];

function AdminLayout({ children }) {
    const [searchValue, setSearchValue] = useState('');
    const [linkGroupItem, setLinkGroupItem] = useState(-1);
    const [active, setActive] = useState({
        linkWrapperActive: 1,
        linkChildrenActive: -1,
        collapsingSidebar: true,
        settingActive: false
    });

    return (
        <div className={cx('admin-page__header')}>
            <header className={cx('admin-page__header__sidebar', active.collapsingSidebar ? 'collapsing-on' : 'collapsing-off')}>
                <span className={cx('title')}></span>
                <ul className={cx('link-wrapper')}>
                    {SIDEBAR_NAV_ITEMS.map(item => {
                        let isActive = item.id === active.linkWrapperActive;
                        let isParent = item.children && item.children.length > 0;

                        let itemHeight = 3.6;
                        let itemPadding = 2;
                        let height = itemHeight * item.children.length + itemPadding;

                        return (
                            <li
                                key={item.id}
                                className={cx('link-wrapper__item',
                                    isActive && 'active'
                                )}
                                onClick={() => setActive({ ...active, linkWrapperActive: item.id })}
                            >
                                <Link>
                                    <FontAwesomeIcon icon={item.icon} className={cx('link-wrapper__item__caret')} />
                                    <p>{item.title}</p>
                                    {isParent
                                        && <FontAwesomeIcon
                                            icon={faChevronLeft}
                                            className={cx('link-wrapper__item__chevron')}
                                        />}
                                </Link>
                                {isParent
                                    && <ul
                                        className={cx('link-group')}
                                        style={{
                                            height: isActive ? `${height}rem` : '0rem',
                                            padding: isActive && '1rem'
                                        }}
                                    >
                                        {item.children.map(item => {
                                            let isActive = item.id === linkGroupItem;
                                            return (
                                                <Link
                                                    key={item.id}
                                                    className={cx('link-group__item', isActive && 'active')}
                                                    to={item.to}
                                                    onClick={() => setLinkGroupItem(item.id)}
                                                >
                                                    {item.title}
                                                </Link>
                                            )
                                        })}
                                    </ul>
                                }
                            </li>
                        )
                    })}
                </ul>
            </header>
            <div className={cx('layout-wrap')}>
                <header className={cx('admin-page__header__nav')}>
                    <div className={cx('admin-page__header-left')}>
                        <ul className={cx('my-auto')}>
                            <li className={cx('my-auto__collapsing')} onClick={() => setActive({ ...active, collapsingSidebar: !active.collapsingSidebar })} >
                                <FontAwesomeIcon icon={faList} />
                                <ToolTip content='Turn on/off sidebar collapsing' placement='bottom' />
                            </li>
                            <li><FontAwesomeIcon icon={faArrowsUpDown} /></li>
                            <li><FontAwesomeIcon icon={faXmark} /></li>
                        </ul>
                        <form className={cx('search-dashboard-input')}>
                            <Input
                                className={cx('search-dashboard-input__search')}
                                value={searchValue}
                                required
                                small
                                placeHolder='Search dashboard'
                                outline='none'
                                leftIcon={<FontAwesomeIcon className={cx('left-icon')} icon={faSearch} />}
                                onChange={e => setSearchValue(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className={cx('layout-wrap__header')}>
                        <ul className={cx('search-dashboard')}>
                            <li className={cx('notification')}>
                                <span><img src={logo} alt='admin avatar' /></span>
                                <span className={cx('notification__title')}>Admin name</span>
                            </li>
                            <li className={cx('search-dashboard__tutorial-dropdown')}>
                                <FontAwesomeIcon icon={faGear} />
                                <DropDown className={cx('dropdown__link')} data={{ data: MENU_ITEMS }} placement="bottom-end" iconPosition='left' />
                            </li>
                        </ul>
                    </div>
                </header>
                <div className={cx('layout-wrap__content')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;