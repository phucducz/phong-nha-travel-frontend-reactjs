import classNames from "classnames/bind";
import PropTypes from 'prop-types';

import style from './TourItem.module.scss';
import Item from './Item';

const cx = classNames.bind(style);

function TourItem({
    data,
    className,
    tourCategories
}) {
    const classes = cx('tours', {
        [className]: className
    });

    return (
        <div className={classes}>
            {data && data.map(tour => {
                let categories = [];

                tourCategories.forEach(item => {
                    if (parseInt(item.tours_id) === parseInt(tour.id))
                        categories.push(item);
                });

                return <Item
                    key={tour.id}
                    data={tour}
                    categories={categories}
                />
            })}
        </div>
    )
}

TourItem.propTypes = {
    data: PropTypes.array.isRequired,
    tourCategories: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default TourItem;