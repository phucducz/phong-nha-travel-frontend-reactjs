import classNames from "classnames/bind";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";

import style from './SearchBox.module.scss';
import Input from "../Input";
import { Range } from "../Range";
import Button from "../Button";
import DropDown from "../Menu/DropDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(style);

function SearchBox({
    className,
    categories,
    ...passProps
}) {
    const [activeCatg, setActiveCatg] = useState('');

    const classes = cx('search-box', {
        [className]: className
    });

    return (
        <div className={classes} {...passProps}>
            <h3 className={cx('search-box__title')}>tìm kiếm tour</h3>
            <div className={cx('search-box__inputs')}>
                <Input
                    tiny
                    rightIcon={faSearch}
                    name='name'
                    content='Search name'
                    required
                    className={cx('inputs__search')}
                />
                <div className={cx('inputs__range')}>
                    <Input
                        mini
                        name='start'
                        content='Start'
                        type='text'
                        required
                    />
                    <Input
                        mini
                        name='end'
                        content='End'
                        type='text'
                        required
                    />
                </div>
                <div className={cx('price-range')}>
                    <Range
                        min={0}
                        max={4850000}
                        className={cx('price-range__rg')}
                    />
                </div>
                <div className={cx('category')}>
                    <Button
                        className={cx('category__button', activeCatg && 'active')}
                        onClick={() => setActiveCatg(!activeCatg)}
                        rightIcon={<FontAwesomeIcon icon={faBars} />}
                    >
                        Category
                    </Button>
                    {categories
                        && <DropDown
                            data={categories}
                            placement='top-middle'
                            header={<Input className={cx('dropdown-menu__search')} />}
                            className={cx('dropdown-menu', activeCatg && 'active')}
                        />
                    }
                </div>
            </div>
            <Button className={cx('search-box__button')}>find tours</Button>
        </div>
    )
}

export default SearchBox;