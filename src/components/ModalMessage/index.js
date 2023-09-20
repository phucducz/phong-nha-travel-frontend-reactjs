import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './ModalStyle.module.scss';

const cx = classNames.bind(style);

function ModalMessage({ 
    children
}) {
    return (
        <div className={cx('content_message')}>
            {children}
        </div>
    )
}

ModalMessage.propTypes = {
    children: PropTypes.node.isRequired
}

export default ModalMessage;