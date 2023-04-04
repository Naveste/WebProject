import React from "react";

export default function Delete({onClick, name}){
    return (
        <button className="delete-btn" onClick={onClick}>{name}</button>
    )
}