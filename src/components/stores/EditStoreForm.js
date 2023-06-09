import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { specialityActions, storeActions } from '../../apis/actions';
import { specialityMutations } from '../../redux/mutations';
import PhoneInput from 'react-phone-number-input';
import useInput from '../../hooks/useInput';
import Select from 'react-select';

import './EditStoreForm.scss'

const EditStoreForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const storeData = useSelector((state) => state.store.storeData);
    const specialities = useSelector((state) => state.speciality.specialties);
    const specialtyRef = useRef({
        id: storeData.speciality._id,
        title: storeData.speciality.title,
    });

    const [photoFile, setPhotoFile] = useState(storeData.logo);
    const [storeIMG, setStoreIMG] = useState(storeData.logo);

    const mode = useSelector(state => state.theme.mode);

    useEffect(() => {
        dispatch(specialityMutations.setSpecialties(null));
        dispatch(specialityActions.getSpecialties());
    }, [dispatch]);

    const {
        value: enteredOwnerName,
        isValid: enteredOwnerNameIsValid,
        error: ownerNameError,
        isTouched: ownerNameIsTouched,
        valueChangeHandler: ownerNameChangedHandler,
        inputBlurHandler: ownerNameBlurHandler,
    } = useInput((value) => {
        const regex = /^[\p{L}\s]*$/u;
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a full name.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a full name between 3 and 50 characters.';
        }
        if (!regex.test(value.trim())) {
            error = 'Please enter only letters and spaces.';
        }
        return { isValid, error };
    }, storeData.owner.name);

    const {
        value: enteredOwnerEmail,
        isValid: enteredOwnerEmailIsValid,
        error: ownerEmailError,
        isTouched: ownerEmailIsTouched,
        valueChangeHandler: ownerEmailChangedHandler,
        inputBlurHandler: ownerEmailBlurHandler,
    } = useInput((value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(value);
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter an ownerEmail address.';
        } else if (!isValid) {
            error = 'Please enter a valid ownerEmail address.';
        }
        return { isValid, error };
    }, storeData.owner.email);

    const {
        value: enteredOwnerPhone,
        isValid: enteredOwnerPhoneIsValid,
        error: ownerPhoneError,
        isTouched: ownerPhoneIsTouched,
        valueChangeHandler: ownerPhoneChangedHandler,
        inputBlurHandler: ownerPhoneBlurHandler,
    } = useInput((value) => {
        let error = '';
        let isValid = true;
        if (!value) {
            error = 'Phone number is required';
            isValid = false;
        } else if (value.length < 13) {
            error = 'Please enter a valid phone number';
            isValid = false;
        }
        return { error, isValid };
    }, '+2' + storeData.owner.phoneNum);

    const {
        value: enteredStoreName,
        isValid: enteredStoreNameIsValid,
        error: storeNameError,
        isTouched: storeNameIsTouched,
        valueChangeHandler: storeNameChangedHandler,
        inputBlurHandler: storeNameBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a store name.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a store name between 3 and 50 characters.';
        }
        return { isValid, error };
    }, storeData.storeName);

    const {
        value: enteredSlogan,
        isValid: enteredSloganIsValid,
        error: sloganError,
        isTouched: sloganIsTouched,
        valueChangeHandler: sloganChangedHandler,
        inputBlurHandler: sloganBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = 'Please enter a slogan.';
        } else if (value.length < 3 || value.length > 50) {
            error = 'Please enter a slogan between 3 and 50 characters.';
        }
        return { isValid, error };
    }, storeData.slogan);

    const {
        value: enteredSpeciality,
        isValid: enteredSpecialityIsValid,
        error: specialityError,
        isTouched: specialityIsTouched,
        valueChangeHandler: specialityChangedHandler,
        inputBlurHandler: specialityBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please select a speciality.';
        }
        return { isValid, error };
    }, storeData.speciality.title);

    const ownerNameClasses = ownerNameIsTouched && !enteredOwnerNameIsValid
        ? 'form-control-invalid'
        : '';
    const ownerEmailClasses = ownerEmailIsTouched && !enteredOwnerEmailIsValid
        ? 'form-control-invalid'
        : '';
    const ownerPhoneClasses = ownerPhoneIsTouched && !enteredOwnerPhoneIsValid
        ? 'form-control-invalid'
        : '';
    const storeNameClasses = storeNameIsTouched && !enteredStoreNameIsValid
        ? 'form-control-invalid'
        : '';
    const sloganClasses = sloganIsTouched && !enteredSloganIsValid
        ? 'form-control-invalid'
        : '';
    const specialityClasses = specialityIsTouched && !enteredSpecialityIsValid
        ? 'form-control-invalid'
        : '';

    const formSubmissionHandler = async (event) => {
        event.preventDefault();

        const updatedData = {};

        if (enteredOwnerName.trim() !== storeData.owner.name) {
            updatedData.owner = {
                name: enteredOwnerName.trim()
            };
        }

        if (enteredOwnerEmail.trim() !== storeData.owner.email) {
            updatedData.owner = {
                email: enteredOwnerEmail.trim()
            };
        }

        if (enteredOwnerPhone && storeData.owner.phoneNum && enteredOwnerPhone.replace("+2", "") !== storeData.owner.phoneNum.replace("+20", "")) {
            updatedData.owner = {
                phoneNum: enteredOwnerPhone.replace("+2", "")
            }
        }

        if (enteredStoreName.trim() !== storeData.storeName) {
            updatedData.storeName = enteredStoreName.trim();
        }

        if (enteredSlogan.trim() !== storeData.slogan) {
            updatedData.slogan = enteredSlogan.trim();
        }

        if (storeIMG !== storeData.logo) {
            updatedData.logo = storeIMG;
        }

        if (specialtyRef.current.id !== storeData.speciality._id) {
            updatedData.speciality = {
                _id: specialtyRef.current.id,
                title: specialtyRef.current.title
            };
        }

        dispatch(storeActions.updateStore({
            ...updatedData, _id: storeData._id
        }, () => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
        }));
    };

    const uploadImg = async (e) => {
        setPhotoFile(URL.createObjectURL(e.target.files[0]))
        const data = new FormData();
        data.append('path', 'store/profile');
        data.append('file', e.target.files[0]);
        dispatch(storeActions.addStorePicture(data, (response) => {
            setStoreIMG('http://143.244.196.79:4012/api/file-manager/' + response.data.data);
        }))
    }

    const clearIMG = () => {
        setStoreIMG('No Image');
        setPhotoFile('No Image');
    }


    return (
        <form noValidate className='edit-store' onSubmit={formSubmissionHandler}>
            <div className='full-width flex-col-center edit-store--input-container'>
                <div className='full-width flex-col-left-start edit-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='ownerName'>Owner Name</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store--input ${ownerNameClasses}`}>
                        <i className='bi bi-person size-20px' />
                        <input
                            className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Owenr full name'}
                            id={'name'}
                            value={enteredOwnerName}
                            onChange={ownerNameChangedHandler}
                            onBlur={ownerNameBlurHandler}
                            autoFocus
                        />
                    </div>
                    {ownerNameIsTouched && (<div className="error-message">{ownerNameError}</div>)}
                </div>
                <div className='full-width flex-col-left-start edit-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='ownerEmail'>Owner Email</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store--input ${ownerEmailClasses}`}>
                        <i className='bi bi-envelope size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'email'}
                            placeholder={'Owner email'}
                            id={'ownerEmail'}
                            value={enteredOwnerEmail}
                            onChange={ownerEmailChangedHandler}
                            onBlur={ownerEmailBlurHandler}
                        />
                    </div>
                    {ownerEmailIsTouched && (<div className="error-message">{ownerEmailError}</div>)}
                </div>
                <div className='full-width flex-col-left-start edit-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='phone'>Phone Number</label>
                    <PhoneInput
                        className={`full-width gray radius-10px white-bg flex-row-left-start edit-store--input ${ownerPhoneClasses}`}
                        id={'phoneNum'}
                        value={enteredOwnerPhone}
                        countryCallingCodeEditable={false}
                        limitMaxLength
                        countrySelectProps={{ unicodeFlags: true }}
                        defaultCountry={'EG'}
                        onChange={(phone) =>
                            ownerPhoneChangedHandler({ target: { id: "phone", value: phone } })
                        }
                        onBlur={ownerPhoneBlurHandler}
                    />
                    {ownerPhoneIsTouched && (<div className="error-message">{ownerPhoneError}</div>)}
                </div>
                <div className="full-width flex-col-left-start edit-store--input-container">
                    <div className='edit-store--change-img full-width flex-col-top-start'>
                        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="photo">
                            Logo
                        </label>
                        <label className={`edit-store--change-img--tag full-width flex-row-center gray open-sans pointer ${photoFile !== 'No Image' ? 'hide' : ''}`} htmlFor='photo'>
                            <label className={`bi bi-image size-40px full-width flex-row-center white-bg pointer`} htmlFor="photo" />
                            <input
                                className="full-width gray margin-4px-H"
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={uploadImg}
                            />
                        </label>
                    </div>
                    <label className={`edit-store--img flex-col-center ${photoFile === 'No Image' ? 'hide' : ''} full-width pointer`} htmlFor='photo'>
                        <img src={photoFile} alt='' />
                    </label>
                    <button
                        type="button"
                        className={`add-admin--actions--button${photoFile === 'No Image' ? '-hide' : ''} margin-4px-V full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        onClick={clearIMG}
                    >
                        Clear
                    </button>
                </div>
                <div className='full-width flex-col-left-start edit-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='store-name'>Store Name</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store--input ${storeNameClasses}`}>
                        <i className='bi bi-shop-window size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Store name'}
                            id={'store-name'}
                            value={enteredStoreName}
                            onChange={storeNameChangedHandler}
                            onBlur={storeNameBlurHandler}
                        />
                    </div>
                    {storeNameIsTouched && (<div className="error-message">{storeNameError}</div>)}
                </div>
                <div className='full-width flex-col-left-start edit-store--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='slogan'>Slogan</label>
                    <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store--input ${sloganClasses}`}>
                        <i className='bi bi-megaphone size-20px' />
                        <input className='full-width gray margin-4px-H'
                            type={'text'}
                            placeholder={'Write your slogan'}
                            id={'slogan'}
                            value={enteredSlogan}
                            onChange={sloganChangedHandler}
                            onBlur={sloganBlurHandler}
                        />
                    </div>
                    {sloganIsTouched && (<div className="error-message">{sloganError}</div>)}
                </div>
                {specialities && specialities.length > 0 && (
                    <div className='full-width flex-col-left-start edit-store--input-container'>
                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='speciality'>Speciality</label>
                        <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-store--input ${specialityClasses}`}>
                            <i className='bi bi-pin-map size-20px' />
                            <Select
                                className={`edit-store--select full-width margin-4px-H`}
                                styles={{
                                    option: (provided, state) => ({
                                        ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit'
                                    }),
                                    menu: (provided) => ({
                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                    }),
                                }}
                                value={enteredSpeciality}
                                placeholder={enteredSpeciality}
                                options={specialities.filter(speciality => speciality.status === "Active").map(speciality => ({ label: speciality.title, value: { label: speciality.title, title: speciality.title, id: speciality._id } }))}
                                onChange={(speciality) => {
                                    specialtyRef.current = speciality.value;
                                    specialityChangedHandler({ target: { id: "speciality", label: speciality.title, value: speciality.value } })
                                }}
                                onBlur={specialityBlurHandler}
                            />
                        </div>
                        {specialityIsTouched && (<div className="error-message">{specialityError}</div>)}
                    </div>
                )}
                <div className="edit-store--actions flex-row-between full-width">
                    <button
                        className={`edit-store--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                        type="submit"
                    >
                        Confirm
                    </button>
                    <button
                        className="edit-store--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                        onClick={() => {
                            popupToggle(false);
                            document.getElementById('dashboard-view').style.zIndex = 10;
                            window.onscroll = function () { };
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditStoreForm;