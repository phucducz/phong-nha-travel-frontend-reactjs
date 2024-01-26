import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Pagination from "~/components/Pagination";
import SearchBox from "~/components/SearchBox";
import TourItem from "~/components/TourItem";
import style from './ToursSearch.module.scss';

const cx = classNames.bind(style);

function ToursSearch() {
    const search = useSelector(state => state.search);
    const tourCategories = useSelector(state => state.tourCategories);
    // const dispatch = useDispatch();

    const { result } = search;
    const { listData } = tourCategories;

    const [toursOfPage, setTourOfPage] = useState([]);

    useEffect(() => {
        // const fetchTours = async () => {
        //     const response = await getService('tours', { type: 'view' });
        //     dispatch(setResultData({ result: response }));
        // }

        // if (result.length === 0)
        //     fetchTours();

        handlePagination();
    }, [result]);

    let totalItem = result.length;
    let itemPerPage = 3;

    const handlePagination = (currentPage = 1) => {
        let toursCurrent = result.slice(
            itemPerPage * (currentPage - 1),
            itemPerPage * currentPage
        );

        setTourOfPage(toursCurrent);
    }

    return (
        <div className={cx('tours-search')}>
            <div className={cx('tours')}>
                <TourItem
                    data={toursOfPage}
                    tourCategories={listData}
                />
                {toursOfPage
                    && <Pagination
                        totalItem={totalItem}
                        itemPerPage={itemPerPage}
                        onClick={handlePagination}
                    />
                }
            </div>
            <SearchBox />
        </div>
    );
}

export default ToursSearch;