import React, {useEffect, useState} from "react";
import './App.css';
import Delete from "./components/interactions/deleteButton.jsx";
import {formattedDate} from "./functions/formattedDate.jsx";
import {convertToLink, URL_REGEX} from "./functions/convertToLink.jsx";
import RenderLayout from "./components/RenderLayout.jsx";
import SearchInList from "./components/SearchInList.jsx";
import DisplayList from "./components/DisplayList.jsx";
import {AppContext} from "./functions/AppContext.jsx";

function App() {
    const [toDoList, setToDoList] = useState(() => JSON.parse(localStorage.getItem("listKey")) || []);
    const [archivedList, setArchivedList] = useState(() => JSON.parse(localStorage.getItem("archiveKey")) || []);

    const [input, setInput] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [showImportantOnly, setShowImportantOnly] = useState(false);

    function contextValues(){
        return {
            toDoList, setToDoList, handleInputChange, addItem, input, archivedList,
            setArchivedList, showArchived, setShowArchived, ifSearching, returnStateObject,
            searchText, setSearchText, showImportantOnly, setShowImportantOnly}
    }

    useEffect(() => {
        localStorage.setItem('listKey', JSON.stringify(toDoList));
    }, [toDoList]);

    useEffect(() => {
        localStorage.setItem('archiveKey', JSON.stringify(archivedList));
    }, [archivedList]);

    const handleInputChange = (event) => {
        event.preventDefault();
        setInput(event.target.value)
    }

    if (archivedList.length === 0 && showArchived) {
        setShowArchived(false);
    }

    const addItem = () => {
        const newList = [...toDoList,
            {
                id: crypto.randomUUID(),
                text: input.trim(),
                isFavorite: false,
                isArchived: false,
                date: formattedDate(),
                edited: null
            }];

        if (input.trim().length > 0) {
            setToDoList(newList);
        }
        // clear input after submission
        setInput("");
    }

    const deleteItem = (itemToDelete) => {

        if (toDoList.length === 1 && showImportantOnly){
            setShowImportantOnly(false);
        }

        setToDoList(toDoList.filter((item) => item !== itemToDelete));
    }

    const handleIsImportant = (id) => {
        setToDoList(toDoList.map(item => (
            item.id === id ? {
                ...item,
                isFavorite: !item.isFavorite
            } : item)
        ))
    }

    const handleEdit = (id, newText) => {
        setToDoList(toDoList.map(item => (
            item.id === id ? {
                ...item,
                text: newText,
                edited: formattedDate()
            } : item)
        ))
    }

    const editNote = (id, text) => {
        const newText = window.prompt("Edit note:", text);

        if (newText !== null && newText !== text) {
            handleEdit(id, newText);
        }
    }

    const ifSearching = () => {
        setIsSearching(prev => !prev)
        // reset the search input field after exiting search
        searchText.length && setSearchText("");
    }

    const returnStateObject = (object) => {
        const moveToArchive = (item) => {
            setArchivedList([...archivedList, {
                ...item,
                isArchived: !item.isArchived,
            },
            ]);

            deleteItem(item);
        }

        return (
            object.slice(0).reverse().map((item, index) =>
                <li key={index}>
                    {!item.isFavorite && <Delete onClick={() => deleteItem(item)} name={"Delete note"}/>}

                    <button className="edit-btn" onClick={() => {editNote(item.id, item.text)}}>Edit note</button >

                    <button className="delete-btn" onClick={() => handleIsImportant(item.id)}>{item.isFavorite ? "Unmark" : "Mark"} important</button >

                    {!item.isFavorite && <button className="archive-btn" onClick={() => moveToArchive(item)}>Archive note</button >}

                    <span className="creation-date">Date submitted: {item.date} {item.edited !== null && `(Edited: ${item.edited})`}</span>

                    <span className="item-text">{item.text.match(URL_REGEX) ? convertToLink(item.text) : item.text}</span>
                </li>
            )
        );
    }

    return (
        <AppContext.Provider value={contextValues()}>
        <>
            {!isSearching && <RenderLayout />}

            {isSearching ? <SearchInList /> : <DisplayList />}
        </>
        </AppContext.Provider>
    )
}

export default App