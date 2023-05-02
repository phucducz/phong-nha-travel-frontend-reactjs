import classNames from "classnames/bind";

import styles from "../ModalMessageStyle/ModalStyle.scss";

const cx = classNames.bind(styles);

function ModalMessage({ children }) {

    return (
        <div className={cx('content_message')}>
            {children}
        </div>
    )
}

export default ModalMessage;