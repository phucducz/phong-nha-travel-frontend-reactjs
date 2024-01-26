import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

import style from './UserCreate.module.scss';
import StatusHeader from "~/components/StatusHeader";
import Input from "~/components/Input";
import { GroupRadioButton } from "~/components/RadioButton";
import Button from "~/components/Button";
import { routes } from "~/config";
import { doSaveUser } from "~/constant/reduxContants";
import { setLoading } from "~/reducers/loading";

const cx = classNames.bind(style);

const DATA_STATUS_HEADER = [
    {
        title: 'Admin',
        to: '/admin/users'
    }, {
        title: 'Users',
        to: '/admin/users'
    }, {
        title: 'Create',
        to: '/admin/users/create'
    }
];

function UserCreate() {
    const navigate = useNavigate();

    const role = useSelector(state => state.rolefAdmin);

    const formik = useFormik({
        initialValues: {
            active: true,
            avatar: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            userName: '',
            roleId: 0,
            avatarFile: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Please enter the first name!')
                .matches(/^[a-zA-Z]+$/, "Please do not enter special characters!"),
            lastName: Yup.string()
                .required('Please enter the last name!')
                .matches(/^[a-zA-Z]+$/, "Please do not enter special characters!"),
            email: Yup.string()
                .required("Please enter the email address!")
                .matches(/^\S+@\S+\.\S+$/, "Please enter valid email address!(abc@xyz.def)"),
            password: Yup.string()
                .required("Please enter the password!")
                .matches(/[a-zA-Z0-9]{8,}/, "Please enter at least 8 characters and do not enter special characters!"),
            userName: Yup.string()
                .required('Please enter the first name!')
                .matches(/^[a-zA-Z0-9]+$/, "Please do not enter special characters!"),
            confirmPassword: Yup.string()
                .required("Please enter the password!")
                .oneOf([Yup.ref('password'), null], 'Password must match!'),
            phoneNumber: Yup.string()
                .required("Please enter the phone number!")
                .matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?\d{3}\d{4}$/, "Please enter a 10-digit phone number!"),
        }),
        onSubmit: async values => {
            doSaveUser(values);
            navigate(routes.UserManagement);
        }
    });

    const FIELD_INPUTS = [
        {
            value: formik.values.userName,
            name: 'userName',
            fieldName: 'User Name',
            error: formik.errors.userName,
            touched: formik.touched.userName
        }, {
            value: formik.values.firstName,
            name: 'firstName',
            fieldName: 'First Name',
            error: formik.errors.firstName,
            touched: formik.touched.firstName
        }, {
            value: formik.values.lastName,
            name: 'lastName',
            fieldName: 'Last Name',
            error: formik.errors.lastName,
            touched: formik.touched.lastName
        }, {
            value: formik.values.password,
            name: 'password',
            fieldName: 'Password',
            error: formik.errors.password,
            touched: formik.touched.password,
        }, {
            value: formik.values.confirmPassword,
            name: 'confirmPassword',
            fieldName: 'Confirm Password',
            error: formik.errors.confirmPassword,
            touched: formik.touched.confirmPassword
        }, {
            value: formik.values.phoneNumber,
            name: 'phoneNumber',
            fieldName: 'Phone Number',
            error: formik.errors.phoneNumber,
            touched: formik.touched.phoneNumber
        }, {
            value: formik.values.email,
            name: 'email',
            fieldName: 'E-mail',
            error: formik.errors.email,
            touched: formik.touched.email
        }
    ];

    const handleUploadClick = file => {
        formik.setValues({
            ...formik.values,
            avatar: URL.createObjectURL(file),
            avatarFile: file
        });
    }

    const handleChooseRole = item => {
        formik.setFieldValue('roleId', item.id);
    }

    return (
        <section className={cx('create-container')}>
            <div className={cx('header')}>
                <StatusHeader data={DATA_STATUS_HEADER} />
                <p className={cx('header__title')}>User - Detail</p>
            </div>
            <div className={cx('table-container')}>
                <div className={cx('row__title')}>
                    <p className={cx('col')}>New User</p>
                </div>
                <form className={cx('row__form')} onSubmit={formik.handleSubmit}>
                    {FIELD_INPUTS.map((input, index) => (
                        <Input
                            key={index}
                            value={input.value}
                            name={input.name}
                            fieldName={input.fieldName}
                            error={input.error}
                            touched={input.touched}
                            type={(input.name === 'password' || input.name === 'confirmPassword') ? 'password' : 'text'}
                            onChange={formik.handleChange}
                            onFocus={() => formik.setFieldTouched(input.name, true)}
                        />
                    ))}
                    <GroupRadioButton
                        title='Role'
                        name='roleId'
                        className={cx('group-radio')}
                        data={role.roles}
                        activeId={formik.values.roleId}
                        onChange={handleChooseRole}
                    />
                    <div className={cx('form-group')}>
                        <label className={cx('form-group__field-name')}>Avatar</label>
                        <div className={cx('form-group__container-input')}>
                            <label>
                                Upload an image
                                <Input
                                    type='file'
                                    accept='image/*'
                                    style={{ display: 'none' }}
                                    onChange={e => handleUploadClick(e.target.files[0])}
                                />
                            </label>
                            <img className={cx('img-uploaded')} src={`${formik.values.avatar}`} alt="" />
                        </div>
                    </div>
                    <div className={cx('col__action')}>
                        <Button type='submit' className={cx('col__action__rol-save')}>Save</Button>
                        {/* <Button type='submit' className={cx('col__action__rol-save')} onClick={() => doSaveUser(formik.values)}>Save</Button> */}
                        <Button className={cx('col__action__rol-cancel')}>Cancel</Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default UserCreate;