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
                setCounter(counter == length - 1 ? 0 : counter + 1);
                break;

            case 'DOWN':
                setCounter(counter == 0 ? length - 1 : counter - 1);
                break;
        }
    }

    useEffect(() => {
        const id = setInterval(() => {
            setCounter(prev => {
                if (prev == length - 1)
                    return 0;
                else
                    return prev + 1;
            });
        }, 10000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className={classes}>
            <button
                className={cx('slider__btn__prev')}
                onClick={() => handleClick('UP')}
            ></button>
            <div className={cx('slider__images')}>
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img.src}
                        alt={img.alt}
                        className={cx(index == counter ? 'active' : 'disable')}
                    />
                ))}
            </div>
            <div className={cx('slider__bullets')}>
                {images.map((item, index) => (
                    index == counter
                        ? <i key={index} className={cx('bullet', 'active')} />
                        : <i key={index} className={cx('bullet', 'disable')} onClick={() => setCounter(index)} />
                )
                )}
            </div>
            <button
                className={cx('slider__btn__next')}
                onClick={() => handleClick('DOWN')}
            ></button>
        </div >
    );
}

export default Slider;