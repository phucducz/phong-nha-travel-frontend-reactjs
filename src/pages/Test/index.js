import classNames from "classnames/bind";
import { createContext, useMemo, useReducer, useState } from "react";

import style from './Test.module.scss';
import Content from "./Content";

const cx = classNames.bind(style);

export const Context = createContext();

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    name: action.payload.name,
                    price: parseInt(action.payload.price)
                }
            ];
        default:
            return state;
    }
}

function Test() {
    const [todo, dispatch] = useReducer(reducer, initialState);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [theme, setTheme] = useState('dark');

    const total = useMemo(() => {
        let total = todo.reduce((result, todo) => {
            return result + todo.price;
        }, 0);

        return total;
    }, [todo]);

    const handleClick = () => {
        dispatch({
            type: 'ADD_TODO',
            payload: {
                name: name,
                price: price
            }
        });
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const themes = {
        theme,
        toggleTheme
    }

    return (
        <Context.Provider value={themes}>
            <div className={cx('test')}>
                <div>
                    <h1>Name:</h1>
                    <input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <h1>Price:</h1>
                    <input value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <h1>Toal: {total}</h1>
                <div><button onClick={handleClick}>Add</button></div>
                <ul>
                    {todo.map((todo, index) => (
                        <li key={index}>{todo.name}</li>
                    ))}
                </ul>
                <Content />
            </div>
        </Context.Provider>
    )
}

export default Test;