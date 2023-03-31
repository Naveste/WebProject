import React from "react";
import './App.css'
import Header from "./Header.jsx";
import Submit from "./submitButton.jsx";
import Delete from "./deleteButton.jsx";
import {formattedDate} from "./Functions/formattedDate.jsx";

function App() {
    const [input, setInput] = React.useState("");
    const [toDoList, setToDoList] = React.useState(() => JSON.parse(localStorage.getItem("itemKey")) || []);
    const [searchText, setSearchText] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);
    const [showImportantOnly, setShowImportantOnly] = React.useState(false);
    const [editText, setEditText] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(false);
    const LIST_EMPTY = "Your list is currently empty. Try to add something.";
    const filterIsFavorite = toDoList.filter((item) => item.isFavorite);

    React.useEffect(() => {
        localStorage.setItem('itemKey', JSON.stringify(toDoList));
    }, [toDoList]);

    const handleInputChange = (event) => {
        event.preventDefault();
        setInput(event.target.value)
    }

    const submitText = () => {
        if (input.trim()) {
            setToDoList([...toDoList, {id: crypto.randomUUID(), text: input, isFavorite: false, date: formattedDate()}])
        }
        // clear input after submission
        setInput("")
    }

    const submitTextOnEnter = (event) => {
        return event.key === 'Enter' && submitText();
    }

    const deleteItem = (itemToDelete) => {
        setToDoList(toDoList.filter((list) => list !== itemToDelete));
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const checkListLength = () => {
        return toDoList.length > 0
    }

    const deleteAll = () => {
                //show delete all only if array length is >1        delete all notes except for ones that are not marked as favorite
        return ( toDoList.length > 1 && <Delete onClick={() => setToDoList(filterIsFavorite)} name={"Delete all"} /> )
    }

    const searchInList = () => {
        const filteredSearch = searchText.length > 0 ?
            toDoList.filter((item) => item.text.toLowerCase().includes(searchText.toLowerCase())) : [];

        return (
            <div className="search-list">
                <button className="exit-button" onClick={ifSearching}>Exit search</button>
                {checkListLength() && <input className="search-field" value={searchText} onChange={handleSearchChange} placeholder="Search for note(s)..."/>}
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

    const handleEdit = (id) => {
        setToDoList(toDoList.map(item => (
            item.id === id ? {
                ...item,
                text: editText
            } : item)
        ))
    }

    const ifSearching = () => {
        setIsSearching(prev => !prev)
        // reset the search input field after exiting search
        searchText.length && setSearchText("");
    }

    const returnStateObject = (object) => {
        return (
            object.slice(0).reverse().map((item) =>
                <li key={item.id}>
                    {!item.isFavorite && <Delete onClick={() => deleteItem(item)} name={"Delete note"}/>}
                    <button className="delete-btn" onClick={() => prompt(item.id, item.text)}>Edit note</button >
                    <button className="delete-btn" onClick={() => handleIsImportant(item.id)}>{item.isFavorite ? "Unmark" : "Mark"} important</button >
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
        return (
            <ul className="ul-list">
                {/* ↓ Delete button should show only if list exists */}
                {checkListLength() && deleteAll()}
                {checkListLength() && <button className="search-button" onClick={ifSearching}>Search for note</button>}
                {checkListLength() && <button className="search-button" onClick={() => setShowImportantOnly(prevState => !prevState)}>
                    {!showImportantOnly ? "Highlight" : "Hide"} important notes</button>}
                {/* ↑ Search button should show only if list exists */}
                {/* ↓ Only show list if array length is > 0, otherwise print list doesn't exist string */}
                {highlightImportantNotes()}
                {!checkListLength() ? <div className="empty-list-txt">{LIST_EMPTY}</div> : returnStateObject(toDoList)}
            </ul>
        )
    }

    const renderLayout = () => {
        return (
            <>
                <Header />
                <div className="main-content">
                    <input value={input} onKeyDown={submitTextOnEnter} onChange={handleInputChange} onInput={handleInputChange} className="input-area " placeholder="Type something here..."/>
                    <Submit onClick={submitText} />
                </div>
            </>
        )
    }

    return (
        <>
            <input value={toDoList.text} type="text" onChange={e => setEditText(e.target.value)} />
            {!isSearching && renderLayout()}
            <div>
                {isSearching ? searchInList() : displayList()}
            </div>
        </>
    )
}

export default App