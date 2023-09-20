import classNames from "classnames/bind";

import style from "./DataViewStyle.scss";

const cx = classNames.bind(style);

function DataView({ children, index }) {
    return (
        <div
            key={index}
            className={cx(`product-box_item ${index % 2 !== 0 && "product-odd"}`)}
        >
            <div className="item">
                {children}
            </div>
        </div>
    )
}

export default DataView;