import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faXmark,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState, useRef } from 'react';

import style from './SearchStyle.module.scss';
import { getService } from '~/services';
import { useAdmin, useDebounce, useFilter } from '~/context';

const cx = classNames.bind(style);

function Search({
    content,
    name,
    className,
    small = false,
    large = false,
    onChange,
    handleSearch,
    ...passProps
}) {
    const { setTours } = useAdmin();
    const { filterTour, setFilterTour } = useFilter();

    const [search, setSearch] = useState('');
    const debounce = useDebounce(filterTour, 500);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const props = {
        ...passProps
    }

    const classes = cx('search', {
        className
    });

    const classInput = cx('input', {
        large,
        small
    });

    useEffect(() => {
        if (search.trim() !== '')
            setLoading(true);

        setFilterTour({
            ...filterTour,
            name: search.trim(),
            type: 'search'
        });
    }, [search]);

    useEffect(() => {
        if (!search.trim() && !filterTour.name && !filterTour.title) {
            const getTours = async () => {
                const result = await getService('tours', {
                    page: 'admin'
                });
                setTours(result);
            }

            getTours();
            return;
        }

        setLoading(false);

        const fetchTourByName = async (payload) => {
            const result = await getService('tours', payload);
            setTours(result);
        }

        fetchTourByName(debounce);
    }, [debounce]);

    const handleDeleteInput = () => {
        setSearch('');
        inputRef.current.focus();
    }

    return (
        <div className={classes}>
            <div className={cx('search_name')}>
                <div className={cx('divInput')}>
                    <input
                        ref={inputRef}
                        value={search}
                        className={classInput}
                        onChange={e => setSearch(e.target.value)}
                        {...props}
                    />
                    <label className={cx('label')}>Nhập tên chuyến du lịch ...</label>
                </div>
                {loading === true
                    ? <FontAwesomeIcon
                        className={cx('loading_search')}
                        icon={faSpinner}
                    />
                    : <FontAwesomeIcon
                        className={cx('close_search')}
                        icon={faXmark}
                        onClick={handleDeleteInput}
                    />
                }
                <FontAwesomeIcon
                    className={cx('search_button')}
                    icon={faSearch}
                    onClick={() => inputRef.current.focus()}
                />
            </div>
        </div>
    )
}

Search.propTypes = {
    content: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    small: PropTypes.bool,
    large: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
}

export default Search;