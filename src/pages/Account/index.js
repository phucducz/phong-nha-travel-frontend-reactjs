import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "~/components/Button";
import Input from "~/components/Input";
import Loading from "~/components/Loading";
import { ToastMessage } from "~/components/ToastMessage";
import { routes } from "~/config";
import { PASSWORD_RIGHT_ICONS } from "~/constant";
import fallbackImage from '~/images/usericon.jpg';
import { saveChangesProfile } from "~/reducers/user";
import style from './AccountStyle.module.scss';

const cx = classNames.bind(style);

function Account() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    
    const [toastVisible, setToastVisible] = useState(false);

    const { values, errors, setValues, touched, handleSubmit, handleChange, setFieldTouched, setFieldValue } = useFormik({
        initialValues: {
            userName: user.currentUser.userName,
            password: user.currentUser.password,
            email: user.currentUser.email,
            phoneNumber: user.currentUser.phoneNumber,
            avatar: user.currentUser.avatar ? `../../images/${user.currentUser.avatar}` : fallbackImage,
            file: null,
            rightIconIndex: 1
        },
        validationSchema: Yup.object({
            userName: Yup.string()
                .required("Không được để trống!")
                .min(5, "Tên đăng nhập phải có ít nhất 5 ký tự"),
            password: Yup.string().required('Không được để trống!'),
            email: Yup.string()
                .required("Không được để trống!")
                .matches(/^\S+@\S+\.\S+$/, "Vui lòng nhập địa chỉ email đúng định dạng(abc@xyz.def)"),
            phoneNumber: Yup.string()
                .required('Vui lòng nhập số điện thoại của bạn!')
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/, 'Vui lòng nhập số điện thoại đúng định dạng (10 chữ số) !')
        }),
        onSubmit: values => {
            dispatch(saveChangesProfile({
                newUserInfo: {
                    id: user.currentUser.id,
                    userName: values.userName,
                    password: values.password,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    avatar: values.file,
                    roleId: user.currentUser.role.id
                },
                oldUserInfo: user.currentUser,
                setToast: () => setToastVisible(true)
            }));
        }
    });

    const getBase64 = (file) => {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            setValues({
                ...values,
                file: reader.result,
                avatar: URL.createObjectURL(file)
            });
        });
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (!user.currentUser.id) navigate('/login');
    }, []);

    const handleUploadClick = file => {
        getBase64(file);
    }

    return (
        <div className={cx("container")}>
            <div className={cx('header')}>
                <p>Phong Nha Travel Account</p>
                <Button rounded href={routes.Login}>Sign out</Button>
            </div>
            <div className={cx("content")}>
                <div className={cx("profile-pic")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>Profile Picture</h2>
                    </header>
                    <div className={cx('content-avatar')}>
                        <img className={cx('avatar')} src={values.file || user.currentUser.avatar} alt="" />
                        <label>
                            Upload an image
                            <Input
                                type='file'
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={e => handleUploadClick(e.target.files[0])}
                            />
                        </label>
                    </div>
                </div>
                <div className={cx("account-details")}>
                    <header className={cx("header")}>
                        <h2 className={cx("title")}>Account Details</h2>
                    </header>
                    <form className={cx("user-info")} onSubmit={handleSubmit}>
                        <Input
                            readOnly
                            name="userName"
                            error={errors.userName === undefined ? '' : errors.userName}
                            touched={touched.userName}
                            value={values.userName}
                            placeHolder="Tên đăng nhập"
                            fieldName="Tên đăng nhập"
                            onChange={handleChange}
                            onFocus={() => setFieldTouched('userName', true)}
                        />
                        <Input
                            name="password"
                            type={values.rightIconIndex === 1 ? 'password' : 'text'}
                            rightIcon={PASSWORD_RIGHT_ICONS.find(item =>
                                item.id === values.rightIconIndex
                            ).icon}
                            onRightIconClick={() => setFieldValue('rightIconIndex', values.rightIconIndex === 1 ? 2 : 1)}
                            error={errors.password === undefined ? '' : errors.password}
                            touched={touched.password}
                            value={values.password}
                            placeHolder="Mật khẩu"
                            fieldName="Mật khẩu"
                            onChange={handleChange}
                            onFocus={() => setFieldTouched('password', true)}
                            className={cx('user-info__password')}
                        />
                        <Input
                            name="email"
                            error={errors.email === undefined ? '' : errors.email}
                            touched={touched.email}
                            value={values.email}
                            placeHolder="Email"
                            fieldName="Email"
                            onChange={handleChange}
                            onFocus={() => setFieldTouched('email', true)}
                        />
                        <Input
                            name="phoneNumber"
                            error={errors.phoneNumber === undefined ? '' : errors.phoneNumber}
                            touched={touched.phoneNumber}
                            value={values.phoneNumber}
                            placeHolder="Số điện thoại"
                            fieldName="Số điện thoạt"
                            onChange={handleChange}
                            onFocus={() => setFieldTouched('phoneNumber', true)}
                        />
                        <Button type='submit' className={cx("save")}>Save changes</Button>
                    </form>
                </div>
            </div>
            <Loading visible={user.loading} />
            <ToastMessage
                type='success'
                duration={800}
                visible={toastVisible}
                setVisible={setToastVisible}
                content='Đổi thông tin tài khoản thành công'
            />
        </div>
    );
};

export default Account;