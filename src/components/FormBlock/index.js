import PropTypes from 'prop-types';
import classNames from "classnames/bind";

import style from './FormBlock.module.scss';

const cx = classNames.bind(style);

function FormBlock({
    title,
    children,
    className,
    onSubmit
}) {
    const classes = cx('form-block', {
        [className]: className
    });
    
    return (
        <div className={classes}>
            <p className={cx('form-block__title')}>{title}</p>
            <form className={cx('form-block__inputs')} onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
}

FormBlock.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default FormBlock;