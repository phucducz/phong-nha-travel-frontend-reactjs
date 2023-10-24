import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import * as Yup from 'yup';

import style from './EditUser.module.scss';
import StatusHeader from "~/components/StatusHeader";
import Input from "~/components/Input";
import { CheckBox } from "~/components/CheckBox";
import { GroupRadioButton } from "~/components/RadioButton";

const cx = classNames.bind(style);

function UserEdit() {
    const { userId } = useParams();
    const user = useSelector(state => state.userfAdmin);
    const role = useSelector(state => state.rolefAdmin);
    const { roleList } = role;

    const DATA_STATUS_HEADER = [
        {
            title: 'Admin',
            to: '/admin/users'
        }, {
            title: 'Users',
            to: '/admin/users'
        }, {
            title: `${userId}`,
            to: `/admin/users/edit/${userId}`
        }, {
            title: 'Edit',
            to: `/admin/users/edit/${userId}`
        }
    ];

    const formik = useFormik({
        initialValues: {
            id: userId,
            active: true,
            avatar: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            phoneNumber: '',
            userName: '',
            roleId: 0,
            role: {},
            roles: []
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Please enter the first name')
                .matches(/^[a-zA-Z]+$/, "Vui lòng không nhập ký tự đặc biệt"),
            lastName: Yup.string()
                .required('Please enter the first name')
                .matches(/^[a-zA-Z]+$/, "Vui lòng không nhập số và ký tự đặc biệt"),
        })
    });

    useEffect(() => {
        if (user.userList.length <= 0)
            return;

        let userCurrent = user.userList.find(user =>
            user.id === parseInt(userId)
        );

        console.log(userCurrent);

        formik.setValues({
            id: userCurrent.id,
            active: userCurrent.active,
            avatar: userCurrent.avatar,
            email: userCurrent.email,
            firstName: userCurrent.firstName,
            lastName: userCurrent.lastName,
            password: userCurrent.password,
            phoneNumber: userCurrent.phoneNumber,
            userName: userCurrent.userName,
            roleId: 0,
            role: userCurrent.role,
            roles: role.roles
        });
    }, []);

    const FIELD_INPUTS = [
        {
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

    console.log(formik.values);

    return (
        <section className={cx('user-edit')}>
            <StatusHeader data={DATA_STATUS_HEADER} />
            <div className={cx('user-edit__header')}>
                <p className={cx('user-edit__header__title')}>user - edit</p>
            </div>
            <form className={cx('container')}>
                <header><p>edit user</p></header>
                {FIELD_INPUTS.map((input, index) => (
                    <Input
                        key={index}
                        width='100%'
                        required
                        value={input.value}
                        name={input.name}
                        fieldName={input.fieldName}
                        error={input.error}
                        touched={input.touched}
                        onChange={formik.handleChange}
                        onFocus={() => formik.setFieldTouched(input.name, true)}
                    />
                ))}
                <CheckBox title='Disable' name={'active'} onChange={formik.handleChange} />
                <GroupRadioButton
                    title='Role'
                    name='roleId'
                    data={formik.values.roles}
                    onClick={e => console.log(e)}
                    // onChange={e => formik.setFieldValue('roleId', e.target.value)}
                />
            </form>
        </section>
    );
}

export default UserEdit;