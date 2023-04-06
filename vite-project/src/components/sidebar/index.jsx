import React, {useState} from 'react';
import "./module.css"
import {formattedDate} from "../../functions/formattedDate.jsx";

const SideBar = ({archivedList, setArchivedList, toDoList, setToDoList}) => {
    const [toggle, setToggle] = useState(false);

    const handleIsArchived = (id) => {
        setArchivedList(archivedList.map(item => (
            item.id === id ? {
                ...item,
                isArchived: !item.isArchived,
                date: formattedDate()
            } : item)
        ))
    }

    const deleteItem = (itemToDelete) => {
        setArchivedList(archivedList.filter((item) => item !== itemToDelete));
    }
    const moveFromArchive = (item) => {
        setToDoList([...toDoList, item]);
        deleteItem(item)
    }

    return (
        <>
            {archivedList.length > 0 &&
                <div className="archived-list">
                    <button className="toggle-btn" onClick={() => setToggle(!toggle)}>Toggle</button>
                    {toggle && archivedList.map(item =>
                        !item.isArchived ? <button key={item.id} onClick={() => moveFromArchive(item)}>Move to list</button> :
                        <ul key={item.id}>
                            <li>
                                {item.text} <button onDoubleClick={() => handleIsArchived(item.id)}>Unarchive</button>
                            </li>
                        </ul>
                    )}
                </div>}
        </>
    );
};

export default SideBar;