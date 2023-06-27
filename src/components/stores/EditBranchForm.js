import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import PhoneInput from 'react-phone-number-input';
import { RegionDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';
import useInput from '../../hooks/useInput';
import 'react-phone-number-input/style.css';
import './EditBranchForm.scss';
import "leaflet/dist/leaflet.css";
import languages from '../global/languages';

const EditBranchForm = ({ popupToggle, data }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const [lat, setLat] = useState(data.coordinates.lat);
    const [long, setLong] = useState(data.coordinates.lng);
    const [position, setPosition] = useState([lat, long]);
    const customIcon = new Icon(
        {
            iconUrl: require('../../assets/images/map.png'),
            iconSize: [25, 40],
        }
    )
    const {
        value: addressType,
        isValid: addressTypeIsValid,
        error: addressTypeError,
        isTouched: addressTypeIsTouched,
        valueChangeHandler: addressTypeChangedHandler,
        inputBlurHandler: addressTypeBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterAddressType;
        } else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterAddressTypeBetween3_50;
        }
        return { isValid, error };
    }, data.addressType);

    const {
        value: addressTitle,
        isValid: addressTitleIsValid,
        error: addressTitleError,
        isTouched: addressTitleIsTouched,
        valueChangeHandler: addressTitleChangedHandler,
        inputBlurHandler: addressTitleBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterAddressTitle;
        } else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterAddressTitleBetween3_50;
        }
        return { isValid, error };
    }, data.addressTitle);

    const {
        value: city,
        isValid: cityIsValid,
        error: cityError,
        isTouched: cityIsTouched,
        valueChangeHandler: handleCityChange,
        inputBlurHandler: handleCityBlur,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = translate.pleaseEnterCity;
        }
        return { isValid, error };
    }, data.city);

    const {
        value: district,
        isValid: districtIsValid,
        error: districtError,
        isTouched: districtIsTouched,
        valueChangeHandler: handleDistrictChange,
        inputBlurHandler: handleDistrictBlur,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterDistrict;
        } else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterDistrictBetween3_50;
        }
        return { isValid, error };
    }, data.district);

    const {
        value: street,
        isValid: streetIsValid,
        error: streetError,
        isTouched: streetIsTouched,
        valueChangeHandler: handleStreetChange,
        inputBlurHandler: handleStreetBlur,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 3 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterStreet;
        } else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterStreetBetween3_50;
        }
        return { isValid, error };
    }, data.street);

    const {
        value: building,
        isValid: buildingIsValid,
        error: buildingError,
        isTouched: buildingIsTouched,
        valueChangeHandler: handleBuildingChange,
        inputBlurHandler: handleBuildingBlur,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 1 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterBuilding;
        } else if (value.length < 1 || value.length > 50) {
            error = translate.pleaseEnterBuildingBetween1_50;
        }
        return { isValid, error };
    }, data.building);

    const {
        value: floor,
        isValid: floorIsValid,
        error: floorError,
        isTouched: floorIsTouched,
        valueChangeHandler: handleFloorChange,
        inputBlurHandler: handleFloorBlur,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 1 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterFloor;
        } else if (value.length < 1 || value.length > 50) {
            error = translate.pleaseEnterFloorBetween1_50;
        }
        return { isValid, error };
    }, data.floor);

    const {
        value: flat,
        isValid: flatIsValid,
        error: flatError,
        isTouched: flatIsTouched,
        valueChangeHandler: handleFlatChange,
        inputBlurHandler: handleFlatBlur,
    } = useInput((value) => {
        const isValid = value.trim() !== '' && value.length >= 1 && value.length <= 50;
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterFlat;
        } else if (value.length < 1 || value.length > 50) {
            error = translate.pleaseEnterFlatBetween1_50;
        }
        return { isValid, error };
    }, data.flat);
    
    const {
        value: landmark,
        error: landmarkError,
        isTouched: landmarkIsTouched,
        valueChangeHandler: handleLandmarkChange,
        inputBlurHandler: handleLandmarkBlur,
    } = useInput((value) => {
        let error = '';
        let isValid = true;
        if (value.length < 3) {
            error = translate.pleaseEnterLandmark;
            isValid = false;
        } else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterLandmarkBetween3_50;
        }
        return { error, isValid };
    }, data.landmark);
    const {
        value: primaryPhone,
        isValid: primaryPhoneIsValid,
        error: primaryPhoneError,
        isTouched: primaryPhoneIsTouched,
        valueChangeHandler: primaryPhoneChangedHandler,
        inputBlurHandler: primaryPhoneBlurHandler,
    } = useInput((value) => {
        let error = '';
        let isValid = true;
        if (!value) {
            error = translate.pleaseEnterPhoneNumber;
            isValid = false;
        } else if (value.length < 13) {
            error = translate.pleaseEnterValidPhoneNumber;
            isValid = false;
        }
        return { error, isValid };
    }, data.phoneNums[0].phoneNum);

    const {
        value: optionalPhone,
        isValid: optionalPhoneIsValid,
        error: optionalPhoneError,
        isTouched: optionalPhoneIsTouched,
        valueChangeHandler: optionalPhoneChangedHandler,
        inputBlurHandler: optionalPhoneBlurHandler,
    } = useInput((value) => {
        let error = '';
        let isValid = true;
        if (value.length < 13) {
            error = translate.pleaseEnterValidPhoneNumber;
            isValid = false;
        }
        return { error, isValid };
    });

    const formIsValid = addressTitleIsValid && addressTypeIsValid && cityIsValid && districtIsValid && streetIsValid && buildingIsValid && floorIsValid && flatIsValid && primaryPhoneIsValid;

    const submitHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return;
        }
        let phoneNums = [];
        if (optionalPhoneIsValid) {
            phoneNums = [
                {
                    type: "Primary",
                    phoneNum: primaryPhone.replace("+2", "")
                },
                {
                    type: "Optionally",
                    phoneNum: optionalPhone.replace("+2", "")
                }
            ]
        } else {
            phoneNums = [
                {
                    type: "Primary",
                    phoneNum: primaryPhone.replace("+2", "")
                }
            ]
        }
        const branchData = {
            _id: userData._id,
            addressType: addressType,
            addressTitle: addressTitle,
            city: city,
            district: district,
            street: street,
            building: building,
            floor: floor,
            flat: flat,
            coordinates: {
                lat: lat, lng: long
            },
            landmark: landmark,
            phoneNums: phoneNums
        };

        const updatedFields = {};

        if (data.addressType !== branchData.addressType) {
            updatedFields.addressType = branchData.addressType;
        }
        if (data.addressTitle !== branchData.addressTitle) {
            updatedFields.addressTitle = branchData.addressTitle;
        }
        if (data.city !== branchData.city) {
            updatedFields.city = branchData.city;
        }
        if (data.district !== branchData.district) {
            updatedFields.district = branchData.district;
        }
        if (data.street !== branchData.street) {
            updatedFields.street = branchData.street;
        }
        if (data.building !== branchData.building) {
            updatedFields.building = branchData.building;
        }
        if (data.floor !== branchData.floor) {
            updatedFields.floor = branchData.floor;
        }
        if (data.flat !== branchData.flat) {
            updatedFields.flat = branchData.flat;
        }
        if (data.coordinates.lat !== branchData.coordinates.lat || data.coordinates.lng !== branchData.coordinates.lng) {
            updatedFields.coordinates = branchData.coordinates;
        }
        if (data.landmark !== branchData.landmark) {
            updatedFields.landmark = branchData.landmark;
        }
        if (data.phoneNums[0].phoneNum !== branchData.phoneNums[0].phoneNum) {
            updatedFields.phoneNums = branchData.phoneNums;
        }
        if (data.phoneNums[1] && branchData.phoneNums[1] && data.phoneNums[1].phoneNum !== branchData.phoneNums[1].phoneNum) {
            updatedFields.phoneNums = branchData.phoneNums;
        }

        dispatch(authActions.editStoreBranch({
            _id: userData._id,
            addressId: data._id,
            ...updatedFields
        },() => popupToggle(false), translate.branchEditedSuccessfully, translate.someThingWentWrongPleaseTry));

    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLat(latitude);
                setLong(longitude);
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);

    const locateMe = (event) => {
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLat(latitude);
                setLong(longitude);
                setPosition([latitude, longitude]);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    if (!position) {
        return <p>{translate.loading}</p>;
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        if (name === 'lat') {
            setLat(value);
        } else {
            setLong(value);
        }
    }

    return (
        <form noValidate className='edit-branch inter' onSubmit={submitHandler}>
            <div className="full-width flex-col-left-start edit-branch--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="type" >
                    {translate.addressType}
                </label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className="bi bi-person size-20px" />
                    <input
                        className="full-width gray margin-4px-H"
                        type={"text"}
                        placeholder={translate.addressType}
                        id={"title"}
                        value={addressType}
                        onChange={addressTypeChangedHandler}
                        onBlur={addressTypeBlurHandler}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: addressTypeError && addressTypeIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {addressTypeError}
                </p>
            </div>
            <div className="full-width flex-col-left-start edit-branch--input-container">
                <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="title" >
                    {translate.addressTitle}<span className='red'>*</span>
                </label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className="bi bi-person size-20px" />
                    <input
                        className="full-width gray margin-4px-H"
                        type={"text"}
                        placeholder={translate.addressTitle}
                        id={"title"}
                        value={addressTitle}
                        onChange={addressTitleChangedHandler}
                        onBlur={addressTitleBlurHandler}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: addressTitleError && addressTitleIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {addressTitleError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='City'>{translate.city}<span className='red'>*</span></label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className='bi bi-pin-map size-20px' />
                    <RegionDropdown className='full-width gray margin-4px-H radius-10px flex-row-left-start edit-branch--select'
                        disableWhenEmpty={true}
                        country={'Egypt'}
                        value={city}
                        id="city"
                        name="city"
                        onChange={
                            (city) =>
                                handleCityChange({ target: { id: "city", value: city } })
                        }
                        onBlur={handleCityBlur} />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: cityError && cityIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {cityError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='District'>{translate.district}<span className='red'>*</span></label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className='bi bi-pin-map-fill size-20px' />
                    <input
                        className='full-width gray margin-4px-H'
                        type={'text'}
                        placeholder={translate.district}
                        id={'district'}
                        value={district}
                        onChange={handleDistrictChange}
                        onBlur={handleDistrictBlur}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: districtError && districtIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {districtError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Street'>{translate.street}<span className='red'>*</span></label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className='bi bi-pin-map-fill size-20px' />
                    <input
                        className='full-width gray margin-4px-H'
                        type={'text'}
                        placeholder={translate.street}
                        id={'street'}
                        value={street}
                        onChange={handleStreetChange}
                        onBlur={handleStreetBlur}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: streetError && streetIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {streetError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Building'>{translate.building}<span className='red'>*</span></label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className='bi bi-pin-map-fill size-20px' />
                    <input
                        className='full-width gray margin-4px-H'
                        type={'text'}
                        placeholder={translate.building}
                        id={'building'}
                        value={building}
                        onChange={handleBuildingChange}
                        onBlur={handleBuildingBlur}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: buildingError && buildingIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {buildingError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Floor'>{translate.floor}<span className='red'>*</span></label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className='bi bi-pin-map-fill size-20px' />
                    <input
                        className='full-width gray margin-4px-H'
                        type={'text'}
                        placeholder={translate.floor}
                        id={'floor'}
                        value={floor}
                        onChange={handleFloorChange}
                        onBlur={handleFloorBlur}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: floorError && floorIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {floorError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Flat'>{translate.flat}<span className='red'>*</span></label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className='bi bi-pin-map-fill size-20px' />
                    <input
                        className='full-width gray margin-4px-H'
                        type={'text'}
                        placeholder={translate.flat}
                        id={'flat'}
                        value={flat}
                        onChange={handleFlatChange}
                        onBlur={handleFlatBlur}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: flatError && flatIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {flatError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Landmark'>{translate.landmark}</label>
                <div className={`full-width gray radius-10px white-bg flex-row-left-start edit-branch--input`}>
                    <i className='bi bi-pin-map-fill size-20px' />
                    <input
                        className='full-width gray margin-4px-H'
                        type={'text'}
                        placeholder={translate.landmark}
                        id={'landmark'}
                        value={landmark}
                        onChange={handleLandmarkChange}
                        onBlur={handleLandmarkBlur}
                    />
                </div>
                <p style={{ marginLeft: '0 5px 0 5px', visibility: landmarkError && landmarkIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {landmarkError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='PrimaryPhoneNum'>{translate.primaryPhoneNumber}<span className='red'>*</span></label>
                <PhoneInput
                    className={`full-width gray white-bg radius-10px flex-row-left-start edit-branch--input`}
                    id={'PrimaryPhoneNum'}
                    placeholder={translate.primaryPhoneNumber}
                    international
                    countryCallingCodeEditable={false}
                    limitMaxLength
                    countrySelectProps={{ unicodeFlags: true }}
                    defaultCountry={'EG'}
                    value={primaryPhone}
                    onChange={(phone) =>
                        primaryPhoneChangedHandler({ target: { id: "phone", value: phone } })
                    }
                    onBlur={primaryPhoneBlurHandler}
                />
                <p style={{ marginLeft: '0 5px 0 5px', visibility: primaryPhoneError && primaryPhoneIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {primaryPhoneError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='OptionallyPhoneNum'>{translate.optionalPhoneNumber}</label>
                <PhoneInput
                    className={`full-width gray white-bg radius-10px flex-row-left-start edit-branch--input`}
                    id={'OptionallyPhoneNum'}
                    placeholder={translate.optionalPhoneNumber}
                    international
                    countryCallingCodeEditable={false}
                    limitMaxLength
                    countrySelectProps={{ unicodeFlags: true }}
                    defaultCountry={'EG'}
                    value={optionalPhone}
                    onChange={(phone) =>
                        optionalPhoneChangedHandler({ target: { id: "phone", value: phone } })
                    }
                    onBlur={optionalPhoneBlurHandler}
                />
                <p style={{ marginLeft: '0 5px 0 5px', visibility: optionalPhoneError && optionalPhoneIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {optionalPhoneError}
                </p>
            </div>
            <div className='full-width flex-col-left-start edit-branch--input-container'>
                <div className='flex-row-between full-width'>
                    <label className='pointer text-shadow gray font-bold margin-6px-V'>
                        {translate.latitude}:
                        <input
                            type="number"
                            step={0.00001}
                            name={translate.latitude}
                            value={lat}
                            onChange={handleInputChange}
                            className='gray radius-10px white-bg margin-4px-V edit-branch--input-number'
                        />
                    </label>
                    <label className='pointer text-shadow gray font-bold margin-6px-V'>
                        {translate.longitude}:
                        <input
                            type="number"
                            step={0.00001}
                            name={translate.longitude}
                            value={long}
                            onChange={handleInputChange}
                            className='gray radius-10px white-bg margin-4px-V edit-branch--input-number'
                        />
                    </label>
                    <button onClick={locateMe} className={`edit-branch--actions--locate pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-14px font-bold mint-green-bg`}>
                        {translate.locateMe}
                    </button>
                </div>
            </div>

            <MapContainer center={[lat, long]} zoom={13} style={{ height: '200px', width: "100%" }} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, long]} icon={customIcon}>
                    <Popup>{translate.yourLocation}</Popup>
                </Marker>
            </MapContainer>
            <div className="edit-branch--actions flex-row-between full-width">
                <button
                    className={`edit-branch--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                    type="submit"
                >
                    {translate.confirm}
                </button>
                <button
                    className="edit-branch--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                    onClick={() => {
                        popupToggle(false);
                    }} >
                    {translate.cancel}
                </button>
            </div>
        </form>
    );
}
export default EditBranchForm;
