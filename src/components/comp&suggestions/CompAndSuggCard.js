import React, { useState } from 'react';
import './CompAndSuggCard.scss';
import Canvas from '../common/Canvas';
import { useSelector } from 'react-redux';
import languages from '../global/languages';
const CompAndSuggCard = ({ visible, type, title, message, status }) => {
    const [compORSuggShown, setcompORSuggShown] = useState(visible);
    const [statusNew, setStatusOld] = useState(status);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    const toggleState = () => {
        setcompORSuggShown(!compORSuggShown);
        setStatusOld('');
    }

    return (
        <>
            <div className='comp-lists-card--info gray shadow-5px margin-10px-V inter radius-15px white-bg full-width flex-col-left-start'>
                <div className='flex-row-left-start2col full-width pointer' onClick={toggleState}>
                    <div className='width-15-100 margin-2px-V'>
                        <span className='margin-2px-H font-bold'>{translate.type}: </span>
                        <i className={`${type} mint-green size-30px`} />
                    </div>
                    <div className='width-35-100 margin-2px-V flex-row-left-start'>
                        <span className='margin-2px-H font-bold'>{translate.title}: </span>
                        <div className='comp-lists-card--img radius-circular'>
                            <Canvas name={title} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                        </div>
                        <div>
                            {title}
                        </div>
                    </div>
                    <div className='width-35-100 margin-2px-V'>
                        <span className='margin-2px-H font-bold'>{translate.message}: </span>
                        <div className='comp-lists-card--message font-bold' style={{ display: 'inline' }}>{message}</div>
                    </div>
                    <div className={`${statusNew === 'new' ? '' : 'comp-lists-card--status'} width-10-100 margin-2px-V font-bold`}>
                        <span className='margin-2px-H font-bold'>{translate.status}: </span>
                        <div className='mint-green' style={{ display: 'inline' }}>{statusNew}</div>
                    </div>
                    <div className='comp-lists-card--arrow margin-2px-V size-14px font-bold'>
                        <i className={`bi bi-chevron-${compORSuggShown ? 'up' : 'down'} gray`} />
                    </div>
                </div>
                {compORSuggShown && message === 'I have an idea' &&
                    <div className='full-width flex-col-left-start'>
                        <div className='text-shadow size-12px margin-8px-V' style={{ marginLeft: '40px' }}>
                            {translate.about}: The Design
                        </div>
                        <div className='comp-lists-card--content shadow-5px radius-15px size-14px font-bold'>
                            The Suggestion Statement.
                        </div>
                    </div>
                }
                {compORSuggShown && message === 'I have a problem' &&
                    <div className='full-width flex-col-left-start'>
                        <div className='text-shadow size-12px margin-8px-V' style={{ marginLeft: '40px' }}>
                            About: Ordering
                        </div>
                        <div className='comp-lists-card--content shadow-5px radius-15px size-14px font-bold'>
                            The Problem Statement.
                        </div>
                    </div>
                }
            </div>
        </>

    )
}

export default CompAndSuggCard;