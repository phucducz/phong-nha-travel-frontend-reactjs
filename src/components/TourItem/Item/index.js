import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";

import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { CATEGORY_ICONS } from "~/constant";
import { formatMoney } from "~/format";
import style from './Item.module.scss';

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

    const { image } = data.listImage[0];

    const handleNavigate = (name, id) => {
        const listName = name.split(' ');

        return `/tours/${listName.join('-')}/${id}`;
    }

    return (
        <div className={classes} {...passProps}>
            <div className={cx('tours__item__image')} onClick={() => navigate(handleNavigate(data.name, data.id))}>
                <img src={image} alt={data.name} />
                <div className={cx('item__image_category')}>
                    {data.categoryIds.map(category => {
                        return CATEGORY_ICONS.map(icon => {
                            return icon.id === category
                                && <Link to={`/${icon.to}`}>
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
            </div>
            <div className={cx('tours__item__content')}>
                <div className={cx('tours__item__content__item')}>
                    <Link to={handleNavigate(data.name, data.id)}>{data.name}</Link>
                    <p>{data.description}</p>
                </div>
                <div className={cx('tours__item__content__price')}>
                    <h3>{formatMoney(data.priceAdult)}</h3>
                    <p>per person</p>
                    <Button rounded to={handleNavigate(data.name, data.id)}>view tour</Button>
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