import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";

import { MESSAGE_ICONS } from "~/constant";
import Button from "../Button";
import style from './Woocommerce.module.scss';

const cx = classNames.bind(style);

function WoocommerceMessage({
    data,
    action,
    className
}) {
    const { status, message, actionMessage } = data.message;

    const classes = cx('woocommerce__message', {
        [className]: className,
    });

    const classesContent = cx('woocommerce__message__content');

    const woocommerceMessageRef = useRef();

    useEffect(() => {
        if (message) {
            woocommerceMessageRef.current.setAttribute('class', cx(classes));

            setTimeout(() => {
                woocommerceMessageRef && woocommerceMessageRef.current.setAttribute('class', cx(
                    classes,
                    'show-woocommerce',
                    status === 'success' ? 'success' : 'fail',
                    'woocommerce__message__content'
                ));
            }, 10);
        }
    }, [message]);

    const handleActionClick = (data, dataCoupon) => {
        const { item, itemRemoved } = data;

        let postData = {
            ...item,
            userId: item.userId
        };

        action(postData, dataCoupon.couponValue, itemRemoved);
    }

    return (
        message && <div className={classes}>
            <div ref={woocommerceMessageRef} className={classesContent}>
                <span></span>
                {MESSAGE_ICONS.map(icon => icon.status === status && <FontAwesomeIcon key={icon.status} icon={icon.icon} />)}
                <p className={cx('content')}>
                    {data.item !== undefined ? `"${data.item.name} " ${message}. ` : message}
                    {actionMessage
                        && <Button
                            outline
                            className={cx('action')}
                            onClick={() => handleActionClick({
                                item: data.item,
                                itemRemoved: data.itemRemoved
                            }, data.coupon)}
                        >
                            {actionMessage}
                        </Button>
                    }
                </p>
            </div>
        </div>
    );
}

export default WoocommerceMessage;