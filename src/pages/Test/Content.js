import { memo, useContext } from "react";
import { Context } from "./index";

function Content({
    value,
    setValue
}) {
    const context = useContext(Context);
    
    return (
        <div>
            <h1>{context.theme}</h1>
            <button onClick={context.toggleTheme}>Down</button>
        </div>
    );
}

export default memo(Content);