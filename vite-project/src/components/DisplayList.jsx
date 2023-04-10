import React, {useState} from "react";
import Delete from "./interactions/deleteButton.jsx";

const DisplayList = (
    {
        toDoList,
        setToDoList,
        checkToDoListLength,
        returnStateObject,
        archivedList,
        setShowArchived,
        showArchived,
        ifSearching
    }) => {

    const [showImportantOnly, setShowImportantOnly] = useState(false);
    const LIST_EMPTY = "Your list is currently empty. Try to add something.";
    const filterIsFavorite = toDoList.filter((item) => item.isFavorite || item.isArchived);

    const deleteAllItems = () => {
        //show delete all only if array length is >1        delete all notes except for ones that are not marked as favorite
        return ( checkToDoListLength(1) && <Delete onClick={() => setToDoList(filterIsFavorite)} name={"Delete all"} /> )
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

    const handleShowArchived = () => {
        archivedList.length > 0 && setShowArchived(!showArchived)
    }

    const showButtons = () => {
        // show buttons only if list length > 0
        if (checkToDoListLength()){
            return (
                <>
                    {deleteAllItems()}
                    <button className="search-button" onClick={ifSearching}>Search for note</button>

                    <button className="search-button" onClick={() => setShowImportantOnly(prevState => !prevState)}>
                        {!showImportantOnly ? "Highlight" : "Hide"} important notes
                    </button>

                    <button className="archive-notes-btn" onClick={handleShowArchived}>
                        Archived notes {archivedList.length > 0 && `(${archivedList.length})`}
                    </button>
                </>
            )
        }
    }

    return (
        <ul className="ul-list">
            {showButtons()}
            {highlightImportantNotes()}
            {!checkToDoListLength() ? <div className="empty-list-txt">{LIST_EMPTY}</div> : returnStateObject(toDoList)}
        </ul>
    )
}

export default DisplayList;