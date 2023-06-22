import React, { useState } from 'react';
import useInput from '../../hooks/useInput';

import { useDispatch, useSelector } from 'react-redux';
import languages from '../global/languages';
import authActions from '../../apis/actions/auth';

const ChangeStoreInfo = () => {
    const [editMode, setEditMode] = useState(false);

    const userData = useSelector((state) => state.auth.userData);

    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const dispatch = useDispatch();

    const {
        value: enteredStoreName,
        isValid: enteredStoreNameIsValid,
        error: storeNameError,
        isTouched: storeNameIsTouched,
        valueChangeHandler: storeNameChangedHandler,
        inputBlurHandler: storeNameBlurHandler,
        reset: resetStoreNameInput,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterStoreName;
        } else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterStoreNameBetween3_50;
        }
        return { isValid, error };
    }, userData.storeName);

    const {
        value: enteredSlogan,
        isValid: enteredSloganIsValid,
        error: sloganError,
        isTouched: sloganIsTouched,
        valueChangeHandler: sloganChangedHandler,
        inputBlurHandler: sloganBlurHandler,
        reset: resetSloganInput,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterSlogan;
        } else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterSloganBetween3_50;
        }
        return { isValid, error };
    }, userData.slogan);

    const storeNameClasses = storeNameIsTouched && !enteredStoreNameIsValid
        ? 'form-control-invalid'
        : '';
    const sloganClasses = sloganIsTouched && !enteredSloganIsValid
        ? 'form-control-invalid'
        : '';


    const handleCancelForm = (event) => {
        event.preventDefault();
        resetStoreNameInput();
        resetSloganInput();
        setEditMode(false);
    };

    const handleSubmit = async (event) => {
        if (event) {
            event.preventDefault();
        }
        const updatedFields = {};

        if (enteredStoreName.trim() !== userData.storeName) {
            updatedFields.storeName = enteredStoreName.trim();
        }

        if (enteredSlogan.trim() !== userData.slogan) {
            updatedFields.slogan = enteredSlogan.trim();
        }

        dispatch(authActions.editProfile({
            _id: userData._id,
            ...updatedFields,
        }, () => setEditMode(false)))

    };


    return (
        <form onSubmit={handleSubmit} noValidate className={`profile--info full-width white-bg shadow-5px flex-col-center margin-12px-V`}>
            <div className={`full-width flex-row-between pt-sans ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-28px font-bold`}>
                {translate.storeInfo}
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
                <div className='full-width flex-col-left-start profile--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='store-name'>{translate.storeName}:</label>
                    <div className={`profile--input--container ${editMode && 'focus'} full-width shadow-2px flex-row-left-start radius-10px ${storeNameClasses}`}>
                        <i className='bi bi-shop-window size-20px' />
                        <input className='profile--input full-width margin-12px-H gray radius-10px'
                            type={'text'}
                            placeholder={translate.storeName}
                            id={'store-name'}
                            value={enteredStoreName}
                            onChange={storeNameChangedHandler}
                            onBlur={storeNameBlurHandler}
                        />
                    </div>
                    {storeNameIsTouched && (<div className="error-message">{storeNameError}</div>)}
                </div>
                <div className='full-width flex-col-left-start profile--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='slogan'>{translate.slogan}:</label>
                    <div className={`profile--input--container ${editMode && 'focus'} full-width shadow-2px flex-row-left-start radius-10px ${sloganClasses}`}>
                        <i className='bi bi-megaphone size-20px' />
                        <input className='profile--input full-width margin-8px-H gray radius-10px'
                            type={'text'}
                            placeholder={translate.writeSlogan}
                            id={'slogan'}
                            value={enteredSlogan}
                            onChange={sloganChangedHandler}
                            onBlur={sloganBlurHandler}
                        />
                    </div>
                    {sloganIsTouched && (<div className="error-message">{sloganError}</div>)}
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

export default ChangeStoreInfo;