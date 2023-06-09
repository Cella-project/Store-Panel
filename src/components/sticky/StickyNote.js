import React from "react";

import { useDispatch } from 'react-redux';
import { stickyMutations } from '../../redux/mutations';

import style from './StickyNote.module.scss';

const StickyNote = ({ note }) => {
    const dispatch = useDispatch();

    const removeNoteHandler = () => {
        dispatch(stickyMutations.popNote(note.id));
    }

    if (note.type !== 'alert') {
        setTimeout(() => {
            removeNoteHandler();
        }, 3000);
    }

    return (
        <div onClick={removeNoteHandler} className={`${style['note']} ${style[`note--${note.type}`]} flex-row-between radius-10px pointer shadow-5px`}>
            <p className="inter">{ note.msg }</p>
            {note.type === 'success' && <i className={`bi bi-patch-check ${style['note--icon']} ${style['note--icon--success']}`}></i>}
            {note.type === 'info' && <i className={`bi bi-patch-exclamation ${style['note--icon']} ${style['note--icon--info']}`}></i>}
            {note.type === 'alert' && <i className={`bi bi-x-octagon ${style['note--icon']} ${style['note--icon--alert']}`}></i>}
            {note.type === 'notification' && <i className={`bi bi-bell ${style['note--icon']} ${style['note--icon--notification']}`}></i>}
        </div>
    );
};

export default StickyNote;