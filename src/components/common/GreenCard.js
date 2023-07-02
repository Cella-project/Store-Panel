import React from "react";
import { useSelector } from "react-redux";

import './GreenCard.scss';

const GreenCard = ({ title, children, icon, iconClickHandle }, props) => {
    const mode = useSelector(state => state.theme.mode);

    return (
        <div className="mint-green-card radius-15px shadow-5px">
            <div className={`mint-green-card--header flex-row-${icon ? 'between' : 'center'} mint-green-bg`}>
                <p className={`inter ${mode === 'dark-mode' ? 'gray' : 'white'} size-16px space-none text-shadow`}>{title}</p>
                {icon &&
                    <i className={`${icon} mint-green-card--header--icon pointer ${mode === 'dark-mode' ? 'gray' : 'white'} size-18px`} onClick={iconClickHandle} />
                }
            </div>
            <div className={`mint-green-card--body ${mode === 'dark-mode' ? 'dark' : ''} full-width white-bg`}>
                {children}
            </div>
        </div>
    );
};

export default GreenCard;