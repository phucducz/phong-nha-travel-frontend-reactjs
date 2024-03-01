import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Loading from '~/components/Loading';
import SocialNetWork from '~/components/SocialNetwork';
import { SOCIAL_NETWORKS } from '~/constant';
import style from './DefaultLayout.module.scss';
import Footer from './Footer';
import Header from './Header';
import { useEffect } from 'react';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    const loading = useSelector(state => state.loading);

    useEffect(() => {
        sessionStorage.setItem('user', '');
    }, []);

    return (
        <>
            <Loading visible={loading.loading} />
            <Header />
            <div className={cx('main')}>{children}</div>
            {/* <Footer /> */}
            <SocialNetWork data={SOCIAL_NETWORKS} />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout
