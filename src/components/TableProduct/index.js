import classNames from "classnames/bind";

import style from './TableProduct.module.scss';
import Item from '~/components/ProductBox/Item';

const cx = classNames.bind(style);

function TableProduct({
    thead,
    data,
    trMore,
    className,
    readOnly = false,
    status = false,
    ...actionItem
}) {
    const classes = cx('table-product', {
        [className]: className
    }, 'table');

    return (
        <table className={classes}>
            <thead>
                <tr>
                    {thead.map((item, index) => <th key={index} colSpan={item.colSpan}><p>{item.title}</p></th>)}
                </tr>
            </thead>
            <tbody>
                {data
                    && data.map(item => (
                        <Item
                            key={item.id}
                            data={item}
                            status={status}
                            value={item.quantity}
                            readOnly={readOnly}
                            {...actionItem}
                        />
                    ))}
                {trMore && trMore}
            </tbody>
        </table>
    );
}

export default TableProduct;