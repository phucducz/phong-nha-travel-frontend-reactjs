import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import style from './Item.module.scss';
import { formatMoney } from "~/format";
import { CATEGORY_ICONS } from "~/constant";
import Icon from "./Icon";

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
                    <img
                        src={data.image}
                        alt={data.name}
                        onClick={() => navigate(`/view/tour/${data.id}`)}
                    />
                    <p className={cx('item__image__price', { [type]: type })}>
                        <span>
                            <span>{formatMoney(data.price)}</span>
                        </span>
                    </p>
                    <div className={cx('item__label')}>
                        <p>tour book nhiều</p>
                    </div>
                </div>
                <div className={cx('item__icons')}>
                    {categories && categories.map(category => {
                        if (category.tours_id === data.id) {
                            return CATEGORY_ICONS.map(icon =>
                                icon.id === +category.categories_id
                                && (
                                    <Icon key={icon.id} data={icon} />
                                )
                            )
                        }
                    })}
                </div>
            </div>
            <div className={cx('gridtours__standout__content')}>
                <h3 onClick={() => navigate(`/view/tour/${data.id}`)}>{data.name}</h3>
                <p className={cx('description-tour')}>{data.description}</p>
            </div>
            <div className={cx('gridtours__standout__attributes')}>
                <FontAwesomeIcon icon={faArrowRight} />
            </div>
        </div>
    );
}

export default Item;