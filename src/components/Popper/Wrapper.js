import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Popper.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(style);

function Wrapper({
    className,
    children,
    icon,
    content,
    placement
}) {
    const classes = cx('popper', {
        [className]: className
    });

    const classItem = cx('cr-item', {
        [placement]: placement
    });

    return (
        <div className={classes}>
            <div className={cx('menu')}>
                {icon && <span><FontAwesomeIcon icon={icon} /></span>}
                {content && <span><p>{content}</p></span>}
                <div className={classItem}>
                    {children}
                </div>
            </div>
        </div>
    )
}

Wrapper.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    icon: PropTypes.object,
    content: PropTypes.string,
    placement: PropTypes.string,
}

export default Wrapper;