import classNames from "classnames/bind";
import { memo, useRef } from "react";

import style from './ContentBoxStyle.scss';
import Button from "../Button";
import MessageBox from "../MessageBox";
import { useMessageBox } from "~/context";

const cx = classNames.bind(style);

function ContentBox({
    title,
    visible,
    setVisible,
    className,
    children,
    ...passProps
}) {
    const { visibleMessage, setVisibleMessage } = useMessageBox();

    let Comp = 'div';

    let props = {
        ...passProps
    }

    const wrapper = useRef();

    const classes = cx('wrapper-content', {
        [className]: className,
    });

    if (wrapper.current) {
        if (visible) {
            wrapper.current.style.display = 'block';
            setTimeout(() => {
                wrapper.current.setAttribute('class', `${classes} active-content`);
            }, 200);
        }
        else {
            wrapper.current.setAttribute('class', `${classes} hide-content`);
            setTimeout(() => {
                wrapper.current.style.display = 'none';
            }, 400);
        }
    }
    
    let propButton = {};
    if (visibleMessage)
        propButton.disabled = true;

    return (
        <>
            <Comp
                ref={wrapper}
                className={classes}
                {...props}
            >
                <h3 className={cx('title-input')}>{title}</h3>
                {children}
                <div className={cx('cn-button')}>
                    <Button
                        small
                        cancel
                        onClick={() => setVisible(false)}
                        {...propButton}
                    >
                        Thoát
                    </Button>
                    <Button
                        type='button'
                        small
                        primary
                        onClick={() => setVisibleMessage(true)}
                        {...propButton}
                    >
                        Đồng ý
                    </Button>
                </div>
            </Comp>
            <MessageBox
                visible={visibleMessage}
                setVisible={setVisibleMessage}
                setVisibleContent={setVisible}
            />
        </>
    )
}

export default memo(ContentBox);