import React, {useContext} from "react";
import Delete from "./interactions/deleteButton.jsx";
import {AppContext} from "../functions/AppContext.jsx";

const DisplayList = () => {

    const {toDoList, setToDoList, returnStateObject, archivedList,
        setShowArchived, showArchived, ifSearching, showImportantOnly, setShowImportantOnly} = useContext(AppContext);


    const LIST_EMPTY = "Your list is currently empty. Try to add something.";
    const filterIsFavorite = toDoList.filter((item) => item.isFavorite || item.isArchived);

    const checkToDoListLength = (len = 0) => {
        return toDoList.length > len
    }

    const deleteAllItems = () => {

        const conditions = () => {
            setToDoList(filterIsFavorite);

            if (showImportantOnly && filterIsFavorite.length === 0){
                setShowImportantOnly(false);
            }
        }

        //show delete all only if array length is >1        delete all notes except for ones that are not marked as favorite
        return (
            checkToDoListLength(1) && <Delete onClick={conditions} name={"Delete all"} />
        )
    }

    const highlightImportantNotes = () => {
        if (filterIsFavorite.length > 0){
            if (showImportantOnly) {
                return (
                    <>
                        <h1 className="important-notes">Important notes: </h1>
                        {returnStateObject(filterIsFavorite)}
                    </>
                );
            } else {
                return null;
            }
        } else {
            return <h1 className="important-notes">You haven't marked any notes as important.</h1>
        }
    }

    const handleShowArchived = () => {
        archivedList.length > 0 && setShowArchived(!showArchived)
    }

    const showButtons = () => {
        const archivedListLength = archivedList.length > 0;
        // show buttons only if list length > 0
        if (checkToDoListLength()){
            return (
                <>
                    {deleteAllItems()}
                    <button className="search-button" onClick={ifSearching}>Search for note</button>

                    <button className="search-button" onClick={() => setShowImportantOnly(prevState => !prevState)}>
                        {!showImportantOnly ? "Show" : "Hide"} important notes {!showImportantOnly && "only"}
                    </button>

                    {archivedListLength && <button className="archive-notes-btn" onClick={handleShowArchived}>
                        Archived notes {archivedListLength && `(${archivedList.length})`}
                    </button>}
                </>
            )
        }
    }

    return (
        <ul className="ul-list">
            {showButtons()}
            {!checkToDoListLength() ? <div className="empty-list-txt">{LIST_EMPTY}</div> : showImportantOnly ? highlightImportantNotes() : returnStateObject(toDoList)}
        </ul>
    )
}

export default DisplayList;