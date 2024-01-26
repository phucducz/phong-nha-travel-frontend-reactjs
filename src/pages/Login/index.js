import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import Button from "~/components/Button";
import Input from "~/components/Input";
import Loading from "~/components/Loading";
import { PASSWORD_RIGHT_ICONS } from "~/constant";
import { login } from "~/reducers/login";
import { signUp } from "~/reducers/signup";
import style from "./LoginStyle.module.scss";

const cx = classNames.bind(style);

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginSlice = useSelector(state => state.login);
    const signUpSlice = useSelector(state => state.signUp);

    const signinFormik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            isSignUp: false,
            rightIconIndex: 1
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('Vui lòng nhập tên đăng nhập'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu')
                .matches(/^[a-zA-Z0-9]+$/, "Vui lòng không nhập ký tự đặc biệt"),
        }),
        onSubmit: values => {
            const { userName, password } = values;

            dispatch(login({
                userName,
                password,
                navigate: (path) => navigate(path)
            }));
        }
    });

    const signUpFormik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            phoneNumber: '',
            email: '',
            firstName: '',
            lastName: '',
            rightIconIndex: 1
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required('Vui lòng nhập tên đăng nhập'),
            firstName: Yup.string()
                .required('Không được để trống'),
            lastName: Yup.string()
                .required('Không được để trống'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu')
                .matches(/^[a-zA-Z0-9]+$/, "Vui lòng không nhập ký tự đặc biệt"),
            phoneNumber: Yup.string()
                .required('Vui lòng nhập số điện thoại của bạn!')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/, 'Vui lòng nhập số điện thoại đúng định dạng (10 chữ số) !'),
            email: Yup.string()
                .required("Không được để trống!")
                .matches(/^\S+@\S+\.\S+$/, "Vui lòng nhập địa chỉ email đúng định dạng(abc@xyz.def)"),
        }),
        onSubmit: values => {
            const { firstName, lastName, userName, password, phoneNumber, email } = values;

            dispatch(signUp({
                firstName,
                lastName,
                userName,
                password,
                phoneNumber,
                email,
                navigate: () => navigate('/')
            }));
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
                fieldName: 'Họ',
                name: 'firstName',
                value: signUpFormik.values.firstName,
                placeHolder: 'Họ',
                error: signUpFormik.errors.firstName,
                touched: signUpFormik.touched.firstName,
                onChange: signUpFormik.handleChange,
                onFocus: () => signUpFormik.setFieldTouched('firstName', true)
            }
        }, {
            props: {
                fieldName: 'Tên',
                name: 'lastName',
                value: signUpFormik.values.lastName,
                placeHolder: 'Tên',
                error: signUpFormik.errors.lastName,
                touched: signUpFormik.touched.lastName,
                onChange: signUpFormik.handleChange,
                onFocus: () => signUpFormik.setFieldTouched('lastName', true)
            }
        }, {
            props: {
                fieldName: 'Tên đăng nhập hoặc email',
                name: 'userName',
                value: signUpFormik.values.userName,
                placeHolder: 'Tên đăng nhập hoặc email',
                error: signUpFormik.errors.userName,
                touched: signUpFormik.touched.userName,
                onChange: signUpFormik.handleChange,
                onFocus: () => signUpFormik.setFieldTouched('userName', true)
            }
        }, {
            props: {
                fieldName: 'Mật khẩu',
                name: 'password',
                value: signUpFormik.values.password,
                className: cx('signup__password__input'),
                placeHolder: 'Mật khẩu',
                type: signUpFormik.values.rightIconIndex === 1 ? 'password' : 'text',
                error: signUpFormik.errors.password,
                touched: signUpFormik.touched.password,
                rightIcon: PASSWORD_RIGHT_ICONS.find(item =>
                    item.id === signUpFormik.values.rightIconIndex
                ).icon,
                onChange: signUpFormik.handleChange,
                onFocus: () => signUpFormik.setFieldTouched('password', true),
                onRightIconClick: () => signUpFormik.setFieldValue('rightIconIndex',
                    signUpFormik.values.rightIconIndex === 1 ? 2 : 1)
            }
        }, {
            props: {
                fieldName: 'Số điện thoại',
                name: 'phoneNumber',
                value: signUpFormik.values.phoneNumber,
                placeHolder: 'Số điện thoại',
                error: signUpFormik.errors.phoneNumber,
                touched: signUpFormik.touched.phoneNumber,
                onChange: signUpFormik.handleChange,
                onFocus: () => signUpFormik.setFieldTouched('phoneNumber', true)
            }
        }, {
            props: {
                fieldName: 'Email',
                name: 'email',
                value: signUpFormik.values.email,
                placeHolder: 'Email',
                error: signUpFormik.errors.email,
                touched: signUpFormik.touched.email,
                onChange: signUpFormik.handleChange,
                onFocus: () => signUpFormik.setFieldTouched('email', true)
            }
        }
    ];
    
    const handleSignUpClick = () => {
        signinFormik.setFieldValue('isSignUp', true);
    }

    const handleSignInClick = () => {
        signinFormik.setFieldValue('isSignUp', false);
    }

    console.log(signUpSlice.status);

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
                    {loginSlice.status === 'wrong username or password!'
                        && <p className={cx('account__fail__message')}>Sai tên tài khoản hoặc mật khẩu!</p>}
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
                <Loading visible={signUpSlice.loading} />
            </form>
            <form onSubmit={signUpFormik.handleSubmit}>
                <div className={cx('account__sign-up', signinFormik.values.isSignUp && 'active')} >
                    <h3 className={cx('sign-up__title')}>Sign up</h3>
                    {SIGNUP_INPUTS.map((input, index) =>
                        <Input
                            key={index}
                            required width='100%'
                            {...input.props}
                        />
                    )}
                    {signUpSlice.status === 'email or userName already exist!'
                        && <p className={cx('account__fail__message')}>Email hoặc Tên tài khoản đã tồn tại!</p>}
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
                <Loading visible={signUpSlice.loading} />
            </form>
        </div>
    );
}

export default Login;