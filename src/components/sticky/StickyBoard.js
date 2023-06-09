import React from "react";

import { useSelector } from 'react-redux';

import StickyNote from './StickyNote';

import style from './StickyBoard.module.scss';

const StickyBoard = () => {
    const notes = useSelector(state => state.sticky.notes);

    return (
        <div className={`${style['board']} flex-col-left-start`}>
            {notes.map(note => {
                return (<StickyNote key={note.id} note={note} />);
            })}
        </div>
    );
};

export default StickyBoard;