import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './SocialNetwork.module.scss';
import Item from "./Item";

const cx = classNames.bind(style);

function SocialNetWork({
    data,
    className,
    ...passProps
}) {
    const classes = cx('social-network', {
        [className]: className
    });

    return (
        <div className={classes} {...passProps}>
            {data.map((item, index) => <Item key={index} data={item} />)}
        </div>
    );
}

SocialNetWork.propTypes = {
    data: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default SocialNetWork;