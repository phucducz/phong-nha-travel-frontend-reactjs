import { useReducer, useState } from 'react';

import Context from './Context';
import reducer, { initState } from './reducer';

function Provider({ children }) {
    //reducer
    const [state, dispatch] = useReducer(reducer, initState);
    
    //constant
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState({
        status: '',
        icon: "",
        messagePrimary: "",
        messageSub: ""
    });
    const [visibleButton, setVisibleButton] = useState(false);
    const [visibleMessage, setVisibleMessage] = useState(false);
    const [visibleContent, setVisibleContent] = useState(false);
    const [result, setResult] = useState({});
    const [payload, setPayload] = useState({});

    //function
    const [action, setAction] = useState();

    const values = {
        message, 
        setMessage,
        visibleButton,
        setVisibleButton,
        result,
        setResult,
        visibleMessage,
        setVisibleMessage,
        visibleContent,
        setVisibleContent,
        action,
        setAction,
        payload,
        setPayload,
        state,
        dispatch,
        title, 
        setTitle
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export default Provider;