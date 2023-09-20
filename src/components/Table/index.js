import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useAdmin, useMessageBox } from "~/context";

import style from './TableStyle.scss';
import Search from "../Search";
import Button from "../Button";
import Filter from "../Filter";
import { INSERT_TOUR } from "~/context/Message/constant";

const cx = classNames.bind(style);

function Table({
    columns,
    children,
    table,
    tableActive
}) {
    const {
        topics,
        tours,
        formik,
    } = useAdmin();

    const {
        setMessage,
        setTitle,
        setVisibleContent,
        setAction
    } = useMessageBox();

    const handleAdd = () => {
        formik.setValues({
            id: '',
            name: '',
            description: '',
            image: '',
            price: +0,
            title: '',
            action: 'insert',
            topics: [],
            categories: [],
        });
        setMessage({
            icon: <FontAwesomeIcon icon={faQuestion} />,
            messagePrimary: 'Bạn có chắc muốn thêm một chuyến du lịch mới!',
            messageSub: ''
        });
        setTitle('Create a new tour');
        setVisibleContent(true);
        setAction(INSERT_TOUR);
    }

    return (
        <>
            {table === tableActive
                &&
                <>
                    <div className={cx('table_header')}>
                        <div className={cx('search')}>
                            <Search
                                content='Enter the name tour ...'
                                name='search'
                                large
                                spellCheck={false}
                                />
                            <div className={cx('search_filter')}>
                                <Filter
                                    fields={['Title', 'Tour']}
                                    titles={['title', 'name']}
                                    contents={[topics, tours]}
                                />
                            </div>
                        </div>
                        <div className="create_action">
                            <Button
                                large
                                create
                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                onClick={handleAdd}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                    <table
                        className="table"
                        border={1}
                        cellSpacing={0}
                    >
                        <tbody>
                            <tr className='table_row-title'>
                                {columns.map((column, index) => (
                                    <td key={index}>
                                        <p className={cx('table_column')}>{column}</p>
                                    </td>
                                ))}
                            </tr>
                            {children}
                        </tbody>
                    </table>
                </>
            }
        </>
    )
}

export default Table;