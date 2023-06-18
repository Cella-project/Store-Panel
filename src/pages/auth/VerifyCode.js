import React, { useEffect, useState, useRef } from "react";

import { NavLink } from 'react-router-dom';
import router from '../../router/router';

import { popupMutation } from '../../redux/mutations';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';

import Timer from '../../components/UI/Timer';
import OtpInput from 'react-otp-input';

import style from './VerifyCode.module.scss';
import languages from '../../components/global/languages';

const VerifyCode = () => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translations = languages[language];
    const email = useSelector(state => state.auth.forgetPasswordCycle.email);
    const [otp, setOtp] = useState('');
    const codeRef = useRef('');

    const handleChange = (event) => {
        codeRef.current = event;
        setOtp(event);
    }

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        dispatch(authActions.verifyOTP({
            email: email,
            otp: codeRef.current
        }));
    }

    useEffect(() => {
        if (codeRef.current.length === 6) {
            handleSubmit();
        }
    });


    useEffect(() => {
        document.title = 'Reset Password • Store Panel';

        const timeOut = setTimeout(() => {
            router.navigate('/auth/forget-password');
            dispatch(popupMutation.popFeedBack({
                type: 'info',
                msg: 'Your verification code has expired. Please request a new one.'
            }));
        }, 300 * 1000);

        return () => clearTimeout(timeOut);
    });

    return (
        <form onSubmit={handleSubmit} noValidate className={`${style['verify']} flex-col-center white-bg radius-5px shadow-2px`}>
            <Timer className={`gold margin-12px-V`} sec={300} />
            <div className={`${style['verify--info']} full-width flex-col-left-start off-gray-bg radius-5px`}>
                <p className="space-none inter gray margin-4px-V size-12px">{translations.resetCodeSent}</p>
            </div>
            <div className={`${style['verify--slot']} full-width flex-col-left-start margin-4px-V`}>
                <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.verifyCode}</p>
                <OtpInput
                    value={otp}
                    onChange={handleChange}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    numInputs={6}
                    containerStyle={`${style['verify--slot--container']} flex-row-between inter gray size-14px radius-10px`}
                    inputStyle={style['verify--slot--container--input']}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            <button type="submit" className={`${style['verify--btn']} full-width mint-green-bg white inter pointer radius-10px shadow-2px`}>{translations.verify}</button>
            <div className="full-width flex-row-left-start">
                <NavLink to={'/auth/forget-password'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-12px-H pointer`}>{translations.didNotReceiveCode}</NavLink>
            </div>
        </form>
    );
};

export default VerifyCode;