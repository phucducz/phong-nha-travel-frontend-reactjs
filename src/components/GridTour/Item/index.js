import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';

import style from './Item.module.scss';
import { formatMoney } from "~/format";
import { CATEGORY_ICONS } from "~/constant";
import Icon from "~/components/Icon";
import { TOUR_TYPES } from "~/constant";

const cx = classNames.bind(style);

function Item({
    data,
    categories,
    round,
    type,
    ...passProps
}) {
    const navigate = useNavigate();

    return (
        <div className={cx('gridtours__standout')} {...passProps}>
            <div className={cx('gridtours__standout__item')}>
                <div className={cx('item__image', { round })}>
                    <div onClick={() => navigate(`/tours/${data.name}/${data.id}`)}>
                        <img
                            src={data.image}
                            alt={data.name}
                        />
                    </div>
                    <p className={cx('item__image__price', { [type]: type })}>
                        <span>
                            <span>{formatMoney(data.price || data.priceAdult)}</span>
                        </span>
                    </p>
                    {TOUR_TYPES.map((item, index) => (
                        item.type === type
                        && <div key={index} className={cx('item__label', item.type)}>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>
                <div className={cx('item__icons')}>
                    {categories.length && categories.map(category => {
                        if (category.tours_id || category.tourId === data.id) {

                            return CATEGORY_ICONS.map(icon =>
                                icon.id === (category.categories_id || category.categoryId)
                                && <Link to={`${icon.to}/${icon.title}`}>
                                    <Icon id={category.id} key={icon.id} data={icon} toolTip />
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
            <div className={cx('gridtours__standout__content')}>
                <Link to={`/tours/${data.name}/${data.id}`}>{data.name}</Link>
                <p className={cx('description-tour')}>{data.description}</p>
            </div>
            <div className={cx('gridtours__standout__attributes')}>
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>
    );
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    round: PropTypes.bool,
    type: PropTypes.string.isRequired,
}

export default Item;