import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import style from './FilterStyle.module.scss';
import { useFilter } from "~/context";

const cx = classNames.bind(style);

function Item({
    field,
    iconActive,
    iconDisable,
    content,
    load,
    ...passProps
}) {
    const {
        handleFilterTour
    } = useFilter();

    const [active, setActive] = useState(false);
    const contentRef = useRef();
    const [chooseFilter, setChooseFilter] = useState('');

    useEffect(() => {
        if (active)
            contentRef.current.style.height = `calc(7.5rem * ${content.length})`;
        else
            contentRef.current.style.height = '0';
    }, [active]);
    
    const handleFilter = (field, value) => {
        setChooseFilter(value);
        handleFilterTour(field, value);
    }

    return (
        <div
            className={cx(`${active === true ? 'item_active' : 'item_disable'}`)}
            {...passProps}
        >
            <div className={cx('cn-item')}>
                <div
                    className={cx('cn-filed')}
                    onClick={() => setActive(!active)}
                >
                    <div
                        className={cx('filter')}
                    >
                        <p>
                            {field}
                        </p>
                        {active === true
                            ? iconActive
                            : iconDisable
                        }
                    </div>
                </div>
                <div
                    ref={contentRef}
                    className={cx('content')}
                >
                    {content.map(item =>
                        Object.entries(item).map((value, index) => {
                            return (
                                value[0] === load
                                && <div
                                    key={index}
                                    style={{ height: '3.5rem' }}
                                    className={cx('content_item')}
                                >
                                    <input
                                        type='checkbox'
                                        value={`${value[1]}`}
                                        id={`${value[1]}`}
                                        onClick={() => handleFilter(value[0], value[1])}
                                        checked={value[1] === chooseFilter ? true : false}
                                        readOnly
                                    />
                                    <label
                                        htmlFor={`${value[1]}`}
                                    >
                                        {value[1]}
                                    </label>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

Item.propTypes = {
    field: PropTypes.string.isRequired,
    iconActive: PropTypes.node.isRequired,
    iconDisable: PropTypes.node.isRequired,
    content: PropTypes.array.isRequired,
    load: PropTypes.string.isRequired,
}

export default Item;