import React, { useRef, useEffect, useState } from 'react';
import Timer from '../UI/Timer';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';
import { popupMutation } from '../../redux/mutations';
import languages from '../global/languages';
import './VerifyOTP.scss';

const VerifyOTP = ({ popupToggle }) => {
    const [value, setValue] = useState('');
    const userData = useSelector((state) => state.auth.userData);
    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const codeRef = useRef('');
    const dispatch = useDispatch();
    const handleCodeChange = (event) => {
        codeRef.current = event;
        setValue(event);
    };

    useEffect(() => {
        document.title = 'Verify Email • Admin Panel';
        // Set the timer for 5 minutes
        const timer = setTimeout(() => {
            popupToggle(false);
            dispatch(popupMutation.popFeedBack({
                type: 'info',
                msg: 'Your verification code has expired. Please request a new one.',
            }))
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    });

    const handlePopupToggle = () => {
        popupToggle(false);
        document.getElementById("dashboard-view").style.zIndex = 10;
        window.onscroll = function () { };
    }

    const handleVerifyOTP = (event) => {
        if (event) {
            event.preventDefault();
        }

        const formData = {
            _id: userData._id,
            otp: codeRef.current,
        };

        dispatch(authActions.validateOTP(formData, handlePopupToggle));
    };

    useEffect(() => {
        if (codeRef.current.length === 6) {
            handleVerifyOTP();
        }
    });

    return (
        <form noValidate onSubmit={handleVerifyOTP} className="verifyOTP flex-col-center radius-5px full-width">
            <Timer className={'gold margin-12px-V'} sec={5 * 60} />
            <div className="verifyOTP--info full-width flex-col-left-start gray-bg radius-5px">
                <p className={`space-none inter ${mode === 'dark-mode' ? 'white' : 'gray'} margin-4px-V size-12px`}>
                    {translate.aRestCodeHasBeenSentToYourEmailPleaseEnterItBelow}
                </p>
            </div>
            <div className="verifyOTP--slot full-width flex-col-left-start margin-12px-V">
                <p
                    style={{ marginLeft: '0 5px 0 5px' }}
                    className="no-padding margin-6px-V size-16px inter gray"
                >
                    {translate.verifyCode}
                </p>
                <OtpInput
                    style={{ direction: 'ltr' }}
                    value={value}
                    onChange={handleCodeChange}
                    numInputs={6}
                    containerStyle='verifyOTP--slot--input full-width flex-row-between inter gray size-14px radius-10px'
                    inputStyle={{ width: '30px', height: '30px', borderRadius: '5px', border: '1px solid #ccc' }}
                    focusStyle={{ outline: '2px solid #70c8b0' }}
                    isInputNum={true}
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            <button
                type="submit"
                className={`verifyOTP--btn full-width mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}
            >
                {translate.verify}
            </button>
        </form>
    )
}

export default VerifyOTP;