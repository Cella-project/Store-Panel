import React from "react";

import { useDispatch, useSelector } from 'react-redux';
import { stickyMutations } from '../../redux/mutations';

import style from './StickyNote.module.scss';

const StickyNote = ({ note }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);

    const removeNoteHandler = () => {
        dispatch(stickyMutations.popNote(note.id));
    }

    if (note.type !== 'alert') {
        setTimeout(() => {
            removeNoteHandler();
        }, 3000);
    }

    return (
        <div onClick={removeNoteHandler} className={`${style['note']} ${style[`note--${mode === 'dark-mode' ? `${note.type}--dark` : note.type}`]} flex-row-between radius-10px pointer shadow-5px`}>
            <p className="inter">{note.msg}</p>
            {note.type === 'success' && <i className={`bi bi-patch-check ${style['note--icon']} ${style[`note--icon--success${mode === 'dark-mode' ? '--dark' : ''}`]}`}></i>}
            {note.type === 'info' && <i className={`bi bi-patch-exclamation ${style['note--icon']} ${style[`note--icon--info${mode === 'dark-mode' ? '--dark' : ''}`]}`}></i>}
            {note.type === 'alert' && <i className={`bi bi-x-octagon ${style['note--icon']} ${style[`note--icon--alert${mode === 'dark-mode' ? '--dark' : ''}`]}`}></i>}
            {note.type === 'notification' && <i className={`bi bi-bell ${style['note--icon']} ${style[`note--icon--notification${mode === 'dark-mode' ? '--dark' : ''}`]}`}></i>}
        </div>
    );
};

export default StickyNote;