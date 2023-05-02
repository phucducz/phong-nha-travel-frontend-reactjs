import classNames from "classnames/bind";
import { useState } from "react";

import style from "~/components/AccountStyle/AccountStyle.scss";
import Input from "~/components/Input";

const cx = classNames.bind(style);

function AccountPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className={cx('container_account')}>
            <div className={cx('account')}>
                <h3 className={cx('account_title')}>Đăng nhập</h3>
                <div className={cx('username')}>
                    <h3>Tài khoản</h3>
                    <Input
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='username'
                        content="Tên đăng nhập"
                    />
                </div>
                <div className={cx('password')}>    
                    <div class="password_t">
                        <h3>Mật khẩu</h3>
                        <h3>Bạn đã quên mật khẩu?</h3>
                    </div>
                    <Input
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='password'
                        content="Mật khẩu"
                    />
                </div>
            </div>
            <div className={cx('sign-in')}>
                
            </div>
        </div>
    )
}

export default AccountPage;