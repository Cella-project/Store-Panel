import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import useInput from '../../hooks/useInput';

import { useDispatch, useSelector } from 'react-redux';
import languages from '../global/languages';
import authActions from '../../apis/actions/auth';

const ChangeOwnerInfo = () => {
    const [editMode, setEditMode] = useState(false);

    const userData = useSelector((state) => state.auth.userData);

    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const dispatch = useDispatch();

    const {
        value: enteredFullName,
        isValid: enteredFullNameIsValid,
        error: fullNameError,
        isTouched: fullNameIsTouched,
        valueChangeHandler: fullNameChangedHandler,
        inputBlurHandler: fullNameBlurHandler,
        reset: resetFullNameInput,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.trim().length >= 3 && value.trim().length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterFullName;
        } else if (value.trim().length < 3 || value.trim().length > 50) {
            error = translate.pleaseEnterFullNameBetween3_50;
        }
        return { isValid, error };
    }, userData.owner.name);
    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        error: emailError,
        isTouched: emailIsTouched,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,

    } = useInput((value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(value);
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterEmail;
        } else if (!isValid) {
            error = translate.pleaseEnterValidEmail;
        }
        return { isValid, error };
    }, userData.owner.email);
    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        error: phoneError,
        isTouched: phoneIsTouched,
        valueChangeHandler: phoneChangedHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhoneInput,
    } = useInput((value) => {
        let error = '';
        let isValid = true;
        if (!value) {
            error = translate.pleaseEnterPhoneNumber;
            isValid = false;
        } else if (value.length < 10) {
            error = translate.pleaseEnterValidPhoneNumber;
            isValid = false;
        }
        return { error, isValid };
    }, "+2" + userData.owner.phoneNum);

    const fullNameClasses = fullNameIsTouched && !enteredFullNameIsValid
        ? 'form-control-invalid'
        : '';

    const emailClasses = emailIsTouched && !enteredEmailIsValid
        ? 'form-control-invalid'
        : '';

    const phoneClasses = phoneIsTouched && !enteredPhoneIsValid
        ? 'form-control-invalid'
        : '';

    const handleCancelForm = (event) => {
        event.preventDefault();
        resetFullNameInput();
        resetEmailInput();
        resetPhoneInput();
        setEditMode(false);
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        const updatedFields = { owner: {} };

        if (enteredFullName.trim() !== userData.owner.name) {
            updatedFields.owner.name = enteredFullName.trim();
        }

        if (enteredEmail.trim() !== userData.owner.email) {
            updatedFields.owner.email = enteredEmail.trim();
        }

        if (enteredPhone && userData.owner.phoneNum && enteredPhone.replace("+2", "") !== userData.owner.phoneNum.replace("+20", "")) {
            updatedFields.owner.phoneNum = enteredPhone.replace("+2", "");
        }


        dispatch(authActions.editProfile({
            _id: userData._id,
            ...updatedFields,
        }, () => setEditMode(false)))

    };


    return (
        <form onSubmit={handleSubmit} noValidate className={`profile--info full-width white-bg shadow-5px flex-col-center margin-12px-V`}>
            <div className={`full-width flex-row-between pt-sans ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-28px font-bold`}>
                {translate.ownerInfo}
                {editMode ? (
                    <button className={`profile--input--container shadow-2px ${mode === 'dark-mode' ? 'gray' : 'white'} radius-10px mint-green-bg size-20px pointer`}
                        type="button"
                        onClick={handleCancelForm}
                    >
                        {translate.cancel}
                    </button>
                ) : (
                    <button className={`profile--input--container shadow-2px ${mode === 'dark-mode' ? 'gray' : 'white'} radius-10px mint-green-bg size-20px pointer`}
                        onClick={() => {
                            setEditMode(true)
                        }}>
                        {translate.edit}
                    </button>
                )}
            </div>
            <div className='width-80-100 flex-col-left-start inter gray margin-12px-V'>
                <div className='full-width flex-col-left-start'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="fullName">{translate.ownerName}:</label>
                    <div className={`profile--input--container ${editMode && 'focus'} full-width shadow-2px flex-row-left-start radius-10px ${fullNameClasses}`}>
                        <i className="bi bi-person gray size-18px " />
                        <input className='profile--input full-width margin-8px-H gray radius-10px'
                            type="text"
                            disabled={!editMode}
                            value={enteredFullName}
                            onChange={fullNameChangedHandler}
                            onBlur={fullNameBlurHandler}
                        />
                    </div>
                    {fullNameIsTouched && (
                        <div className="error-message">{fullNameError}</div>
                    )}
                </div>
                <div className='full-width flex-col-left-start'>
                    <div className='flex-row-between full-width'>
                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="email">{translate.ownerEmail}:</label>
                        <div className={`${userData.status==='Active'?'green':'red'} font-bold`}>
                            {userData.status}
                        </div>
                    </div>
                    <div className={`profile--input--container ${editMode && 'focus'} full-width shadow-2px flex-row-left-start radius-10px ${emailClasses}`}>
                        <i className="bi bi-envelope gray size-18px " />
                        <input className='profile--input full-width margin-8px-H gray radius-10px'
                            type="email"
                            id={'email'}
                            disabled={!editMode}
                            value={enteredEmail}
                            onChange={emailChangedHandler}
                            onBlur={emailBlurHandler}
                        />
                    </div>
                    {emailIsTouched && (
                        <div className="error-message">{emailError}</div>
                    )}
                </div>
                <div className='full-width flex-col-left-start'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="phone">{translate.ownerPhoneNumber}:</label>
                    <div className={`profile--input--container ${editMode && 'focus'} full-width shadow-2px flex-row-left-start radius-10px ${phoneClasses}`}>
                        <PhoneInput
                            id={'phone'}
                            className={`profile--input white-bg full-width radius-10px`}
                            international
                            countryCallingCodeEditable={false}
                            countrySelectProps={{ unicodeFlags: true }}
                            defaultCountry={"EG"}
                            disabled={!editMode}
                            limitMaxLength
                            value={enteredPhone}
                            onChange={(phone) =>
                                phoneChangedHandler({ target: { id: "phone", value: phone } })}
                            onBlur={phoneBlurHandler}
                        />
                    </div>
                    {phoneIsTouched && (
                        <div className="error-message">{phoneError}</div>
                    )}
                </div>
            </div>
            {editMode &&
                <button className={`profile--input--container shadow-2px width-50-100 ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg font-bold size-20px pointer`}
                    type='submit'
                >
                    {translate.save}
                </button>
            }
        </form>
    )
}

export default ChangeOwnerInfo;