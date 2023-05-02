import FooterStyle from "~/components/FooterStyles";
import { Fragment } from "react";
import { useEffect, useState } from "react";

function Footer() {
    const [showGotoTop, setShowGotoTop] = useState(false);
    useEffect(() => {
        window.onscroll = () => {
            setShowGotoTop(window.scrollY >= 200);
        };
    }, []);

    return (
        <FooterStyle>
            <div style={{position: 'static'}} className="footer-container">
                {showGotoTop === true ?
                    <i id="fa-chevron-up" className="fa-solid fa-chevron-up"
                        onClick={() => document.documentElement.scrollTop = 0}
                        style={{ left: '2%' }}
                    ></i> :
                    <i id="fa-chevron-up" className="fa-solid fa-chevron-up"
                        onClick={() => document.documentElement.scrollTop = 0}
                        style={{ left: '-4%' }}
                    ></i>}
                <div className="footer">
                    <p className="footer__license font--size">
                        © 2021 Bản quyền thuộc về Phong Nha Travel | Developed by DOKE.
                    </p>
                    <div className="footer__cks">
                        <a className="font--size" href=""> Terms & Conditions</a>
                        <a className="font--size" href="">Privacy</a>
                        <a className="font--size" href="">Policy</a>
                        <a className="font--size" href="">Liên Hệ</a>
                    </div>
                </div>
            </div>
        </FooterStyle>
    )
}

export default Footer