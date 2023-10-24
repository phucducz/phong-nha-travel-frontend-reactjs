import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from './UserManagement.module.scss';
import StatusHeader from "~/components/StatusHeader";
import TableWidget from "~/components/TableWidget";
import Button from "~/components/Button";
import { getService } from "~/services";
import Avatar from "~/components/Avatar";
import Input from "~/components/Input";
import { setData as setUserData } from "~/reducers/user";
import { setData as setRoleData } from '~/reducers/role';

const cx = classNames.bind(style);

const DATA_STATUS_HEADER = [
    {
        title: 'Admin',
        to: '/admin/users'
    }, {
        title: 'Users',
        to: '/admin/users'
    }
];

function UserManagement() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.userfAdmin);
    const { userList } = user;

    const thead = ['avatar', 'first name', 'last name', 'phone number',
        'e-mail', 'role', 'active', 'action'];
    const [usersFilter, setUsersFilter] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            const result = await getService('users', { type: 'less' });

            dispatch(setUserData(result));
            setUsersFilter(result);
        }

        const getRoles = async () => {
            const result = await getService('roles');

            dispatch(setRoleData(result));
        }

        const fetchData = () => {
            getUsers();
            getRoles();
        }

        fetchData();
    }, []);

    useEffect(() => {
        setUsersFilter(() => {
            let arrItem = [];
            userList.map(item => {
                let firstName = item.firstName.toLowerCase();
                let lastName = item.lastName.toLowerCase();
                let search = searchValue.toLowerCase().trim();

                if (firstName.includes(search) || lastName.includes(search))
                    arrItem.push(item);
            });

            return arrItem;
        })
    }, [searchValue]);

    return (
        <div className={cx('user-management')}>
            <StatusHeader data={DATA_STATUS_HEADER} />
            <div className={cx('content')}>
                <div className={cx('content__header')}>
                    <p>User - Management</p>
                </div>
                <div className={cx('container__table')}>
                    <div className={cx('container__table__header')}>
                        <div className={cx('container__table__header__title')}>
                            <p>List of Users</p>
                        </div>
                        <div className={cx('create-button')}>
                            <Button className={cx('create-button__user')}>create product</Button>
                        </div>
                        <div className={cx('search-input')}>
                            <Input
                                className={cx('search-input__user')}
                                name='search'
                                optional
                                large
                                value={searchValue}
                                placeHolder='Search name'
                                onChange={e => setSearchValue(e.target.value)}
                            />
                        </div>
                    </div>
                    <TableWidget data={userList}>
                        <colgroup>
                            {thead.map((item, index) => <col key={index}></col>)}
                        </colgroup>
                        <thead>
                            <tr>
                                {thead.map((item, index) => <th className={cx('table__field')} key={index}>{item}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {userList.length > 0 && usersFilter.map((user, index) => (
                                <tr key={user.id} className={cx(index % 2 === 0 && 'even-row')}>
                                    <td><Avatar src={user.avatar} alt={user.firstName} /></td>
                                    <td><p>{user.firstName}</p></td>
                                    <td><p>{user.lastName}</p></td>
                                    <td><p>{user.phoneNumber}</p></td>
                                    <td><p>{user.email}</p></td>
                                    <td><p>{user.role.role}</p></td>
                                    <td><p>{user.active ? 'Enable' : 'Disable'}</p></td>
                                    <td>
                                        <Button className={cx('view')} onClick={() => navigate(`/admin/users/edit/${user.id}`)}>view</Button>
                                        <Button className={cx('edit')} onClick={() => navigate(`/admin/users/edit/${user.id}`)}>edit</Button>
                                        <Button className={cx('delete')} onClick={() => navigate(`/admin/users/edit/${user.id}`)}>delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </TableWidget>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;