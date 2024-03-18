import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

import Button from "~/components/Button";
import { CheckBox } from "~/components/CheckBox";
import Input from "~/components/Input";
import { GroupRadioButton } from "~/components/RadioButton";
import StatusHeader from "~/components/StatusHeader";
import { saveChangesUser } from "~/reducers/user";
import style from './UserEdit.module.scss';
import { routes } from "~/config";

const cx = classNames.bind(style);

function UserEdit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userId } = useParams();
    const user = useSelector(state => state.user);
    const role = useSelector(state => state.rolefAdmin);

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
            roles: [],
            file: null
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Please enter the first name'),
            lastName: Yup.string()
                .required('Please enter the first name')
        }),
        onSubmit: async values => {
            const { id, active, email, firstName, file, lastName,
                password, phoneNumber, userName, roleId } = values;

            dispatch(saveChangesUser({
                id,
                active,
                avatar: file,
                email,
                firstName,
                lastName,
                password,
                phoneNumber,
                userName,
                roleId
            }));

            navigate(routes.UserManagement);
        }
    });

    const getBase64 = (file) => {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            formik.setValues({
                ...formik.values,
                file: reader.result,
                avatar: URL.createObjectURL(file)
            });
        });
        reader.readAsDataURL(file);
    }

    useEffect(() => {
        if (user.userList.length <= 0)
            return;

        let userCurrent = user.userList.find(user =>
            user.id === parseInt(userId)
        );

        formik.setValues({
            ...formik.values,
            id: userCurrent.id,
            active: userCurrent.active,
            avatar: userCurrent.avatar,
            email: userCurrent.email,
            firstName: userCurrent.firstName,
            lastName: userCurrent.lastName,
            password: userCurrent.password,
            phoneNumber: userCurrent.phoneNumber,
            userName: userCurrent.userName,
            roleId: userCurrent.role.id,
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

    const handleChooseRole = item => {
        formik.setFieldValue('roleId', item.id);
    }

    const handleUploadClick = file => {
        getBase64(file);
    }

    return (
        <section className={cx('user-edit')}>
            <StatusHeader data={DATA_STATUS_HEADER} />
            <div className={cx('user-edit__header')}>
                <p className={cx('user-edit__header__title')}>user - edit</p>
            </div>
            <form className={cx('container')} onSubmit={formik.handleSubmit}>
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
                <CheckBox
                    title='Disable'
                    name='active'
                    checked={!formik.values.active}
                    onChange={() => formik.setFieldValue('active', !formik.values.active)}
                />
                <GroupRadioButton
                    title='Role'
                    name='roleId'
                    className={cx('group-radio')}
                    data={formik.values.roles}
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
                <div className={cx('row-input')}>
                    <Button className={cx('row-input__save')} type='submit'>Save</Button>
                    <Button className={cx('row-input__reset')} type='button'>Reset</Button>
                    <Button className={cx('row-input__cancel')} type='button'>Cancel</Button>
                </div>
            </form>
        </section>
    );
}

export default UserEdit;