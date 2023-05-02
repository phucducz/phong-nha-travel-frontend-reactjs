import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import styles from "../NoticeMessageStyles/NoticeMessageStyle.scss";
import * as deleteService from "~/apiService/deleteService.js";
import axios from "axios";

const cx = classNames.bind(styles);

function NoticeMessage(props) {
    const [activeUI, setActiveUI] = useState(false);
    const { message, setActive, action, payload } = props;
    const messageUI = useRef();

    console.log(props);

    useEffect(() => {
        console.log('work', setActive.statusNotice);
        setActiveUI(setActive.statusNotice);
    }, [setActive.statusNotice]);

    const hideMessage = () => {
        setActive.setActiveConfirm && setActive.setActiveConfirm('');
        setActive.setStatusNotice && setActive.setStatusNotice(false);

        setTimeout(() => {
            setActive.modalMessage.current.style.display = "none";
        }, 500);
        
        setActiveUI(false);
    }

    console.log(payload);

    const actionAccept = () => {
        if (action === 'delete') {
            const deleteTour = async () => {
                const res = await deleteService.deleteAPI('bookedDetails', payload);
                console.log(res);
            }

            deleteTour();
            setActive.setStatus('Delete success!');
        }
        hideMessage();
    }

    return (
        <>
            {message.status !== null
                ? <div
                    className={cx(`notice ${message.status === 1 ? "success" : "failure"} ${activeUI === false && "hide"}`
                    )}
                    ref={messageUI}
                >
                    <div className={cx("header")}>
                        {message.icon}
                    </div>
                    <div className={cx("body")}>
                        <h3>{message.messagePrimary}</h3>
                        <h3>{message.messageSub}</h3>
                    </div>
                    <div className={cx("footer")}>
                        <button
                            onClick={() => hideMessage()}
                        >
                            <p>Thoát</p>
                        </button>
                        <button
                            onClick={() => actionAccept()}
                        >
                            <p>Đồng ý</p>
                        </button>
                    </div>
                </div>
                : <></>
            }
        </>
    )
}

export default NoticeMessage;