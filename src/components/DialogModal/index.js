import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import Button from "../Button";
import style from './DialogModal.module.scss';

const cx = classNames.bind(style);

function DialogModal({
    title,
    message,
    visible,
    className,
    confirmOnClick,
    cancelOnclick,
    ...passProps
}) {
    const formRef = useRef();
    const [statusForm, setStatusForm] = useState('');

    const classes = cx('dialog-container', {
        [className]: className,
        visible
    });

    const containerRef = useRef();

    useEffect(() => {
        if (!visible) {
            console.log(containerRef.current);
            if(containerRef.current === null) return;

            setStatusForm('');

            const timeoutId = setTimeout(() => {
                containerRef.current.style = 'display: none';
            }, 500);

            return () => clearTimeout(timeoutId);
        }

        containerRef.current.style = 'display: block';
        setStatusForm('show');
    }, [visible]);

    return (
        <div className={classes} ref={containerRef}>
            <div
                ref={formRef}
                className={cx(statusForm)}
                {...passProps}
            >
                <header className={cx('row-header')}>
                    <p className={cx('col__title')}>{title}</p>
                    <Button className={cx('col__close-button')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </header>
                <div className={cx('row-body')}>
                    <p className={cx('col-body__message')}>{message}</p>
                </div>
                <footer className={cx('row-footer')}>
                    <Button type='button' className={cx('col__cancel-button')} onClick={cancelOnclick}>cancel</Button>
                    <Button type='submit' className={cx('col__confirm-button')} onClick={confirmOnClick}>confirm</Button>
                </footer>
            </div>
        </div>
    );
}

export default DialogModal;