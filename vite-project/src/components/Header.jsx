import React from "react";

export default function Header({title = "Note List"}){
    return (
        <h1 className="header-title">{title}</h1>
    )
}