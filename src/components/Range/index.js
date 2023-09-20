import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import style from './Range.module.scss';
import { formatMoney } from "~/format";

const cx = classNames.bind(style);

function Range({
    min,
    max,
    className,
    onChange
}) {
    const classes = cx('wrapper-range', {
        [className]: className
    });

    const [minValue, setMinValue] = useState(+min);
    const [maxValue, setMaxValue] = useState(+min);
    const progessRef = useRef();
    const [position, setPosition] = useState({
        left: 0,
        right: 0
    });

    const handleChange = (cases, e) => {
        let min = minValue, max = maxValue, value = e.target.value;

        switch (cases) {
            case 'MIN':
                min = value;
                setMinValue(value);
                break;

            case 'MAX':
                max = value;
                setMaxValue(value);
                break;

            default:
                throw new Error('Invalid case!');
        }

        onChange(+min, +max);
    }

    useEffect(() => {
        let percent = (minValue / max) * 100;
        setPosition(prev => ({
            ...prev,
            left: percent
        }));
    }, [minValue]);

    useEffect(() => {
        let percent = 100 - (maxValue / max) * 100;
        setPosition(prev => ({
            ...prev,
            right: percent
        }));
    }, [maxValue]);

    useEffect(() => {
        progessRef.current.style = `left: ${position.left}%; right: ${position.right}%`;
    }, [position]);

    return (
        <>
            <div className={classes}>
                <div className={cx('range__input')}>
                    <input type='range'
                        min={min}
                        max={max}
                        defaultValue={min}
                        className={cx('range__input__min')}
                        onChange={e => handleChange('MIN', e)}
                        step='1'
                    />
                    <input type='range'
                        min={min}
                        max={max}
                        className={cx('range__input__max')}
                        defaultValue={min}
                        onChange={e => handleChange('MAX', e)}
                        step='1'
                    />
                </div>
                <div ref={progessRef} className={cx('range__progress')}></div>
            </div>
            <div className={cx('price-range__label')}>
                <label className={cx('label__min')}>{formatMoney(minValue)}</label>
                <label className={cx('label__separator')}>-</label>
                <label className={cx('label__max')}>{formatMoney(maxValue)}</label>
            </div>
        </>
    )
}

Range.propTyeps = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    className: PropTypes.string,
}

export default Range;