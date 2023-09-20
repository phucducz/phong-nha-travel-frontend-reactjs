import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";

import style from './Item.module.scss';
import { formatMoney } from "~/format";
import Button from "~/components/Button";
import { CATEGORY_ICONS } from "~/constant";
import Icon from "~/components/Icon";

const cx = classNames.bind(style);

function Item({
    data,
    categories,
    className,
    ...passProps
}
) {
    const navigate = useNavigate();

    const classes = cx('tours__item', {
        [className]: className
    });

    return (
        <div className={classes} {...passProps}>
            <div className={cx('tours__item__image')} onClick={() => navigate(`/tours/${data.name}/${data.id}`)}>
                <img src={data.image} alt={data.name} />
            </div>
            <div className={cx('item__image_category')}>
                {categories.map(category => {
                    return CATEGORY_ICONS.map(icon => {
                        return +icon.id === +category.categories_id
                            && <Link to={`/tour-category/${icon.title}`}>
                                <Icon
                                    id={category.id}
                                    key={icon.id}
                                    data={icon}
                                    href={`${icon.to}/${icon.title}`}
                                    toolTip
                                />
                            </Link>
                    })
                })}
            </div>
            <div className={cx('tours__item__content')}>
                <div className={cx('tours__item__content__item')}>
                    <Link to={`/tours/${data.name}/${data.id}`}>{data.name}</Link>
                    <p>{data.description}</p>
                </div>
                <div className={cx('tours__item__content__price')}>
                    <h3>{formatMoney(data.priceAdult)}</h3>
                    <p>per person</p>
                    <Button rounded to={`/tours/${data.name}/${data.id}`}>view tour</Button>
                </div>
            </div>
        </div>
    );
}

Item.propTypes = {
    data: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default Item;