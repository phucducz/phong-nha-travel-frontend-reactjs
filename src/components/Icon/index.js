import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './Icon.module.scss';
import ToolTip from "../ToolTip";

const cx = classNames.bind(style);

function Icon({
    data,
    href,
    toolTip = false,
    className,
    ...passProps
}) {
    const classes = cx('td', {
        [className]: className
    });

    return (
        <div className={classes} {...passProps}>
            <i className={data.code} />
            {toolTip && <ToolTip placement='top' content={data.title} />}
        </div>
    );
}

Icon.propTypes = {
    data: PropTypes.object.isRequired,
    href: PropTypes.string,
    toolTip: PropTypes.bool,
    className: PropTypes.string,
}

export default Icon;