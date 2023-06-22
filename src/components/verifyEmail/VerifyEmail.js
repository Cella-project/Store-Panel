import React from 'react';
import { useSelector } from 'react-redux';

import './VerifyEmail.scss';

const VerifyEmail = ({ popupToggle }) => {
    const userData = useSelector(state => state.auth.userData);
    const mode = useSelector(state => state.theme.mode);

    return (
        <div className='verify-email full-width flex-row-center yellow-bg shadow-2px'>
            <i className={`bi bi-exclamation-circle ${mode === 'dark-mode' ? 'white' : 'gray'} size-14px`} />
            <p className={`space-none inter flex-row-center ${mode === 'dark-mode' ? 'white' : 'gray'} margin-4px-H size-12px flex-wrap`}>
                Hello {userData.owner.name.split(' ')[0]}, Please verify your email by clicking
                <span style={{ textDecoration: 'underLine', color: 'blue' }} className='margin-4px-H pointer verify-email--link' onClick={popupToggle}>
                    this link.
                </span>
            </p>
        </div>
    )
}

export default VerifyEmail;