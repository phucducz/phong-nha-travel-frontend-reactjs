import '../index.css';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider';

function Paragraph() {
    const context = useContext(ThemeContext);
    console.log(context);

    return (
        <p className={context.theme}>This is the Paragraph component</p>
    )
}

export default Paragraph;