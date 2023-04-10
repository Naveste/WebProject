import Header from "./Header.jsx";
import InputArea from "./interactions/InputArea.jsx";
import Submit from "./interactions/submitButton.jsx";
import Sidebar from "./sidebar/index.jsx";
import React from "react";

const RenderLayout = (
    {
        handleInputChange,
        addItem,
        input,
        archivedList,
        setArchivedList,
        toDoList,
        setToDoList,
        showArchived
    }) => {

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
            <Sidebar { ...{handleInputChange, addItem, input, archivedList, setArchivedList, toDoList, setToDoList, showArchived} }
            />
        </>
    )
}
export default RenderLayout;