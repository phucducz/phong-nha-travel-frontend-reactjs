import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { routes } from '~/config';
import { useWindowsMouseDown } from "~/context";
import { setResultData, setSearchData } from '~/reducers/search.js';
import { getService } from '~/services';
import Button from "../Button";
import Input from "../Input";
import DropDown from "../Menu/DropDown";
import Range from '../Range';
import style from './SearchBox.module.scss';

const cx = classNames.bind(style);

function SearchBox({
    className
}) {
    const classes = cx('search-box', {
        [className]: className
    });

    const dispatch = useDispatch();

    const [activeDropDown, setActiveDropDown] = useState(false);
    const [categories, setCategories] = useState({ data: [] });
    const [searchCategories, setSearchCategories] = useState({ data: [] });
    const categoriesBoxRef = useRef();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            tourName: '',
            valueSearch: '',
            rangePrice: [0, 4850000],
            startDate: '',
            endDate: '',
            category: {
                id: null,
                title: ''
            },
        },
        initialTouched: {
            startDate: false,
            endDate: false
        },
        validationSchema: Yup.object({
            startDate: Yup.string()
                .matches(
                    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
                    , 'Vui lòng nhập đúng định dạng (DD/mm/YYYY)!'),
            endDate: Yup.string()
                .matches(
                    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
                    , 'Vui lòng nhập đúng định dạng (DD/mm/YYYY)!')
        }),
        onSubmit: values => {
            let { tourName, category, rangePrice,
                startDate, endDate } = values;

            let listStartDate = startDate && startDate.split('/');
            let startDateFormat = listStartDate && `${listStartDate[2]}-${listStartDate[1]}-${listStartDate[0]}`;
            let listEndDate = endDate && endDate.split('/');
            let endDateFormat = listEndDate && `${listEndDate[2]}-${listEndDate[1]}-${listEndDate[0]}`;
            let currentDate = new Date();

            let payload = {
                name: tourName || "",
                code: category.code || "",
                startPrice: rangePrice[0],
                endPrice: rangePrice[1],
                startDate: startDateFormat ? startDateFormat : '2023-08-30',
                endDate: endDateFormat ? endDateFormat : `${currentDate.getFullYear() + 1}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`
            }

            dispatch(setSearchData(payload));

            const findTours = async (payload) => {
                const result = await getService('tours/search', { type: 'search', ...payload });

                dispatch(setResultData({ result: result }));
            }

            findTours(payload);
            navigate(routes.ToursSearch);
        }
    });

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await getService('categories');
            result.splice(0, 0, { id: 0, title: 'Category' });

            let newCategories = result.map(item => {
                let newProp = {
                    id: +item.id,
                    title: item.title.toLowerCase()
                }

                return { ...item, ...newProp };
            });

            setSearchCategories({ data: newCategories });
            setCategories({ data: newCategories });

            formik.setFieldValue('category', { ...newCategories[0] });
        }

        fetchCategories();
    }, []);

    const handleSearchCategories = (value) => {
        let findArray = categories.data.filter(item => item.title.includes(value.toLowerCase()));

        findArray.length === 0
            ? setSearchCategories({
                data: [{ title: `no results match "${value}"` }]
            })
            : setSearchCategories({
                data: findArray
            });

        formik.setFieldValue('valueSearch', value);
    }

    const handleClickCategory = id => {
        const { data } = searchCategories;
        let category = data.find(category => category.id === id);

        formik.setValues({
            ...formik.values,
            category: category,
            valueSearch: ''
        });

        setActiveDropDown(false);
    }

    useWindowsMouseDown((e) => {
        if (!categoriesBoxRef.current) return;
        if (categoriesBoxRef.current.contains(e.target)) {
            setActiveDropDown(true);
            return;
        }

        setActiveDropDown(false);
    }, [activeDropDown]);

    return (
        <form className={classes} onSubmit={formik.handleSubmit}>
            <h3 className={cx('search-box__title')}>tìm kiếm tour</h3>
            <div className={cx('search-box__inputs')}>
                <Input
                    tiny
                    rightIcon={<FontAwesomeIcon icon={faSearch} />}
                    name='name'
                    value={formik.values.tourName}
                    placeHolder='Search name'
                    className={cx('inputs__search')}
                    onChange={e => formik.setFieldValue('tourName', e.target.value)}
                />
                <div className={cx('inputs__range')}>
                    <Input
                        mini
                        name='start'
                        value={formik.values.startDate}
                        placeHolder='Start'
                        type='text'
                        error={formik.errors.startDate}
                        touched={formik.touched.startDate}
                        onChange={e => formik.setFieldValue('startDate', e.target.value)}
                        onFocus={() => formik.setFieldTouched('startDate', true)}
                    />
                    <Input
                        mini
                        name='end'
                        value={formik.values.endDate}
                        placeHolder='End'
                        type='text'
                        error={formik.errors.endDate}
                        touched={formik.touched.endDate}
                        onChange={e => formik.setFieldValue('endDate', e.target.value)}
                        onFocus={() => formik.setFieldTouched('endDate', true)}
                    />
                </div>
                <div className={cx('price-range')}>
                    <Range
                        min={0}
                        max={20000000}
                        onChange={(min, max) => formik.setFieldValue('rangePrice', [min, max])}
                        className={cx('price-range__rg')}
                    />
                </div>
                <div ref={categoriesBoxRef} className={cx('category')}>
                    <Button
                        type='button'
                        className={cx('category__button', activeDropDown && 'active')}
                        rightIcon={<FontAwesomeIcon icon={faBars} />}
                    >
                        {formik.values.category && formik.values.category.title}
                    </Button>
                    {categories
                        && <DropDown
                            data={searchCategories}
                            placement='top-middle'
                            onlyChoose
                            header={
                                <Input
                                    name='category'
                                    value={formik.values.valueSearch}
                                    className={cx('dropdown-menu__search')}
                                    onChange={e => handleSearchCategories(e.target.value)}
                                />}
                            active={formik.values.category && formik.values.category.id}
                            className={cx('dropdown-menu', activeDropDown && 'active')}
                            onClick={handleClickCategory}
                            style={{
                                height: activeDropDown
                                    ? `calc(${(searchCategories.data.length + 1) * 36}px` : '0'
                            }}
                        />
                    }
                </div>
            </div>
            <Button type='submit' className={cx('search-box__button')}>find tours</Button>
        </form>
    );
}

SearchBox.propTypes = {
    className: PropTypes.string,
}

export default SearchBox;