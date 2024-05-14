import React from 'react';
import Note from './Note';

function NoteList() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    return (
        <div className="row justify-content-center align-items-center">
            {notes.map((note, index) => (
                <Note key={index} index={index} note={note} />
            ))}
        </div>
    );
}

export default NoteList;
