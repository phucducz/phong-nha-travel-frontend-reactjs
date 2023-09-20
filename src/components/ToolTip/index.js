import classNames from "classnames/bind";

import style from './ToolTip.module.scss';

const cx = classNames.bind(style);

function ToolTip({
    content,
    top = false,
    bottom = false,
    className
}) {
    const classes = cx('tooltip', {
        [className]: className,
        top,
        bottom
    });

    return (
        <div className={classes}>
            <div className={cx('tooltip__arrow')}></div>
            <p>{content}</p>
        </div>
    )
}

export default ToolTip;