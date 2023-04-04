import React from 'react';

function InputArea({value, onKeyDown, onChange}) {
    return (
        <textarea value={value} onKeyDown={onKeyDown} onChange={onChange} className="input-area " placeholder="Type something here..." />
    );
}

export default InputArea;