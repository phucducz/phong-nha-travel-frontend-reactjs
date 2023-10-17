import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './DefaultLayout.module.scss';
import Header from './Header';
import Footer from './Footer';
import SocialNetWork from '~/components/SocialNetwork';
import { SOCIAL_NETWORKS } from '~/constant';
import Loading from '~/components/Loading';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    const loading = useSelector(state => state.loading);

    return (
        <>
            <Loading visible={loading.loading} />
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
