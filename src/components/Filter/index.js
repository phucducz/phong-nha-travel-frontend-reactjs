import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilter,
    faChevronUp,
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import style from './FilterStyle.module.scss';
import Button from "../Button";
import Item from "./Item";

const cx = classNames.bind(style);

function Filter({
    fields,
    titles,
    contents,
}) {
    const [active, setActive] = useState(false);
    const [filters, setFilters] = useState([]);
    const filterRef = useRef();

    useEffect(() => {
        if (active)
            filterRef.current.style.height = `auto`;
        else
            filterRef.current.style.height = '0';
    }, [active]);

    filters.map(filter => console.log(Object.entries(filter)));
    filters.map(filter => console.log(filter));

    return (
        <div className={cx('cn-filter')}>
            <Button
                outline
                small
                className='filter_button'
                leftIcon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => setActive(!active)}
            >
                Filter
            </Button>
            <div
                ref={filterRef}
                className={cx('filter_box')}
            >
                <div className={cx('header')}>
                    <div className={cx('header_title')}>
                        <h3>Filters</h3>
                    </div>
                    <div className={cx('header_action')}>
                        <h3>Clear all</h3>
                    </div>
                </div>
                {fields
                    && fields.map((field, index) => (
                        <Item
                            key={index}
                            field={field}
                            iconActive={<FontAwesomeIcon className={cx('filter_icon-up')} icon={faChevronUp} />}
                            iconDisable={<FontAwesomeIcon className={cx('filter_icon-down')} icon={faChevronDown} />}
                            content={contents[index]}
                            load={titles[index]}
                            action={{ setFilters }}
                        />
                    ))
                }
                {/* {fields
                    && fields.map((field, indexField) => (
                        <div
                            key={indexField}
                            className={cx(
                                `${field === enable.field &&
                                    enable.status === true
                                    ? 'enable'
                                    : 'disable'}`
                            )}
                        >
                            <div className={cx('cn-filed')}>
                                <div
                                    onClick={() => handleSetEnable(field)}
                                    className={cx('filter')}
                                >
                                    <p>
                                        {field}
                                    </p>
                                    <FontAwesomeIcon
                                        className={cx('filter_icon-up')}
                                        icon={faChevronUp}
                                    />
                                    <FontAwesomeIcon
                                        className={cx('filter_icon-down')}
                                        icon={faChevronDown}
                                    />
                                </div>
                            </div>
                            <div className={cx('content')}>
                                {contents.map((content, indexContent) => {
                                    return (
                                        indexField === indexContent
                                        && content.map(value => (
                                            Object.entries(value).map((value, key) => {
                                                return (
                                                    value[0] === titles[indexField]
                                                    && <div
                                                        key={key}
                                                        style={{ height: '3.5rem' }}
                                                        className={cx('content_item')}
                                                    >
                                                        <input
                                                            type='checkbox'
                                                            value={`${value[1]}`}
                                                            id={`${value[1]}`}
                                                        />
                                                        <label htmlFor={`${value[1]}`}>{value[1]}</label>
                                                    </div>
                                                )
                                            }
                                            ))
                                        )
                                    )
                                })}
                            </div>
                        </div>
                    ))
                } */}
            </div>
        </div>
    );
}
export default Filter;