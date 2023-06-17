import React from "react";
import { useSelector } from "react-redux";

import './GreenCard.scss';

const GreenCard = ({ title, children, icon, iconClickHandle }, props) => {
    const mode = useSelector(state => state.theme.mode);

    return (
        <div key={props.key} className="orange-card radius-15px shadow-5px">
            <div className={`orange-card--header flex-row-${icon ? 'between' : 'center'} orange-bg`}>
                <p className={`inter ${mode === 'dark-mode' ? 'gray' : 'white'} size-16px space-none text-shadow`}>{title}</p>
                {icon &&
                    <i className={`${icon} orange-card--header--icon pointer ${mode === 'dark-mode' ? 'gray' : 'white'} size-18px`} onClick={iconClickHandle} />
                }
            </div>
            <div className={`orange-card--body ${mode === 'dark-mode' ? 'dark' : ''} full-width white-bg`}>
                {children}
            </div>
        </div>
    );
};

export default GreenCard;