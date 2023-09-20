import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './Woocommerce.module.scss';
import { MESSAGE_ICONS } from "~/constant";
import Button from "../Button";

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
                woocommerceMessageRef.current.setAttribute('class', cx(
                    classes,
                    'show-woocommerce',
                    status === 'success' ? 'success' : 'fail',
                    'woocommerce__message__content'
                ));
            }, 10);
        }
    }, [message]);

    const handleActionClick = (dataItem, dataCoupon) => {
        action(dataItem, dataCoupon.couponValue, data.itemRemove);
    }

    return (
        message && <div className={classes}>
            <div ref={woocommerceMessageRef} className={classesContent}>
                <span></span>
                {MESSAGE_ICONS.map(icon => icon.status === status && <FontAwesomeIcon key={icon.status} icon={icon.icon} />)}
                <p className={cx('content')}>
                    {data.item !== undefined ? `"${data.item.tourName} " ${message}. ` : message}
                    {actionMessage
                        && <Button
                            outline
                            className={cx('action')}
                            onClick={() => handleActionClick(data.item, data.coupon)}
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