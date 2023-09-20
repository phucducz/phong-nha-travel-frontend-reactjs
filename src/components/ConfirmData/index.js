import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useRef } from "react";

import style from './ConfirmData.module.scss';
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function ConfirmData({
    id,
    title,
    children,
    visible,
    setVisible,
    className,
    onConfirmClick
}) {
    const classes = cx('confirm-data', {
        [className]: className
    });

    const confirmRef = useRef();
    const navigate = useNavigate();

    if (confirmRef.current) {
        if (visible) {
            setTimeout(() => {
                confirmRef.current.setAttribute('style', 'display: block');
            }, 400);
            setTimeout(() => {
                confirmRef.current.setAttribute('class', cx(classes, 'active'));
            }, 800);
        }
        else {
            setTimeout(() => {
                confirmRef.current.setAttribute('class', cx(classes, 'hide'));
            }, 100);
            setTimeout(() => {
                confirmRef.current.setAttribute('style', 'display: none');
            }, 400);
        }
    }


    const handleConfirmClick = () => {
        const { userId, destination, action } = onConfirmClick;

        setVisible(false);
        action(userId);
        navigate(destination);
    }

    return (
        <div
            ref={confirmRef}
            className={classes}
        >
            <header className={cx('confirm-data__title')}>
                <h3>{title}</h3>
            </header>
            {children}
            <footer className={cx('confirm-data__footer')}>
                <Button
                    className={cx('footer__btn-cancel')}
                    onClick={() => setVisible(false)}
                >
                    hủy bỏ
                </Button>
                <Button
                    className={cx('footer__btn-confirm')}
                    onClick={() => handleConfirmClick(id)}
                    href={onConfirmClick.destination}
                >
                    xác nhận
                </Button>
            </footer>
        </div>
    );
}

ConfirmData.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    visible: PropTypes.bool,
    className: PropTypes.string
}

ConfirmData.defaultProps = {
    visible: false
}

export default ConfirmData;