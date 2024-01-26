import classNames from "classnames/bind";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useRef } from "react";

import style from './ToastMessage.module.scss';
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const cx = classNames.bind(style);

export const ToastMessage = memo(({
    content,
    type,
    duration,
    visible,
    setVisible
}) => {
    const toastRef = useRef(null);

    useEffect(() => {
        if (visible) {
            let durationTime = duration + 200;

            if (toastRef.current)
                toastRef.current.setAttribute('class', cx('toast-container', `${type}`, 'active'));

            const id = setTimeout(() => {
                if (toastRef.current)
                    toastRef.current.setAttribute('class', cx('toast-container', `${type}`));

                setVisible && setVisible(false);
            }, durationTime);

            return () => clearTimeout(id);
        }
        else if (toastRef.current)
            toastRef.current.setAttribute('class', cx('toast-container', type));
    }, [visible]);

    return (
        <div className={cx('toast-container', type)} ref={toastRef}>
            <div className={cx('toast-container__icon')}>
                <FontAwesomeIcon icon={faCheck} />
                <FontAwesomeIcon icon={faCircle} />
            </div>
            <p>{content}</p>
        </div>
    );
})