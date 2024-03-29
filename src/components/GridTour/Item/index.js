import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import Icon from "~/components/Icon";
import { CATEGORY_ICONS, TOUR_TYPES } from "~/constant";
import { formatMoney } from "~/format";
import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({
    data,
    categories,
    round,
    itemRef,
    ...passProps
}) {
    const navigate = useNavigate();

    const { type } = data;

    const handleNavigate = (name, id) => {
        const listName = name.split(' ');
        navigate(`/tours/${listName.join('-')}/${id}`);
    }

    return (
        <div className={cx('gridtours__standout')} ref={itemRef} {...passProps}>
            <div className={cx('gridtours__standout__item')}>
                <div className={cx('item__image', { round })}>
                    <div onClick={() => handleNavigate(data.name, data.id)}>
                        <img
                            src={data.listImage[0].image}
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
                        return CATEGORY_ICONS.map(icon =>
                            icon.id === category
                            && <Link to={icon.to}>
                                <Icon id={category.id} key={icon.id} data={icon} toolTip />
                            </Link>
                        );
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
}

export default Item;