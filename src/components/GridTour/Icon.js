import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Icon.module.scss';
import ToolTip from "../ToolTip";

const cx = classNames.bind(style);

function Icon({
    data,
    href,
    className
}) {
    let to;

    const classes = cx('td', {
        [className]: className
    });

    if (href)
        to = href;
    else
        to = "#";

    return (
        <a href={to} className={classes}>
            {/* <FontAwesomeIcon icon={data.icon} /> */}
            <i className={data.code} />
            <ToolTip top content={data.title} />
        </a>
    );
}

export default Icon;