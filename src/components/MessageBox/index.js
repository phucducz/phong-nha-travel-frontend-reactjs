import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { memo } from "react";

import style from './MessageBoxStyle.scss';
import Button from "~/components/Button";
import { useMessageBox } from "~/context";
import { putService, postService, deleteService } from "~/services";
import { INSERT_TOUR, DELETE_TOUR, UPDATE_TOUR } from "~/context/Message/constant";
import { getMessage } from "~/context/Message/actions";

const cx = classNames.bind(style);

function MessageBox({
    visible,
    setVisible,
    setVisibleContent,
    className,
    ...passProps
}) {
    const { 
        message,
        payload,
        action,
        dispatch,
        setResult,
        state 
    } = useMessageBox();

    const messageUI = useRef();
    const [status, setStatus] = useState([]);

    const classes = cx('message-box', {
        [className]: className,
    });

    useEffect(() => {
        setResult(state);
    }, [state]);

    useEffect(() => {
        dispatch(getMessage(status));
    }, [status]);

    const handleHide = () => {
        setVisible(false);
        messageUI.current.setAttribute('class', `${classes} hide-message`);
        setTimeout(() => {
            messageUI.current.style.display = 'none';
        }, 500);
    }

    const handleCancel = () => {
        handleHide();
    }

    const handleAccept = () => {
        switch (action) {
            case INSERT_TOUR:
                const insertTour = async () => {
                    const result = await postService('tours', payload);
                    if (Object.keys(result).length > 0) {
                        setStatus([
                            result.message,
                            result.status
                        ]); 
                    }
                }
                insertTour();
                handleHide();

                break;

            case UPDATE_TOUR:
                const updateTour = async () => {
                    const result = await putService('tours', payload);
                    if (Object.keys(result).length > 0) {
                        setStatus([
                            result.message,
                            result.status
                        ]);
                    }
                }
                updateTour();
                handleHide();
                
                break;

            case DELETE_TOUR:
                const deleteTour = async () => {
                    const result = await deleteService('tours', payload);
                    if (Object.keys(result).length > 0) {
                        setStatus([
                            result.message,
                            result.status
                        ]);
                    }
                }
                deleteTour();
                handleHide();

                break;

            default:
                throw new Error('Invalid action!');
        }

        setVisible(false);
        setVisibleContent(false);
    }

    if (messageUI.current) {
        if (visible) {
            messageUI.current.style.display = 'block';
            setTimeout(() => {
                messageUI.current.setAttribute('class', `${classes} active-message`);
            }, 200);
        }
        else {
            messageUI.current.setAttribute('class', `${classes} hide-message`);
            setTimeout(() => {
                messageUI.current.style.display = 'none';
            }, 500);
        }
    }

    return (
        <>
            <div
                className={classes}
                ref={messageUI}
                {...passProps}
            >
                <div className={cx("header")}>
                    {message.icon}
                </div>
                <div className={cx("body")}>
                    <h3>{message.messagePrimary}</h3>
                    <h3>{message.messageSub}</h3>
                </div>
                <div className={cx("footer")}>
                    <Button
                        cancel
                        onClick={() => handleCancel()}
                    >
                        Thoát
                    </Button>
                    <Button
                        primary
                        onClick={() => handleAccept()}
                    >
                        Đồng ý
                    </Button>
                </div>
            </div>
        </>
    )
}

MessageBox.propTypes = {
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    setVisibleContent: PropTypes.func,
    className: PropTypes.string,
}

export default memo(MessageBox);