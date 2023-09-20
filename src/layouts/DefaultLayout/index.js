import { Fragment } from 'react';

import Header from './Header';
import Footer from './Footer';
// import SocialNetWork from '~/components/SocialNetwork';

function DefaultLayout({ children }) {
    return (
        <Fragment>
            <Header />
            <div style={{marginTop: '-1.7rem'}}>{children}</div>
            <Footer />
            {/* <SocialNetWork /> */}
        </Fragment>
    )
}

export default DefaultLayout
