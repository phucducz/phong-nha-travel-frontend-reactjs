import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLeaf,
    faBell,
    faQuestionCircle,
    faEllipsisVertical,
    faLanguage,
    faQuestion,
    faKeyboard,
    faMoon,
    faChevronLeft
} from "@fortawesome/free-solid-svg-icons";

import styles from "~/components/HeaderAdminStyles/HeaderAdminStyle.module.scss";
import { Popper as MenuPopper } from '~/components/Popper';
import { MenuItems } from "~/components/Popper";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: faLanguage,
        content: 'Việt Nam',
        children: {
            header: {
                icon: faChevronLeft,
                title: 'Language'
            },
            data: [
                {
                    content: 'English',
                    code: 'en'
                },
                {
                    content: 'Việt Nam',
                    code: 'vi'
                }
            ]
        }
    }, {
        icon: faQuestion,
        content: 'Feedback and help'
    }, {
        icon: faKeyboard,
        content: 'Keyboard and shortcut'
    }, {
        icon: faMoon,
        content: 'Dark mode'
    }
];

function Header() {
    let Logo = require('~/images/admin_logo_3.png');

    return (
        <div className={cx('wrapper-admin')}>
            <div className={cx('header')}>
                <div className={cx('header_title')}>
                    <FontAwesomeIcon icon={faLeaf} className={cx('title_icon')} />
                    <span>Administrator page</span>
                </div>
                <div className={cx('header_action')}>
                    <FontAwesomeIcon className={cx('bell')} icon={faBell} />
                    <FontAwesomeIcon className={cx('question')} icon={faQuestionCircle} />
                    <h3 className={cx('name')}>Hey, Duc Duong!</h3>
                    <img className={cx('image')} src={Logo} alt='Logo' />
                    <MenuPopper
                        icon={faEllipsisVertical}
                        placement='bottom-end'
                    >
                        <MenuItems
                            data={MENU_ITEMS}
                        />
                    </MenuPopper>
                </div>
            </div>
        </div >
    )
}

export default Header;