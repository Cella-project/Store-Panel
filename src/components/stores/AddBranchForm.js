import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import PhoneInput from 'react-phone-number-input';
import { RegionDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { storeActions } from '../../apis/actions';
import useInput from '../../hooks/useInput';
import 'react-phone-number-input/style.css';
import './AddBranchForm.scss';
import "leaflet/dist/leaflet.css";

const AddBranchForm = ({ popupToggle }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const mode = useSelector((state) => state.theme.mode);

  const [lat, setLat] = useState(31.25654);
  const [long, setLong] = useState(32.28411);
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
      error = 'Please enter an address type.';
    } else if (value.length < 3 || value.length > 50) {
      error = 'Please enter an address type between 3 and 50 characters.';
    }
    return { isValid, error };
  });

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
      error = 'Please enter an address title.';
    } else if (value.length < 3 || value.length > 50) {
      error = 'Please enter an address title between 3 and 50 characters.';
    }
    return { isValid, error };
  });

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
      error = 'Please select a City.';
    }
    return { isValid, error };
  }, 'Port Said');

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
      error = 'Please enter a district.';
    } else if (value.length < 3 || value.length > 50) {
      error = 'Please enter a district between 3 and 50 characters.';
    }
    return { isValid, error };
  });

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
      error = 'Please enter a street.';
    } else if (value.length < 3 || value.length > 50) {
      error = 'Please enter a street between 3 and 50 characters.';
    }
    return { isValid, error };
  });

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
      error = 'Please enter a building.';
    } else if (value.length < 1 || value.length > 50) {
      error = 'Please enter a building between 1 and 50 characters.';
    }
    return { isValid, error };
  });

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
      error = 'Please enter a floor.';
    } else if (value.length < 1 || value.length > 50) {
      error = 'Please enter a floor between 1 and 50 characters.';
    }
    return { isValid, error };
  });

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
      error = 'Please enter a flat.';
    } else if (value.length < 1 || value.length > 50) {
      error = 'Please enter a flat between 1 and 50 characters.';
    }
    return { isValid, error };
  });
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
      error = 'Phone number is required';
      isValid = false;
    } else if (value.length < 13) {
      error = 'Please enter a valid phone number';
      isValid = false;
    }
    return { error, isValid };
  });

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
      error = 'Please enter a valid phone number';
      isValid = false;
    }
    return { error, isValid };
  });

  const addressTypeClass = addressTypeIsTouched && !addressTypeIsValid ? 'form-control-invalid' : '';
  const addressTitleClass = addressTitleIsTouched && !addressTitleIsValid ? 'form-control-invalid' : '';
  const cityClass = cityIsTouched && !cityIsValid ? 'form-control-invalid' : '';
  const districtClass = districtIsTouched && !districtIsValid ? 'form-control-invalid' : '';
  const streetClass = streetIsTouched && !streetIsValid ? 'form-control-invalid' : '';
  const buildingClass = buildingIsTouched && !buildingIsValid ? 'form-control-invalid' : '';
  const floorClass = floorIsTouched && !floorIsValid ? 'form-control-invalid' : '';
  const flatClass = flatIsTouched && !flatIsValid ? 'form-control-invalid' : '';
  const primaryPhoneClass = primaryPhoneIsTouched && !primaryPhoneIsValid ? 'form-control-invalid' : '';
  const optionalPhoneClass = optionalPhoneIsTouched && !optionalPhoneIsValid ? 'form-control-invalid' : '';

  const formIsValid = addressTypeIsValid && cityIsValid && districtIsValid && streetIsValid && buildingIsValid && floorIsValid && flatIsValid && primaryPhoneIsValid;

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
      _id: params.id,
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
      phoneNums: phoneNums
    };
    dispatch(storeActions.addStoreBranch(branchData, () => {
      popupToggle(false);
      document.getElementById("dashboard-view").style.zIndex = 10;
      window.onscroll = function () { };
    }
    ));

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
    return <p>Loading...</p>;
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
    <form noValidate className='add-branch' onSubmit={submitHandler}>
      <div className="full-width flex-col-left-start add-branch--input-container">
        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="type" >
          Address Type
        </label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${addressTypeClass}`}>
          <i className="bi bi-person size-20px" />
          <input
            className="full-width gray margin-4px-H"
            type={"text"}
            placeholder={"Branch Type"}
            id={"title"}
            value={addressType}
            onChange={addressTypeChangedHandler}
            onBlur={addressTypeBlurHandler}
          />
        </div>
        {addressTypeIsTouched && (
          <div className="error-message">{addressTypeError}</div>
        )}
      </div>
      <div className="full-width flex-col-left-start add-branch--input-container">
        <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="title" >
          Address Title
        </label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${addressTitleClass}`}>
          <i className="bi bi-person size-20px" />
          <input
            className="full-width gray margin-4px-H"
            type={"text"}
            placeholder={"Branch Title"}
            id={"title"}
            value={addressTitle}
            onChange={addressTitleChangedHandler}
            onBlur={addressTitleBlurHandler}
          />
        </div>
        {addressTitleIsTouched && (
          <div className="error-message">{addressTitleError}</div>
        )}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='City'>City</label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${cityClass}`}>
          <i className='bi bi-pin-map size-20px' />
          <RegionDropdown className='full-width gray margin-4px-H radius-10px flex-row-left-start add-branch--select'
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
        {cityIsTouched && (<div className="error-message">{cityError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='District'>District</label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${districtClass}`}>
          <i className='bi bi-pin-map-fill size-20px' />
          <input
            className='full-width gray margin-4px-H'
            type={'text'}
            placeholder={'District'}
            id={'district'}
            value={district}
            onChange={handleDistrictChange}
            onBlur={handleDistrictBlur}
          />
        </div>
        {districtIsTouched && (<div className="error-message">{districtError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Street'>Street</label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${streetClass}`}>
          <i className='bi bi-pin-map-fill size-20px' />
          <input
            className='full-width gray margin-4px-H'
            type={'text'}
            placeholder={'Street'}
            id={'street'}
            value={street}
            onChange={handleStreetChange}
            onBlur={handleStreetBlur}
          />
        </div>
        {streetIsTouched && (<div className="error-message">{streetError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Building'>Building</label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${buildingClass}`}>
          <i className='bi bi-pin-map-fill size-20px' />
          <input
            className='full-width gray margin-4px-H'
            type={'text'}
            placeholder={'Building'}
            id={'building'}
            value={building}
            onChange={handleBuildingChange}
            onBlur={handleBuildingBlur}
          />
        </div>
        {buildingIsTouched && (<div className="error-message">{buildingError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Floor'>Floor</label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${floorClass}`}>
          <i className='bi bi-pin-map-fill size-20px' />
          <input
            className='full-width gray margin-4px-H'
            type={'text'}
            placeholder={'Floor'}
            id={'floor'}
            value={floor}
            onChange={handleFloorChange}
            onBlur={handleFloorBlur}
          />
        </div>
        {floorIsTouched && (<div className="error-message">{floorError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='Flat'>Flat</label>
        <div className={`full-width gray radius-10px white-bg flex-row-left-start add-branch--input ${flatClass}`}>
          <i className='bi bi-pin-map-fill size-20px' />
          <input
            className='full-width gray margin-4px-H'
            type={'text'}
            placeholder={'Flat'}
            id={'flat'}
            value={flat}
            onChange={handleFlatChange}
            onBlur={handleFlatBlur}
          />
        </div>
        {flatIsTouched && (<div className="error-message">{flatError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='PrimaryPhoneNum'>Primary Phone Number</label>
        <PhoneInput
          className={`full-width gray white-bg radius-10px flex-row-left-start add-branch--input ${primaryPhoneClass}`}
          id={'PrimaryPhoneNum'}
          placeholder="Primary phone number"
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
        {primaryPhoneIsTouched && (<div className="error-message">{primaryPhoneError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='OptionallyPhoneNum'>Optionally Phone Number</label>
        <PhoneInput
          className={`full-width gray white-bg radius-10px flex-row-left-start add-branch--input ${optionalPhoneClass}`}
          id={'OptionallyPhoneNum'}
          placeholder="Optionally phone number"
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
        {optionalPhoneIsTouched && (<div className="error-message">{optionalPhoneError}</div>)}
      </div>
      <div className='full-width flex-col-left-start add-branch--input-container'>
        <div className='flex-row-between'>

          <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
            Latitude:
            <input
              type="number"
              step={0.00001}
              name="lat"
              value={lat}
              onChange={handleInputChange}
              className='gray radius-10px white-bg margin-4px-V add-branch--input-number'
            />
          </label>
          <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
            Longitude:
            <input
              type="number"
              step={0.00001}
              name="long"
              value={long}
              onChange={handleInputChange}
              className='gray radius-10px white-bg margin-4px-V add-branch--input-number'
            />
          </label>
          <button onClick={locateMe} className={`add-branch--actions--locate pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-12px font-bold mint-green-bg`}>
            Locate me
          </button>
        </div>
      </div>

      <MapContainer center={[lat, long]} zoom={13} style={{ height: '200px', width: "100%" }} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, long]} icon={customIcon}>
          <Popup>Your location</Popup>
        </Marker>
      </MapContainer>
      <div className="add-branch--actions flex-row-between full-width">
        <button
          className={`add-branch--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
          type="submit"
        >
          Confirm
        </button>
        <button
          className="add-branch--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
          onClick={() => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
          }} >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default AddBranchForm;
