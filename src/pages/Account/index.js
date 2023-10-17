import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';

import style from "./AccountStyle.module.scss";
import Input from "~/components/Input";
import Button from "~/components/Button";
import { PASSWORD_RIGHT_ICONS } from "~/constant";
import { setLoading } from "~/reducers/loading";

const cx = classNames.bind(style);

function AccountPage() {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            phone: '',
            email: '',
            isSignUp: false,
            rightIconIndex: 1
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('Vui lòng nhập tên đăng nhập')
                .matches(/^[a-zA-Z0-9]+$/, "Vui lòng không nhập ký tự đặc biệt"),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu')
                .matches(/^[a-zA-Z0-9]+$/, "Vui lòng không nhập ký tự đặc biệt"),
        }),
        onSubmit: values => {
            console.log(values);
        }
    });

    let icon = PASSWORD_RIGHT_ICONS.find(item =>
        item.id === formik.values.rightIconIndex
    );

    const handleRightIconClick = index => {
        if (index === 1) {
            formik.setFieldValue('rightIconIndex', 2);
            return;
        }

        formik.setFieldValue('rightIconIndex', 1);
    }

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            userName: '',
            password: '',
            rightIconIndex: 1
        });

        formik.setTouched({});
    }, [formik.values.isSignUp]);

    const SIGNUP_INPUTS = [
        {
            props: {
                fieldName: 'Username or email address',
                name: 'userName',
                value: formik.values.userName,
                placeHolder: 'Username or email address',
                error: formik.errors.userName,
                touched: formik.touched.userName,
                onChange: formik.handleChange,
                onFocus: () => formik.setFieldTouched('userName', true)
            }
        }, {
            props: {
                fieldName: 'Password',
                name: 'password',
                value: formik.values.password,
                className: cx('signup__password__input'),
                placeHolder: 'Password',
                type: formik.values.rightIconIndex === 1 ? 'password' : 'text',
                error: formik.errors.password,
                touched: formik.touched.password,
                rightIcon: icon.icon,
                onChange: formik.handleChange,
                onFocus: () => formik.setFieldTouched('password', true),
                onRightIconClick: () => handleRightIconClick(formik.values.rightIconIndex)
            }
        }, {
            props: {
                fieldName: 'Phone number',
                name: 'phone',
                value: formik.values.phone,
                placeHolder: 'Phone number',
                error: formik.errors.phone,
                touched: formik.touched.phone,
                onChange: formik.handleChange,
                onFocus: () => formik.setFieldTouched('phone', true)
            }
        }, {
            props: {
                fieldName: 'Email',
                name: 'email',
                value: formik.values.email,
                placeHolder: 'Username or email address',
                error: formik.errors.email,
                touched: formik.touched.email,
                onChange: formik.handleChange,
                onFocus: () => formik.setFieldTouched('email', true)
            }
        }
    ];
    
    const handleSignUpClick = () => {
        dispatch(setLoading(true));
        
        setTimeout(() => {
            formik.setFieldValue('isSignUp', true);
            dispatch(setLoading(false));
        }, 2000);
    }

    return (
        <form className={cx('account')} onSubmit={formik.handleSubmit} >
            <div className={cx('account__login', formik.values.isSignUp && 'disable')}>
                <h3 className={cx('login__title')}>Login</h3>
                <Input
                    required
                    fieldName='Username or email address'
                    width='100%'
                    name='userName'
                    value={formik.values.userName}
                    placeHolder='Username or email address'
                    error={formik.errors.userName}
                    touched={formik.touched.userName}
                    onChange={formik.handleChange}
                    onFocus={() => formik.setFieldTouched('userName', true)}
                />
                <Input
                    required
                    fieldName='Password'
                    width='100%'
                    name='password'
                    value={formik.values.password}
                    className={cx('login__password__input')}
                    placeHolder='Password'
                    type={formik.values.rightIconIndex === 1 ? 'password' : 'text'}
                    rightIcon={icon.icon}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    onRightIconClick={() => handleRightIconClick(formik.values.rightIconIndex)}
                    onChange={formik.handleChange}
                    onFocus={() => formik.setFieldTouched('password', true)}
                />
                <Button
                    type='submit'
                    className={cx('account__login__button')}
                >
                    Login
                </Button>
                <div className={cx('account__login__lost-pass')}>
                    <p className={cx('lost-pass')}>Forgot Password</p>
                    <p className={cx('sigin-up')}>
                        <span>Not a member?</span>
                        <span onClick={handleSignUpClick}>Sign up.</span>
                        {/* <span onClick={() => formik.setFieldValue('isSignUp', true)}>Sign up.</span> */}
                    </p>
                </div>
            </div>
            <div className={cx('account__sign-up', formik.values.isSignUp && 'active')} >
                <h3 className={cx('sign-up__title')}>Sign up</h3>
                {SIGNUP_INPUTS.map((input, index) =>
                    <Input key={index} required width='100%' {...input.props} />
                )}
                <Button
                    type='submit'
                    className={cx('account__signup__button')}
                >
                    Sign up
                </Button>
                <p className={cx('account__signup__already')}>
                    <span>Do you already have an account?</span>
                    <span onClick={() => formik.setFieldValue('isSignUp', false)}>Login.</span>
                </p>
            </div>
        </form>
    );
}

export default AccountPage;