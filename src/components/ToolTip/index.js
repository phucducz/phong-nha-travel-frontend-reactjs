import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './ToolTip.module.scss';

const cx = classNames.bind(style);

function ToolTip({
    content,
    placement,
    className
}) {
    const classes = cx('tooltip', {
        [className]: className,
        [placement]: placement
    });

    return (
        <div className={classes}>
            <div className={cx('tooltip__arrow')}></div>
            <p>{content}</p>
        </div>
    )
}

ToolTip.propTypes = {
    content: PropTypes.string,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    className: PropTypes.string,
}

export default ToolTip;