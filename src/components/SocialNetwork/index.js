import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faXmark } from '@fortawesome/free-solid-svg-icons';

import style from './SocialStyle.module.scss';
import { image } from '~/images';
import { faFacebook, faRocketchat } from '@fortawesome/free-brands-svg-icons';
import ModalMessage from '../ModalMessage';

const cx = classNames.bind(style);

function SocialNetWork() {
    const [active, setActive] = useState('form-zalo');

    function handleOpenZalo() {
        setActive('form-zalo-active');
    }

    function handleCloseZalo() {
        setActive('form-zalo');
    }

    return (
        <div className={cx('containter-social')}>
            <div className={cx('containter-social__icon')}>
                <div className={cx('phone')}>
                    <p className={cx('phone__number')}>0388599339</p>
                    <FontAwesomeIcon className={cx('phone_icon')} icon={faPhoneVolume} />
                </div>
                <img className={cx('instagram')} src={image.instagram} alt='instagram' />
                <FontAwesomeIcon className={cx('facebook')} icon={faFacebook} />
                <div className={cx('container-zalo')}>
                    <img
                        className={cx('zalo')}
                        src={image.zalo}
                        alt=''
                        onClick={handleOpenZalo}
                    />
                    <ModalMessage>
                        <div className={cx(active)}>
                            <div className={cx('container-left')}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={cx('close')}
                                    onClick={handleCloseZalo}
                                />
                                < div className={cx('form-zalo__footter')} >
                                    <img className={cx('form-zalo__logo')} src={image.logo} alt='' />
                                    <div className={cx('form-zalo__title')}>
                                        <h3>Phong Nha Travel</h3>
                                        <p>Liên hệ</p>
                                    </div>
                                </div>
                                <div className={cx('messeage_button')}>
                                    <button className={cx('form-zalo__button')}>
                                        <FontAwesomeIcon icon={faRocketchat} className={cx('chat')}/>
                                        <p>Nhắn tin</p>
                                    </button>
                                </div>
                                <div className={cx('form-zalo__introduce')}>
                                    <h3>Giới thiệu bản thân</h3>
                                    <p>To Travel - To Discovery <br />
                                        Hơn cả du lịch, mỗi chuyến đi còn là những trải nghiệm khám phá.</p>
                                </div>
                            </div>
                            <div className={cx('container-right')}>
                                <img src={image.QRCode} alt='' />
                                <p>Mở Zalo, bấm quét QR để quét và xem trên điện thoại.</p>
                            </div>
                        </div>
                    </ModalMessage>
                </div>
            </div>
        </div>
    )
}

export default SocialNetWork;