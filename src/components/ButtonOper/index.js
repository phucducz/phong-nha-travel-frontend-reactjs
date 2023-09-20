import classNames from "classnames/bind";

import style from "./ButtonOperStyle.scss";

const cx = classNames.bind(style);

function ButtonOper({ children, className, onClick }) {
    
    const classes = cx('button_oper', {
        [className]: className
    });

    return (
        <button
            className={classes}
            onClick={() => onClick()}
        >
            {children}
        </button>
    )
}

export default ButtonOper;