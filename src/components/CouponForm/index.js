import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { memo } from "react";

import style from './CouponFormStyle.module.scss';
import Input from "../Input";
import Button from "../Button";

const cx = classNames.bind(style);

function CouponForm({
    value,
    className,
    mini = false,
    tiny = false,
    small = false,
    large = false,
    handleSubmit,
    onChange
}) {
    const classes = cx('group-coupon', {
        [className]: className
    });

    const size = {
        small,
        large,
        tiny,
        mini
    };

    const inputRef = useRef();

    const formik = useFormik({
        initialValues: { couponCode: value },
        onSubmit: values => {
            handleSubmit(values.couponCode);
        }
    });

    useEffect(() => {
        formik.setValues({ couponCode: value });
    }, [value]);

    return (
        <form className={classes} onSubmit={formik.handleSubmit}>
            <Input
                required
                {...size}
                ref={inputRef}
                className={cx('group-coupon__input')}
                value={value}
                name='coupon'
                placeHolder='Mã ưu đãi'
                onChange={onChange}
            />
            <Button
                className={cx('group-coupon__button')}
                type='submit'
            >
                áp dụng
            </Button>
        </form>
    );
}

export default memo(CouponForm);