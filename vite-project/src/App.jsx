import React, {Fragment} from "react";
import './App.css'
import Header from "./Header.jsx";
import Submit from "./submitButton.jsx";
import Delete from "./deleteButton.jsx";

function App() {
    const [input, setInput] = React.useState("");
    const [toDoList, setToDoList] = React.useState(() => JSON.parse(localStorage.getItem("itemKey")) || []);
    const [searchText, setSearchText] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);
    const LIST_EMPTY = "Your list is currently empty. Try to add something.";

    React.useEffect(() => {
        localStorage.setItem('itemKey', JSON.stringify(toDoList));
    }, [toDoList]);

    const checkChange = (event) => {
        event.preventDefault();
        setInput(event.target.value)
    }

    const submitText = () => {
        if (input.trim()) {
            setToDoList([...toDoList, {id: crypto.randomUUID(), text: input}])
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
        return ( <Delete onClick={() => setToDoList([])} name={"Delete all"} /> )
    }

    const filteredSearch = searchText.length > 0 ?
        toDoList.filter((item) => item.text.toLowerCase().includes(searchText.toLowerCase())) : [];

    const searchInList = () => {
        return (
            <div className="search-list">
                <button className="exit-button" onClick={ifSearching}>Exit search</button>
                {checkListLength() && <input className="search-field" value={searchText} onChange={handleSearchChange} placeholder="Search for note(s)..."/>}
                <ul className="ul-list">
                    {filteredSearch.map
                    (
                        (item) => <li key={item.id}> <Delete onClick={() => deleteItem(item)} name={"Delete note"}/>
                            <span className="item-text">{item.text}</span></li>
                    )}
                </ul>
            </div>
        )
    }

    const ifSearching = () => {
        setIsSearching(prev => !prev)
        searchText.length && setSearchText("");
    }

    const displayList = () => {
        return (
            <ul className="ul-list">
                {/* ↓ Delete button should show only if list exists */}
                {checkListLength() && deleteAll()}
                {checkListLength() && <button className="search-button" onClick={ifSearching}>Search for note</button>}
                {/* ↑ Search button should show only if list exists */}
                {/* ↓ Only show list if array length is > 0, otherwise print list doesn't exist string */}
                {!checkListLength() ? <div className="empty-list-txt">{LIST_EMPTY}</div> : toDoList.map
                (
                    (item) => <li key={item.id}> <Delete onClick={() => deleteItem(item)} name={"Delete note"}/>
                        <button className="delete-btn" onClick={() => alert("test")}>Edit note</button >
                        <span className="item-text">{item.text}</span></li>
                )}
            </ul>
        )
    }

    const renderLayout = () => {
        return (
            <>
                <Header title="SOMETHING"/>
                <div className="main-content">
                    <input value={input} onKeyDown={submitTextOnEnter} onChange={checkChange} onInput={checkChange} className="input-area " placeholder="Type something here..."/>
                    <Submit onClick={submitText} />
                </div>
            </>
        )
    }

    return (
        <>
            {!isSearching && renderLayout()}
            <div>
                {isSearching ? searchInList() : displayList()}
            </div>
        </>
    )
}

export default App