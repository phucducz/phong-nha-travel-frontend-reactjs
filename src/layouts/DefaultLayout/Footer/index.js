import { useEffect, useState } from "react";
import classNames from "classnames/bind";

import style from '~/components/FooterStyles/FooterStyle.module.scss';
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Footer() {
    const [showGotoTop, setShowGotoTop] = useState(false);
    useEffect(() => {
        window.onscroll = () => {
            setShowGotoTop(window.scrollY >= 200);
        };
    }, []);

    return (
        <div style={{ position: 'static' }} className={cx('footer-container')}>
            {showGotoTop === true ?
                <i id="fa-chevron-up" className={cx('fa-solid fa-chevron-u')}
                    onClick={() => document.documentElement.scrollTop = 0}
                    style={{ left: '2%' }}
                ></i> :
                <i id="fa-chevron-up" className={cx('fa-solid fa-chevron-u')}
                    onClick={() => document.documentElement.scrollTop = 0}
                    style={{ left: '-4%' }}
                ></i>}
            <div className={cx('footer')}>
                <p>
                    © 2021 Bản quyền thuộc về Phong Nha Travel | Developed by DVPD.
                </p>
                <div className={cx('footer__cks')}>
                    <Link to="#"> Terms & Conditions</Link>
                    <Link to="#">Privacy</Link>
                    <Link to="#">Policy</Link>
                    <Link to="#">Liên Hệ</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer