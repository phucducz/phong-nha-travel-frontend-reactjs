import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import style from './Slider.module.scss';

const cx = classNames.bind(style);

function Slider({
    images,
    className
}) {
    const classes = cx('slider', {
        [className]: className
    });

    const [counter, setCounter] = useState(0);
    let length = images.length;

    const handleClick = (cases) => {
        switch (cases) {
            case 'UP':
                setCounter(prev => prev === length - 1 ? 0 : prev + 1);
                break;

            case 'DOWN':
                setCounter(prev => prev === 0 ? length - 1 : prev - 1);
                break;

            default:
                throw new Error('Invalid case!');
        }
    }

    useEffect(() => {
        const id = setInterval(() => {
            setCounter(prev => {
                if (prev === length - 1)
                    return 0;
                else
                    return prev + 1;
            });
        }, 10000);

        return () => clearInterval(id);
    }, []);

    console.log(counter);

    return (
        <div className={classes}>
            <button
                className={cx('slider__btn__prev')}
                onClick={() => handleClick('DOWN')}
            ></button>
            <div className={cx('slider__images')}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img.src}
                        alt={img.alt}
                        className={cx(index === counter ? 'active' : 'disable')}
                    />
                ))}
            </div>
            <div className={cx('slider__bullets')}>
                {images.map((item, index) => (
                    index === counter
                        ? <i key={index} className={cx('bullet', 'active')} />
                        : <i key={index} className={cx('bullet', 'disable')} onClick={() => setCounter(index)} />
                )
                )}
            </div>
            <button
                className={cx('slider__btn__next')}
                onClick={() => handleClick('UP')}
            ></button>
        </div >
    );
}

Slider.propTypes = {
    images: PropTypes.array.isRequired,
    className: PropTypes.string
}

export default Slider;