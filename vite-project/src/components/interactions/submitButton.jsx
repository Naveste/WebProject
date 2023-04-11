import React, {useContext} from "react";
import {AppContext} from "../../functions/AppContext.jsx";

export default function Submit({onClick}) {

    const {input} = useContext(AppContext);

    return (
        <button className={input.length > 0 ? "submit-btn" : "submit-btn disabled"} onClick={onClick}>Submit</button>
    );
}