import PropTypes from 'prop-types';
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
            </div>
        </div>
    );
}

Filter.propTypes = {
    fields: PropTypes.array,
    titles: PropTypes.array,
    contents: PropTypes.array,
}

export default Filter;