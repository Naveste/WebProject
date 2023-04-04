import React, {useState} from "react";
import './App.css'
import Header from "./Header.jsx";
import Submit from "./components/interactions/submitButton.jsx";
import Delete from "./components/interactions/deleteButton.jsx";
import {formattedDate} from "./functions/formattedDate.jsx";
import InputArea from "./components/interactions/InputArea.jsx";

function App() {
    const [toDoList, setToDoList] = useState(() => JSON.parse(localStorage.getItem("listKey")) || []);
    const [archivedList, setArchivedList] = useState(() => JSON.parse(localStorage.getItem("archiveKey")) || []);

    const [input, setInput] = useState("");
    const [searchText, setSearchText] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [showImportantOnly, setShowImportantOnly] = useState(false);

    const filterIsFavorite = toDoList.filter((item) => item.isFavorite || item.isArchived);

    React.useEffect(() => {
        localStorage.setItem('listKey', JSON.stringify(toDoList));
    }, [toDoList]);

    React.useEffect(() => {
        localStorage.setItem('archiveKey', JSON.stringify(archivedList));
    }, [archivedList]);

    const handleInputChange = (event) => {
        event.preventDefault();
        setInput(event.target.value)
    }

    const addItem = () => {
        const newList = [...toDoList,
            {
                id: crypto.randomUUID(),
                text: input.trim(),
                isFavorite: false,
                isArchived: false,
                date: formattedDate()
            }];

        if (input.trim().length > 0) {
            setToDoList(newList);
        }
        // clear input after submission
        setInput("");
    }

    const addItemOnEnter = (event) => {
        return event.key === 'Enter' && addItem();
    }

    const deleteItem = (itemToDelete) => {
        setToDoList(toDoList.filter((item) => item !== itemToDelete));
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const checkToDoListLength = (len = 0) => {
        return toDoList.length > len
    }

    const deleteAllItems = () => {
        //show delete all only if array length is >1        delete all notes except for ones that are not marked as favorite
        return ( checkToDoListLength(1) && <Delete onClick={() => setToDoList(filterIsFavorite)} name={"Delete all"} /> )
    }

    const searchInList = () => {
        const filteredSearch = searchText.length > 0 ?
            toDoList.filter((item) => item.text.toLowerCase().includes(searchText.toLowerCase())) : [];

        return (
            <div className="search-list">
                <button className="exit-button" onClick={ifSearching}>Exit search</button>
                {checkToDoListLength() && <input className="search-field" value={searchText} onChange={handleSearchChange} placeholder="Search for note(s)..."/>}
                {searchText && <h1 className="results-title">Results:</h1>}
                <ul className="ul-list">
                    {returnStateObject(filteredSearch)}
                </ul>
            </div>
        )
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
                text: newText
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

        const handleIsArchived = (id) => {
            setToDoList(toDoList.map(item => (
                item.id === id ? {
                    ...item,
                    isArchived: !item.isArchived
                } : item)
            ))
        }

        const deleteAndAddToArchived = (item) => {
            setArchivedList([...archivedList, item]);
            deleteItem(item)
        }

        return (
            object.slice(0).reverse().map((item) =>
                item.isArchived && !item.isFavorite ? deleteAndAddToArchived(item) :
                    <li key={item.id}>
                        {!item.isFavorite && <Delete onClick={() => deleteItem(item)} name={"Delete note"}/>}

                        <button className="edit-btn" onClick={() => {editNote(item.id, item.text)}}>Edit note</button >

                        <button className="delete-btn" onClick={() => handleIsImportant(item.id)}>{item.isFavorite ? "Unmark" : "Mark"} important</button >

                        {!item.isFavorite && <button className="archive-btn" onClick={() => handleIsArchived(item.id)}>Archive note</button >}

                        <span className="creation-date">Date submitted: {item.date}</span>

                        <span className="item-text">{item.text}</span>
                    </li>))
    }

    const highlightImportantNotes = () => {
        if (filterIsFavorite.length > 0){
            if (showImportantOnly) {
                return (
                    <>
                        <h1 className="important-notes">Important notes: </h1>
                        {returnStateObject(filterIsFavorite)}
                        <hr className="horizontal-line"/>
                    </>
                );
            } else {
                return null;
            }
        } else if (showImportantOnly){
            return <h1 className="important-notes">You haven't marked any notes as important.</h1>
        }
    }

    const displayList = () => {

        const deleteArchiveList = () => {
            if (archivedList.length > 0) {
                setArchivedList([]);
                console.log("clicked");
            }
        }

        const LIST_EMPTY = "Your list is currently empty. Try to add something.";
        return (
            <ul className="ul-list">
                {/* ↓ Delete button should show only if list exists */}
                {checkToDoListLength() && deleteAllItems()}
                {checkToDoListLength() && <button className="search-button" onClick={ifSearching}>Search for note</button>}
                {checkToDoListLength() && <button className="search-button" onClick={() => setShowImportantOnly(prevState => !prevState)}>
                    {!showImportantOnly ? "Highlight" : "Hide"} important notes</button>}
                {/* ↑ Search button should show only if list exists */}
                {/* ↓ Only show list if array length is > 0, otherwise print list doesn't exist string */}
                {checkToDoListLength() && <button className="archive-notes-btn" onClick={deleteArchiveList}>Delete archived notes {archivedList.length > 0 && `(${archivedList.length})`}</button>}
                {highlightImportantNotes()}
                {!checkToDoListLength() ? <div className="empty-list-txt">{LIST_EMPTY}</div> : returnStateObject(toDoList)}
            </ul>
        )
    }

    const renderLayout = () => {
        return (
            <>
                <Header />
                <div className="search-input-field">
                    <InputArea value={input} onKeyDown={addItemOnEnter} onChange={handleInputChange} />
                    <Submit onClick={addItem} />
                </div>
            </>
        )
    }

    return (
        <>
            {!isSearching && renderLayout()}
            {isSearching ? searchInList() : displayList()}
        </>
    )
}

export default App