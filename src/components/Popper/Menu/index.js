import PropTypes from 'prop-types';
import { useState } from "react";

import Item from "./Item";
import Header from './Header';

function Menu({
    data
}) {
    const [history, setHistory] = useState([{ data: data }]);
    const current = history[history.length - 1];

    return (
        <>
            {!!current.header
                && <Header
                    title={current.header.title}
                    icon={current.header.icon}
                    onBack={() =>
                        setHistory(prev => prev.slice(0, history.length - 1))
                    }
                />
            }
            {current.data.map((item, index) => {
                const isParent = !!item.children;
                return (
                    <Item
                        key={index}
                        data={item}
                        onClick={() => {
                            if (isParent) {
                                setHistory(prev => [
                                    ...prev,
                                    item.children
                                ]);
                            }
                        }}
                    />
                )
            })}
        </>
    );
}

Menu.propTypes = {
    data: PropTypes.array.isRequired
}

export default Menu;