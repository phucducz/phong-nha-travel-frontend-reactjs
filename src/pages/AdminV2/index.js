import classNames from "classnames/bind";

import style from './AdminV2.module.scss';

const cx = classNames.bind(style);

function AdminV2() {
    return (
        <div className={cx('admin-page')}>
            <div>
                
            </div>
            <div className={cx('admin-page__header')}>

            </div>
        </div>
    );
}

export default AdminV2;