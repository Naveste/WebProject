import Header from "./Header.jsx";
import InputArea from "./interactions/InputArea.jsx";
import Submit from "./interactions/submitButton.jsx";
import Sidebar from "./sidebar/index.jsx";
import React, {useContext} from "react";
import {AppContext} from "../functions/AppContext.jsx";

const RenderLayout = () => {

    const {handleInputChange, addItem, input} = useContext(AppContext);

    const addItemOnEnter = (event) => {
        return event.key === 'Enter' && addItem();
    }

    return (
        <>
            <Header />
            <div className="search-input-field">
                <InputArea value={input} onKeyDown={addItemOnEnter} onChange={handleInputChange} />
                <Submit onClick={addItem} />
            </div>
            <Sidebar />
        </>
    )
}
export default RenderLayout;