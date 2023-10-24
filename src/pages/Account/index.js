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
import { postService } from "~/services";

const cx = classNames.bind(style);

function AccountPage() {
    const dispatch = useDispatch();

    const signinFormik = useFormik({
        initialValues: {
            userName: '',
            password: '',
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
            const { userName, password } = values;

            postService('/users/login', { userName, password });
        }
    });

    const signupFormik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            phone: '',
            email: '',
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
        item.id === signinFormik.values.rightIconIndex
    );

    const handleRightIconClick = index => {
        if (index === 1) {
            signinFormik.setFieldValue('rightIconIndex', 2);
            return;
        }

        signinFormik.setFieldValue('rightIconIndex', 1);
    }

    console.log(signinFormik);

    useEffect(() => {
        signinFormik.setValues({
            ...signinFormik.values,
            userName: '',
            password: '',
            rightIconIndex: 1
        });

        signinFormik.setTouched({});
    }, [signinFormik.values.isSignUp]);

    const SIGNUP_INPUTS = [
        {
            props: {
                fieldName: 'Username or email address',
                name: 'userName',
                value: signupFormik.values.userName,
                placeHolder: 'Username or email address',
                error: signupFormik.errors.userName,
                touched: signupFormik.touched.userName,
                onChange: signupFormik.handleChange,
                onFocus: () => signupFormik.setFieldTouched('userName', true)
            }
        }, {
            props: {
                fieldName: 'Password',
                name: 'password',
                value: signupFormik.values.password,
                className: cx('signup__password__input'),
                placeHolder: 'Password',
                type: signupFormik.values.rightIconIndex === 1 ? 'password' : 'text',
                error: signupFormik.errors.password,
                touched: signupFormik.touched.password,
                rightIcon: icon.icon,
                onChange: signupFormik.handleChange,
                onFocus: () => signupFormik.setFieldTouched('password', true),
                onRightIconClick: () => handleRightIconClick(signupFormik.values.rightIconIndex)
            }
        }, {
            props: {
                fieldName: 'Phone number',
                name: 'phone',
                value: signupFormik.values.phone,
                placeHolder: 'Phone number',
                error: signupFormik.errors.phone,
                touched: signupFormik.touched.phone,
                onChange: signupFormik.handleChange,
                onFocus: () => signupFormik.setFieldTouched('phone', true)
            }
        }, {
            props: {
                fieldName: 'Email',
                name: 'email',
                value: signupFormik.values.email,
                placeHolder: 'Username or email address',
                error: signupFormik.errors.email,
                touched: signupFormik.touched.email,
                onChange: signupFormik.handleChange,
                onFocus: () => signupFormik.setFieldTouched('email', true)
            }
        }
    ];

    const handleSignUpClick = () => {
        dispatch(setLoading(true));

        setTimeout(() => {
            signinFormik.setFieldValue('isSignUp', true);
            dispatch(setLoading(false));
        }, 1000);
    }

    const handleSignInClick = () => {
        dispatch(setLoading(true));

        setTimeout(() => {
            signinFormik.setFieldValue('isSignUp', false);
            dispatch(setLoading(false));
        }, 1000);
    }

    return (
        <div className={cx('account')}>
            <form onSubmit={signinFormik.handleSubmit}>
                <div className={cx('account__login', signinFormik.values.isSignUp && 'disable')}>
                    <h3 className={cx('login__title')}>Login</h3>
                    <Input
                        required
                        fieldName='Username or email address'
                        width='100%'
                        name='userName'
                        value={signinFormik.values.userName}
                        placeHolder='Username or email address'
                        error={signinFormik.errors.userName}
                        touched={signinFormik.touched.userName}
                        onChange={signinFormik.handleChange}
                        onFocus={() => signinFormik.setFieldTouched('userName', true)}
                    />
                    <Input
                        required
                        fieldName='Password'
                        width='100%'
                        name='password'
                        value={signinFormik.values.password}
                        className={cx('login__password__input')}
                        placeHolder='Password'
                        type={signinFormik.values.rightIconIndex === 1 ? 'password' : 'text'}
                        rightIcon={icon.icon}
                        error={signinFormik.errors.password}
                        touched={signinFormik.touched.password}
                        onRightIconClick={() => handleRightIconClick(signinFormik.values.rightIconIndex)}
                        onChange={signinFormik.handleChange}
                        onFocus={() => signinFormik.setFieldTouched('password', true)}
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
                            <span onClick={handleSignUpClick}>Sign up</span>
                        </p>
                    </div>
                </div>
            </form>
            <form onSubmit={signupFormik.handleSubmit}>
                <div className={cx('account__sign-up', signinFormik.values.isSignUp && 'active')} >
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
                        <span onClick={handleSignInClick}>Login</span>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default AccountPage;