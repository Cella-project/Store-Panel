import React from 'react';
import './ListsCard.scss';

const ListsCard = (props) => {
    return (
        <div key={Math.random().toString()} className={`lists-card ${props.width ? props.width : 'width-90-100'} margin-2px-V inter flex-col-left-start`}>
            {props.children}
        </div>
    )
}

export default ListsCard;