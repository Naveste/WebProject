import React from 'react';
import "./module.css"

const SideBar = ({archivedList, setArchivedList, toDoList, setToDoList}) => {
    const deleteItem = (itemToDelete) => {
        setArchivedList(archivedList.filter((item) => item !== itemToDelete));
    }
    const moveFromArchive = (item) => {
        setToDoList([...toDoList, {
            ...item,
            isArchived: !item.isArchived,
        },
        ]);

        deleteItem(item);
    }

    const confirmPrompt = (item) => {
        confirm("Are you sure you want to move the note to the list?") && moveFromArchive(item);
    }

    const deleteArchiveList = () => {
        if (archivedList.length > 0) {
            setArchivedList([]);
            console.log("clicked");
        }
    }

    return (
        <>
            <div className="archived-list">
                <button onDoubleClick={deleteArchiveList}>Delete all</button>
                {archivedList.map((item, index) =>
                    <ul key={index}>
                        <li>
                            <p><button onClick={() => confirmPrompt(item)}>Unarchive</button></p>
                            <p>{index + 1}</p>
                            <p>{item.text}</p>
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
};

export default SideBar;