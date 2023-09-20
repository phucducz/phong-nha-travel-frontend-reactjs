import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import style from "./ErrorStyle.scss";

const cx = classNames.bind(style);

function ErrorStyles({ children }) {
    return <div className={cx('wrapper')}>{children}</div>
}

ErrorStyles.propTypes = {
    children: PropTypes.node.isRequired
}

export default ErrorStyles;