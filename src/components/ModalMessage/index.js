import classNames from "classnames/bind";

import style from './ModalStyle.module.scss';

const cx = classNames.bind(style);

function ModalMessage({ 
    children,
    visible
}) {
    return (
        <div className={cx('content_message')}>
            {children}
        </div>
    )
}

export default ModalMessage;