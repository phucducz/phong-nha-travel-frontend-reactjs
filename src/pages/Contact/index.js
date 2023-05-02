import { Fragment, useContext } from "react";
import Content from "../Content";
import { ThemeContext } from "../ThemeProvider";

function Contact() {
    console.log(ThemeContext);
    const context = useContext(ThemeContext);

    return (
        <Fragment>
            <button
                onClick={context.toggleTheme}
                style={{ marginTop: '20rem' }}>Theme
            </button>
            <Content></Content>
        </Fragment>
    )
}

export default Contact;