import classNames from "classnames/bind";

import style from './Avatar.module.scss';

const cx = classNames.bind(style);

function Avatar({
    className,
    src,
    alt
}) {
    const classes = cx('users-avatar', {
        [className]: className
    });

    let isNull = src === null ? true : false;
    
    let nameAtZeroIndex = alt.charAt(0);

    return (
        <div className={cx(isNull && 'avatar-null')}>
            <img className={classes} src={src} alt={alt} />
            {isNull && <p className={cx('name')}>{nameAtZeroIndex}</p>}
        </div>
    )
}

export default Avatar;