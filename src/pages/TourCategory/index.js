import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import style from './TourCategory.module.scss';
import { getService } from "~/services";
import TourItem from "~/components/TourItem";
import { useSelector } from "react-redux";
import SearchBox from "~/components/SearchBox";
import Pagination from "~/components/Pagination";

const cx = classNames.bind(style);

function TouCategory() {
    const { categoryName } = useParams();

    const tourCategories = useSelector(state => state.tourCategories);
    const { listData } = tourCategories;

    const [tours, setTours] = useState([]);
    const [toursOfPage, setToursOfPage] = useState([]);

    useEffect(() => {
        const fetchTourByCategoryName = async name => {
            const result = await getService('categories', {
                categoryCode: name
            });

            setTours(result[0].listTour);
            handlePagination(1, result[0].listTour);
        }

        fetchTourByCategoryName(categoryName);
    }, [categoryName]);

    let itemPerPage = 3;
    
    const handlePagination = (currentPage = 1, data = []) => {
        let toursCurrent = data.slice(
            itemPerPage * (currentPage - 1),
            itemPerPage * currentPage
        );

        setToursOfPage(toursCurrent);
    };

    return (
        <div className={cx('tours-categories')}>
            <div className={cx('tours')}>
                <TourItem
                    data={toursOfPage}
                    tourCategories={listData}
                />
                {toursOfPage
                    && <Pagination
                        data={tours}
                        totalItem={tours.length}
                        itemPerPage={itemPerPage}
                        onClick={handlePagination}
                    />
                }
            </div>
            <SearchBox />
        </div>
    );
}

export default TouCategory;