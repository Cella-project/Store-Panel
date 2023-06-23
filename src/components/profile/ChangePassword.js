import React, { useState } from 'react';
import useInput from '../../hooks/useInput';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';
import languages from '../global/languages';
const ChangePassword = () => {
    const [editPass, setEditPass] = useState(false);
    const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);
    const [newPasswordChanged, setNewPasswordChanged] = useState(false);
    const [currentPasswordChanged, setCurrentPasswordChanged] = useState(false);

    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    const userData = useSelector((state) => state.auth.userData);

    const {
        value: currentPassword,
        isValid: currentPasswordIsValid,
        error: currentPasswordError,
        isTouched: currentPasswordIsTouched,
        valueChangeHandler: currentPasswordChangedHandler,
        inputBlurHandler: currentPasswordBlurHandler,
        reset: resetCurrentPassword,
    } = useInput((value) => {
        let error = "";
        if (value === "") {
            error = translate.passwordRequired;
        }
        if (value.length < 8) {
            error = translate.passwordLength;
        }
        if (value === enteredPassword) {
            error = translate.passwordMatch;
        }
        return { isValid: !error, error };
    });

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        error: passwordError,
        isTouched: passwordIsTouched,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPassword,
    } = useInput((value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&./_=+^])[A-Za-z\d@$!%*#?&./_=+^]{8,}$/;
        const test = regex.test(value);
        let error = '';
        if (value.trim() === '') {
            error = translate.passwordCurrent;
        } else if (!test) {
            error = translate.passwordCurrentMatch;
        } else if (value.length < 8) {
            error = translate.passwordLength;
        } else if (value === currentPassword) {
            error = translate.passwordCannotMatch;
        }
        return { isValid: !error, error };
    });

    const {
        value: confirmedPassword,
        isValid: confirmedPasswordIsValid,
        error: confirmedPasswordError,
        isTouched: confirmedPasswordIsTouched,
        valueChangeHandler: confirmedPasswordChangedHandler,
        inputBlurHandler: confirmedPasswordBlurHandler,
        reset: resetConfirmedPassword,
    } = useInput((value) => {
        let error = "";
        if (value !== enteredPassword) {
            error = translate.passwordDoNotMatch;
        }
        return { isValid: !error, error };
    });

    const currentPasswordClasses =
        currentPasswordIsTouched && !currentPasswordIsValid
            ? "form-control-invalid"
            : "";
    const passwordClasses =
        (passwordIsTouched && !enteredPasswordIsValid) ||
            (currentPasswordChanged && currentPassword === enteredPassword)
            ? "form-control-invalid"
            : "";
    const confirmedPasswordClasses =
        (confirmedPasswordIsTouched && !confirmedPasswordIsValid) ||
            (newPasswordChanged && confirmedPassword !== enteredPassword)
            ? "form-control-invalid"
            : "";

    let formIsValid = false;
    if (!currentPasswordIsValid || !enteredPasswordIsValid || !confirmedPasswordIsValid || confirmedPassword !== enteredPassword) {
        formIsValid = true;

    }

    const handleCancelForm = () => {
        setEditPass(false);
        resetConfirmedPassword();
        resetCurrentPassword();
        resetPassword();
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        if (formIsValid) {
            return;
        }

        dispatch(authActions.changePassword({
            _id: userData._id,
            currentPassword: currentPassword,
            newPassword: confirmedPassword
        }, () => {
            setEditPass(false);
            resetPassword();
            resetConfirmedPassword();
            resetCurrentPassword();
        }, translate.yourPasswordChangedSuccessfully, translate.someThingWentWrongPleaseTry))
    };

    return (
        <div className='full-width'>
            {!editPass && <input type='button' className={`profile--input--container ${editPass && 'none'} full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg size-20px pointer`}
                onClick={() => {
                    setEditPass(true)
                }}
                value={translate.changePassword} />
            }
            {editPass &&
                <form noValidate className={`profile--info ${!editPass && 'none'} full-width white-bg shadow-5px flex-col-center margin-12px-V`}
                    onSubmit={handleSubmit}>
                    <div className={`full-width flex-row-between pt-sans ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-28px font-bold`}>
                        {translate.changePassword}
                        <button className={`profile--input--container shadow-2px ${mode === 'dark-mode' ? 'gray' : 'white'} radius-10px mint-green-bg size-20px pointer`}
                            type="button"
                            onClick={handleCancelForm}>
                            {translate.cancel}
                        </button>
                    </div>
                    <div className='width-70-100 flex-col-left-start inter gray margin-12px-V'>
                        <div className='full-width flex-col-left-start'>
                            <div className='full-width flex-row-left-start margin-12px-V size-18px'>
                                <label className="font-bold size-20px pt-sans margin-12px-H" htmlFor="current" >{translate.current}:</label>
                                <div className={`profile--input--container focus full-width shadow-2px flex-row-left-start radius-10px ${currentPasswordClasses}`}>
                                    <i className="bi bi-key gray size-18px" />
                                    <input
                                        className="profile--input full-width margin-8px-H gray radius-10px"
                                        type={currentPasswordShown ? "text" : "password"}
                                        placeholder={translate.currentPassword}
                                        value={currentPassword}
                                        onChange={currentPasswordChangedHandler}
                                        onBlur={currentPasswordBlurHandler}
                                        autoFocus
                                        autoComplete='off'
                                    />
                                    <i className={`bi bi-eye${!currentPasswordShown ? "-slash" : ""} size-20px pointer`} onClick={() => setCurrentPasswordShown(!currentPasswordShown)} />
                                </div>
                            </div>
                            <p style={{ marginLeft: '0 5px 0 5px', visibility: currentPasswordError && currentPasswordIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                                <i className="bi bi-exclamation-triangle-fill red"></i> {currentPasswordError}
                            </p>
                        </div>
                        <div className='full-width flex-col-left-start'>
                            <div className='full-width flex-row-left-start margin-12px-V size-18px'>
                                <label className="font-bold size-20px pt-sans margin-12px-H" htmlFor="newPass" >{translate.new}:</label>
                                <div className={`profile--input--container focus full-width shadow-2px flex-row-left-start radius-10px ${passwordClasses}`}>
                                    <i className="bi bi-key gray size-18px" />
                                    <input
                                        className="profile--input full-width margin-8px-H gray radius-10px"
                                        type={passwordShown ? "text" : "password"}
                                        placeholder={translate.newPassword}
                                        value={enteredPassword}
                                        onChange={(event) => {
                                            passwordChangedHandler(event);
                                            setCurrentPasswordChanged(true);
                                        }}
                                        onBlur={passwordBlurHandler}
                                        autoComplete='off'
                                    />
                                    <i className={`bi bi-eye${!passwordShown ? "-slash" : ""} size-20px pointer`} onClick={() => setPasswordShown(!passwordShown)} />
                                </div>
                            </div>
                        </div>
                        <p style={{ marginLeft: '0 5px 0 5px', visibility: passwordError && passwordIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                            <i className="bi bi-exclamation-triangle-fill red"></i> {passwordError}
                        </p>
                        <div className='full-width flex-col-left-start'>
                            <div className='full-width flex-row-left-start margin-12px-V size-18px'>
                                <label className="font-bold size-20px pt-sans margin-12px-H" htmlFor="confirmNew" >{translate.confirm}:</label>
                                <div className={`profile--input--container focus full-width shadow-2px flex-row-left-start radius-10px ${confirmedPasswordClasses}`}>
                                    <i className="bi bi-key gray size-18px" />
                                    <input
                                        className="profile--input full-width margin-8px-H gray radius-10px"
                                        placeholder={translate.confirmNewPassword}
                                        type={confirmedPasswordShown ? "text" : "password"}
                                        value={confirmedPassword}
                                        onChange={(event) => {
                                            confirmedPasswordChangedHandler(event);
                                            setNewPasswordChanged(true);
                                        }}
                                        onBlur={confirmedPasswordBlurHandler}
                                        autoComplete='off'
                                    />
                                    <i className={`bi bi-eye${!confirmedPasswordShown ? "-slash" : ""} size-20px pointer`} onClick={() => setConfirmedPasswordShown(!confirmedPasswordShown)} />
                                </div>
                            </div>
                        </div>
                        <p style={{ marginLeft: '0 5px 0 5px', visibility: confirmedPasswordError && confirmedPasswordIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                            <i className="bi bi-exclamation-triangle-fill red"></i> {confirmedPasswordError}
                        </p>
                    </div>
                    <button disabled={formIsValid} className={`profile--input--container shadow-2px ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px width-50-100 mint-green-bg size-20px pointer`}
                        type='submit'
                    >
                        {translate.save}
                    </button>
                </form>
            }
        </div>
    )
}

export default ChangePassword;