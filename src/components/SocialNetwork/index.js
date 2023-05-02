import { useState, memo } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import SocialStyle from '~/components/SocialStyles';
import { image } from '~/images';

function SocialNetWork() {
    const [active, setActive] = useState('form-zalo');

    function handleOpenZalo() {
        console.log(active)
        setActive('form-zalo-active');
    }

    function handleCloseZalo() {
        setActive('form-zalo');
    }
    
    return (
        <SocialStyle>
            <div className="social-network">
                <div id="containter-social" className="containter-social">
                    <div className="containter-social__icon">
                        <div className="phone">
                            <p className="phone__number">0388599339</p>
                            <i className="fa-sharp fa-solid fa-phone-volume font-size-icon --position">
                            </i>
                        </div>
                        <i className="fa-brands fa-facebook-f --position font-size-icon"></i>
                        <img className="instagram --position" src={image.instagram} alt="" />
                        {/* <i className="fa-brands fa-twitter --position"></i> */}
                        <div className="container-zalo">
                            <img className="zalo --position" src={image.zalo}
                                alt="" onClick={handleOpenZalo} />
                            <div>
                                <div id="form-zalo" className={active}>
                                    <div className="container-left">
                                        <i className="fa-solid fa-xmark" onClick={handleCloseZalo}></i>
                                        <div className="form-zalo__footter">
                                            <img className="form-zalo__logo" src={image.logo} alt="" />
                                            <div className="form-zalo__title">
                                                <h3 className="--font-title">Phong Nha Travel</h3>
                                                <p>Liên hệ</p>
                                            </div>
                                        </div>
                                        <div className="messeage_button">
                                            <button className="form-zalo__button">
                                                <i className="fa-brands fa-rocketchat"></i>
                                                <p>Nhắn tin</p>
                                            </button>
                                        </div>
                                        <div className="form-zalo__introduce">
                                            <h3 className="--font-title">Giới thiệu bản thân</h3>
                                            <p>To Travel - To Discovery <br />
                                                Hơn cả du lịch, mỗi chuyến đi còn là những trải nghiệm khám phá.</p>
                                        </div>
                                    </div>
                                    <div className="container-right">
                                        <img src={image.QRCode} alt="" />
                                        <p>Mở Zalo, bấm quét QR để quét và xem trên điện thoại.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </SocialStyle>
    )
}

export default memo(SocialNetWork);