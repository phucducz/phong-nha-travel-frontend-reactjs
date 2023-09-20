import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Header.module.scss';

const cx = classNames.bind(style);

function Header({
    title,
    icon,
    onBack
}) {
    return (
        <div
            className={cx('popper_header')}
            onClick={onBack}
        >
            {icon
                && <FontAwesomeIcon
                    icon={icon}
                    className={cx('popper_header__icon')}
                />
            }
            {title
                && <p className={cx('popper_header__title')}>{title}</p>
            }
        </div>
    )
}

Header.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.object,
    onBack: PropTypes.func,
}

export default Header;