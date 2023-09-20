import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import style from './DefaultLayout.module.scss';
import Header from './Header';
import Footer from './Footer';
import SocialNetWork from '~/components/SocialNetwork';
import { SOCIAL_NETWORKS } from '~/constant';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className={cx('main')}>{children}</div>
            <Footer />
            <SocialNetWork data={SOCIAL_NETWORKS} />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout
