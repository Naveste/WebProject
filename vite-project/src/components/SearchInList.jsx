import React, {useContext} from "react";
import {AppContext} from "../functions/AppContext.jsx";

const SearchInList = () => {

    const {toDoList, searchText, setSearchText, ifSearching, returnStateObject} = useContext(AppContext);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const filteredSearch = searchText.length > 0 ?
        toDoList.filter((item) => item.text.toLowerCase().includes(searchText.toLowerCase())) : [];

    return (
        <div style={{marginTop: "5px"}} className="search-list">

            <button className="exit-button" onClick={ifSearching}>Exit search</button>

            <input className="search-field" value={searchText} onChange={handleSearchChange} placeholder="Search for note(s)..."/>

            {searchText && <h1 className="results-title">{filteredSearch.length === 0 ? "No results found" : `${filteredSearch.length} results found:`}</h1>}

            <ul className="ul-list">
                {returnStateObject(filteredSearch)}
            </ul>

        </div>
    )
}

export default SearchInList;