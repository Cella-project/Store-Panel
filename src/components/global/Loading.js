import React from 'react';
import { useSelector } from 'react-redux';
import languages from './languages';
import './Loading.scss';

const Loading = () => {
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translations = languages[language];
    return (
        <div className="full-width loading-container">
            <div className={`loading-animation ${mode === 'dark-mode' ? 'dark' : ''}`}></div>
            <h2 className='gray'>{translations.loading}</h2>
        </div>
    );
};

export default Loading;