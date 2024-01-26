import classNames from "classnames/bind";

import style from './LoadingStyle.module.scss';

const cx = classNames.bind(style);

function Loading({ visible }) {
    return (
        visible && <div className={cx('loading')}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Loading;