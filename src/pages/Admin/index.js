import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faPenToSquare, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

import styles from './AdminStyle.module.scss';
import {
    useAdmin,
    useMessageBox
} from "~/context";
import TaskList from "~/components/TaskList";
import { getService } from "~/services";
import Table from "~/components/Table";
import ContentBox from "~/components/ContentBox";
import Button from "~/components/Button";
import Input from "~/components/Input";
import { fieldNames } from "~/constant";
import {
    UPDATE_TOUR,
    DELETE_TOUR
} from "~/context/Message/constant";
import { FilterProvider } from "~/context/Filter";
import { Wrapper as GroupCheckbox } from "~/components/CheckBox";

const cx = classNames.bind(styles);

function Admin() {
    const {
        setMessage,
        result,
        visibleContent,
        setVisibleContent,
        setVisibleMessage,
        setPayload,
        setAction,
        title,
        setTitle
    } = useMessageBox();

    const {
        formik,
        tours,
        setTours,
        tour,
        setTour,
        topics,
        setTopics,
        categories,
        setCategories,
    } = useAdmin();

    const [users, setUsers] = useState();
    const [table, setTable] = useState();

    useEffect(() => {
        const getUsers = async () => {
            const result = await getService('users');
            setUsers(result);
        }

        const getTours = async () => {
            const result = await getService('tours', {
                page: 'admin',
            });
            setTours(result);
        }

        const getTopics = async () => {
            const result = await getService('topics');
            setTopics(result);
        }

        const getCategories = async () => {
            const result = await getService('categories');
            setCategories(result);
        }

        const fetchAPI = () => {
            getUsers();
            getTours();
            getTopics();
            getCategories();
        }

        fetchAPI();
    }, []);

    useEffect(() => {
        const getTours = async () => {
            const result = await getService('tours', {
                page: 'admin'
            });
            setTours(result);
        }

        getTours();
    }, [result]);

    const handleChangeImage = e => {
        formik.setValues({
            ...formik.values,
            image: `../images/${e.target.files[0].name}`
        });
    }

    useEffect(() => {
        setPayload(formik.values);
        setTour(formik.values);
    }, [formik.values]);

    const handleEditTour = (id) => {
        setTitle('Update tour information');

        setVisibleContent(true);

        setAction(UPDATE_TOUR);

        setMessage({
            icon: <FontAwesomeIcon icon={faQuestion} />,
            messagePrimary: 'Bạn có chắc muốn chỉnh sửa lại chuyến du lịch này!',
            messageSub: ''
        });

        const getData = async () => {
            const tours = await getService('tours', {
                q: id
            });
            const tourCategories = await getService('tourCategories', {
                q: id
            });
            const toursTopics = await getService('toursTopics', {
                q: id
            });
            formik.setValues({
                ...tours,
                categories: tourCategories,
                topics: toursTopics
            });
        }

        getData();
    }

    const handleDeleteTour = (id) => {
        setVisibleMessage(true);

        setAction(DELETE_TOUR);

        setMessage({
            icon: <FontAwesomeIcon icon={faQuestion} />,
            messagePrimary: 'Bạn có chắc muốn xóa chuyến du lịch này!',
            messageSub: ''
        });

        setPayload({
            id: +id
        });
    }

    const handleCheck = (cases, e) => {
        let id = +e.target.attributes.index.value;
        let title = e.target.value;
        let item = {
            id: id,
            title: title
        }

        switch (cases) {
            case 'CATEGORIES':
                let categories = formik.values.categories;

                if (e.target.checked === false) {
                    let array = categories;
                    categories.map((item, index) => {
                        if (item.id == id) {
                            array.splice(index, 1);
                        }
                    });
                    formik.setValues({
                        ...formik.values,
                        categories: array
                    })
                }
                else
                    formik.setValues({
                        ...formik.values,
                        categories: [
                            ...formik.values.categories,
                            item
                        ]
                    });

                break;

            case 'TOPICS':
                let topics = formik.values.topics;

                if (e.target.checked === false) {
                    let array = topics;
                    topics.map((item, index) => {
                        if (item.id == id) {
                            array.splice(index, 1);
                        }
                    });
                    formik.setValues({
                        ...formik.values,
                        topics: array
                    })
                }
                else
                    formik.setValues({
                        ...formik.values,
                        topics: [
                            ...formik.values.topics,
                            item
                        ]
                    });

                break;

            default:
                break;
        }
    }

    return (
        <div className={cx('container-admin')}>
            <div className={cx('container_left')}>
                <TaskList
                    title={'Management Directory'}
                    tasks={['Travel manager', 'User manager', 'Revenue management']}
                    action={{
                        setTable
                    }}
                />
            </div>
            <div className={cx('container_right')}>
                <FilterProvider>
                    <Table
                        columns={['Id', 'Name', 'Price', 'Image', 'Action']}
                        table={'Travel manager'}
                        tableActive={table}
                    >
                        {tours
                            && tours.map(tour => (
                                <tr
                                    className={cx('product')}
                                    key={tour.id}
                                >
                                    <td>
                                        <p
                                            className={cx('product_id')}
                                        >{tour.id}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={cx('product_name')}
                                        >{tour.name}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={cx('product_price')}
                                        >{tour.price}</p>
                                    </td>
                                    <td className={cx('column-image')}>
                                        <img
                                            className={cx('product_image')}
                                            src={tour.image}
                                            alt={tour.name}
                                        />
                                    </td>
                                    <td>
                                        <div className="button_operation">
                                            <Button
                                                small
                                                cancel
                                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                                onClick={() => handleEditTour(tour.id)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                deleteb
                                                small
                                                leftIcon={<FontAwesomeIcon icon={faDeleteLeft} />}
                                                onClick={() => handleDeleteTour(tour.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </Table>
                    <Table
                        columns={['Id', 'Tên người dùng', 'Mật khẩu', 'Email', 'Số điện thoại', 'Admin']}
                        table={'User manager'}
                        tableActive={table}
                    >
                        {users
                            && users.map(user => (
                                <tr
                                    className={cx(`product ${user.id % 2 == 0 && 'product-even'}`)}
                                    key={user.id}
                                >
                                    <td>
                                        <p
                                            className={cx('product_id')}
                                        >{user.id}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={cx('product_name')}
                                        >{user.username}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={cx('product_price')}
                                        >{user.password}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={cx('product_price')}
                                        >{user.email}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={cx('product_price')}
                                        >{user.phone_number}</p>
                                    </td>
                                    <td>
                                        <p
                                            className={cx('product_price')}
                                        >
                                            {user.isAdmin === '1' ? 'true' : 'false'}
                                        </p>
                                    </td>
                                    <td>
                                        <div className="button_operation">
                                            <Button
                                                small
                                                cancel
                                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                deleteb
                                                small
                                                leftIcon={<FontAwesomeIcon icon={faDeleteLeft} />}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </Table>
                </FilterProvider>
                <ContentBox
                    title={title}
                    visible={visibleContent}
                    setVisible={setVisibleContent}
                >
                    <div className={cx('wrapper-data')}>
                        <div className={cx('infomations')}>
                            <div className={cx('container-input')}>
                                <Input
                                    fieldName={`${fieldNames[0]}`}
                                    placeHolder={`${fieldNames[0]}`}
                                    value={formik.values.id}
                                    required
                                    readOnly
                                />
                                <Input
                                    fieldName={`${fieldNames[1]}`}
                                    placeHolder={`${fieldNames[1]}`}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    name='name'
                                    required
                                />
                                <Input
                                    fieldName={`${fieldNames[4]}`}
                                    placeHolder={`${fieldNames[4]}`}
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    name='price'
                                    required
                                />
                                <GroupCheckbox
                                    title='topic'
                                    data={topics}
                                    defaultChecked={formik.values.topics}
                                    onChange={e => handleCheck('TOPICS', e)}
                                />
                                <GroupCheckbox
                                    title='category'
                                    data={categories}
                                    defaultChecked={formik.values.categories}
                                    onChange={e => handleCheck('CATEGORIES', e)}
                                />
                            </div>
                            <div className={cx('cnr-image')}>
                                {tour.image === ''
                                    ? <div className={cx('image')}></div>
                                    : <img src={tour.image} alt={tour.name} />
                                }
                                <input
                                    type='file'
                                    name='file'
                                    onChange={handleChangeImage}
                                    required
                                />
                            </div>
                        </div>
                        <Input
                            type='textarea'
                            className={cx('text-area')}
                            fieldName={`${fieldNames[2]}`}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            name='description'
                            required
                            cols='50'
                            rows='10'
                            spellCheck={false}
                        />
                    </div>
                </ContentBox>
            </div>
        </div>
    )
}

export default Admin;