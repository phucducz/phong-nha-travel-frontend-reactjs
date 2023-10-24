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

    let nameAtIndex0 = alt.charAt(0);

    return (
        <div className={cx(isNull && 'avatar-null')}>
            <img className={classes} src={`../images/${src}`} alt={alt} />
            {isNull && <p className={cx('name')}>{nameAtIndex0}</p>}
        </div>
    )
}

export default Avatar;