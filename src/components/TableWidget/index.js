import classNames from "classnames/bind";

import style from './TableWidget.module.scss';

const cx = classNames.bind(style);

function TableWidget({
    className,
    children,
}) {
    const classes = cx('table-widget', {
        [className]: className
    });

    return (
        <div className={classes}>
            <table className={cx('table')}>
                {children}
            </table>
        </div>
    );
}

export default TableWidget;