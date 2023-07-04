import React, { useState } from 'react';

import ChangeOwnerInfo from '../../../components/profile/ChangeOwnerInfo';
import ChangeStoreInfo from '../../../components/profile/ChangeStoreInfo';
import ChangePassword from '../../../components/profile/ChangePassword';
import Canvas from '../../../components/common/Canvas';
import GreenCard from '../../../components/common/GreenCard';
import AddBranchForm from '../../../components/stores/AddBranchForm';
import EditBranchForm from '../../../components/stores/EditBranchForm';
import AddSocialAccountForm from '../../../components/stores/AddSocialAccountForm';
import EditSocialAccountForm from '../../../components/stores/EditSocialAccountForm';
import FaceBook from "../../../assets/images/facebook.png";
import Instagram from "../../../assets/images/instagram.png";
import Whatsapp from "../../../assets/images/whatsapp.png";
import { useDispatch, useSelector } from 'react-redux';
import languages from '../../../components/global/languages';
import { authActions } from '../../../apis/actions';

import { useEffect } from 'react';

import { Rating } from '@mui/material';
import { StarBorder } from '@material-ui/icons';

import './Profile.scss';

const Profile = () => {
    const userData = useSelector((state) => state.auth.userData);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const [logoIMG, setLogoIMG] = useState(userData.logo);
    const [editIMG, setEditIMG] = useState(false);
    const [section, setSection] = useState('storeInfo');
    const [addBranchForm, setAddBranchForm] = useState(false);
    const [addSocialAccountForm, setAddSocialAccountForm] = useState(false);
    const [editBranchForm, setEditBranchForm] = useState(false);
    const [editSocialAccountForm, setEditSocialAccountForm] = useState(false);

    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        document.title = 'Profile • Store panel';
    }, []);

    const dispatch = useDispatch();

    const uploadImg = async (e) => {
        setEditIMG(true);
        const data = new FormData();
        data.append('path', 'store/profile');
        data.append('file', e.target.files[0]);

        dispatch(authActions.changeProfileImage(data, (response) => {
            setLogoIMG('http://www.actore.store/api/file-manager/file/' + response.data.data);
        }, translate.logoAddedSuccessfully, translate.someThingWentWrongPleaseTry))
    }


    const handleChangeIMG = async () => {
        dispatch(authActions.editProfile({
            _id: userData._id,
            logo: logoIMG,
        }, () => setEditIMG(false)));
    }

    const handleCancelIMG = () => {
        setLogoIMG(userData.logo);
        setEditIMG(false);
    }
    const [expandedAddressId, setExpandedAddressId] = useState(null);

    const toggleAddress = (addressId) => {
        if (expandedAddressId === addressId) {
            setExpandedAddressId(null);
        } else {
            setExpandedAddressId(addressId);
        }
    };

    const addSocialAccount = () => {
        setAddSocialAccountForm(!addSocialAccountForm);
    }
    const addBranch = () => {
        setAddBranchForm(!addBranchForm);
    }

    const deleteSocialAcc = (accountID) => {
        dispatch(authActions.deleteStoreSocialMediaAccount({
            _id: userData._id,
            socialMediaAccountId: accountID
        }, translate.areYouSureDeleteSocialMedia, translate.socialMediaDeletedSuccessfully, translate.someThingWentWrongPleaseTry));
    }
    const deleteAddress = (addressID) => {
        dispatch(authActions.deleteStoreBranch({
            _id: userData._id,
            addressId: addressID
        }, translate.areYouSureDeleteBranch, translate.branchDeletedSuccessfully, translate.someThingWentWrongPleaseTry));
    }

    return (
        <div className="profile full-width" >
            <div className="profile--braud-cramb inter gray size-16px font-bold">
                {translate.profile}
            </div>
            <div className='full-width flex-row-top-start2col'>
                <div className='width-40-100 flex-col-center'>
                    <div style={{ border: mode === 'dark-mode' ? '#163a4a double 2px' : '#70c8b0 double 2px', }}
                        className="profile--content full-width flex-col-top-start">
                        <div style={{ border: mode === 'dark-mode' ? '#163a4a double 2px' : '#70c8b0 double 2px', }} className='profile--content full-width flex-col-top-start mint-green-bg'>
                            <div className='profile--content--header full-width flex-row-center gray font-bold margin-6px-V white-bg padding-6px-V'>
                                {translate.logoImage}
                            </div>
                            <div className='profile--content--header--img flex-col-center radius-circular'>
                                {logoIMG === 'No Image' ?
                                    <Canvas name={userData.storeName} borderRadius='50%' width={250} height={255} fontSize={'180px'} />
                                    :
                                    <img src={logoIMG} className='white-bg' alt="" />
                                }
                            </div>
                            <div className="flex-row-right-start margin-8px-V">
                                <Rating
                                    name="rating"
                                    style={{ color: "#FDCC0D" }}
                                    emptyIcon={<StarBorder className="gray" fontSize='inherit' />}
                                    value={userData.rating}
                                    precision={1}
                                    size={"medium"}
                                    readOnly
                                />
                                <div className="size-14px gray font-bold margin-4px-H">
                                    {userData.rating}
                                </div>
                            </div>
                            <div className='profile--change-img flex-row-center radius-circular'>
                                <label className='full-width size-16px' htmlFor='profile-picture'>
                                    <div className='full-width profile--change-img--tag flex-row-center white-bg gray open-sans pointer'>
                                        <i className="bi bi-camera size-16px margin-4px-H" />
                                        {translate.changePicture}
                                        <input type="file" id='profile-picture' onChange={uploadImg} />
                                    </div>
                                </label>
                            </div>
                        </div>
                        {editIMG &&
                            <>
                                <button
                                    className={`profile--btn shadow-2px width-50-100 ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg font-bold size-20px pointer margin-12px-V`}
                                    onClick={handleChangeIMG}
                                >{translate.save}</button>
                                <button
                                    className={`profile--btn shadow-2px width-50-100 ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg font-bold size-20px pointer`}
                                    onClick={handleCancelIMG}
                                >{translate.cancel}</button>
                            </>
                        }
                        <input type='button' className={`profile--input--container margin-6px-V full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg size-20px pointer`}
                            onClick={() => { setSection("ownerInfo") }}
                            value={translate.ownerInfo} />
                        <input type='button' className={`profile--input--container margin-6px-V full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg size-20px pointer`}
                            onClick={() => { setSection("storeInfo") }}
                            value={translate.storeInfo} />
                        <input type='button' className={`profile--input--container margin-6px-V full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg size-20px pointer`}
                            onClick={() => { setSection("changePassword") }}
                            value={translate.changePassword} />
                    </div>
                </div>
                <div style={{ border: mode === 'dark-mode' ? '#163a4a double 2px' : '#70c8b0 double 2px', }} className='profile--content full-width flex-col-top-start'>
                    {
                        section === 'ownerInfo' ? (
                            <ChangeOwnerInfo />
                        ) : section === 'storeInfo' ? (
                            <div className='flex-col-top-start full-width'>
                                <ChangeStoreInfo />
                                <div className='flex-row-top-start2col full-width'>
                                    <GreenCard title={translate.branches} icon={addBranchForm ? 'bi bi-x-circle' : 'bi bi-plus-circle'} iconClickHandle={addBranch}>
                                        <div className='full-width flex-col-center'>
                                            {(addBranchForm !== true && userData && userData.addresses.length > 0) ? (
                                                userData.addresses.map((address) => {
                                                    const isExpanded = expandedAddressId === address._id;
                                                    return (
                                                        <div key={address._id} className='full-width'>
                                                            {
                                                                editBranchForm && (
                                                                    <EditBranchForm popupToggle={setEditBranchForm} data={address} />
                                                                )
                                                            }
                                                            <div className="pointer flex-col-right-start" onClick={() => toggleAddress(address._id)}>
                                                                <div className="profile--content-container shadow-2px flex-col-center radius-15px margin-8px-V gray inter full-width">
                                                                    <div className="text-shadow">{address.addressTitle}
                                                                        <i
                                                                            className={`profile--address--btn--delete margin-6px-H shadow-2px ${mode === 'dark-mode' ? 'gray' : 'mint-green'} bi bi-trash pointer size-14px white-bg radius-circular flex-row-center`}
                                                                            onClick={() => deleteAddress(address._id)}
                                                                        />
                                                                        <i
                                                                            className={`profile--address--btn--edit margin-6px-H shadow-2px ${mode === 'dark-mode' ? 'gray' : 'mint-green'} bi bi-pencil-square pointer size-14px white-bg radius-circular flex-row-center`}
                                                                            onClick={() => setEditBranchForm(true)}
                                                                        />
                                                                    </div>
                                                                    {isExpanded && (
                                                                        <div className="flex-col-left-start gray mint-green full-width margin-8px-V">
                                                                            <div className="margin-6px-V flex-row-left-start">{translate.addressType}:
                                                                                <div className='gray margin-12px-H'>
                                                                                    {address.addressType}
                                                                                </div>
                                                                            </div>
                                                                            <div className="margin-6px-V flex-row-left-start">{translate.city}:
                                                                                <div className='gray margin-12px-H'>
                                                                                    {address.city}
                                                                                </div>
                                                                            </div>
                                                                            <div className="margin-6px-V flex-row-left-start">{translate.district}:
                                                                                <div className='gray margin-12px-H'>
                                                                                    {address.district}
                                                                                </div>
                                                                            </div>
                                                                            <div className="margin-6px-V flex-row-left-start">{translate.street}:
                                                                                <div className='gray margin-12px-H'>
                                                                                    {address.street}
                                                                                </div>
                                                                            </div>
                                                                            <div className="margin-6px-V flex-row-left-start">{translate.building}:
                                                                                <div className='gray margin-12px-H'>
                                                                                    {address.building}
                                                                                </div>
                                                                            </div>
                                                                            <div className="margin-6px-V flex-row-left-start">{translate.floor}:
                                                                                <div className='gray margin-12px-H'>
                                                                                    {address.floor}
                                                                                </div>
                                                                            </div>
                                                                            <div className="margin-6px-V flex-row-left-start">{translate.flat}:
                                                                                <div className='gray margin-12px-H'>
                                                                                    {address.flat}
                                                                                </div>
                                                                            </div>
                                                                            {
                                                                                address.landmark && (
                                                                                    <div className="margin-6px-V flex-row-left-start">{translate.landmark}:
                                                                                        <div className='gray margin-12px-H'>
                                                                                            {address.landmark}
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                            <div className="margin-6px-V flex-row-top-start full-width">{translate.phoneNumber}:
                                                                                <div className="margin-12px-H flex-col-left-start gray">
                                                                                    {address.phoneNums.map((phone) => (
                                                                                        <div key={phone._id}>
                                                                                            {phone.type}: {phone.phoneNum}
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex-row-right-start margin-2px-V size-14px font-bold">
                                                                <i
                                                                    className={`pointer bi bi-chevron-${isExpanded ? "up" : "down"} gray`}
                                                                    onClick={() => toggleAddress(address._id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : !addBranchForm ? (
                                                <div className={`text-shadow font-bold gray inter radius-15px size-14px`}>{translate.noBranchesToDisplay}</div>
                                            ) : (<></>)
                                            }
                                        </div>
                                        {
                                            addBranchForm && (
                                                <AddBranchForm popupToggle={setAddBranchForm} />
                                            )
                                        }
                                    </GreenCard>
                                </div>
                                <div className='flex-row-top-start2col full-width'>
                                    <GreenCard title={translate.socialMedia} icon={addSocialAccountForm ? 'bi bi-x-circle' : 'bi bi-plus-circle'} iconClickHandle={addSocialAccount}>
                                        <div className="flex-row-between pointer full-width profile--socials flex-wrap">
                                            {!editSocialAccountForm && !addSocialAccountForm && userData && userData.socialMediaAccounts && userData.socialMediaAccounts.length > 0 ? (
                                                userData.socialMediaAccounts.map(account => {
                                                    if (account.accountType === 'Facebook') {
                                                        return (
                                                            <div className="profile--socials--btn" key={account.accountType}>
                                                                <a href={account.link} target="_blank" rel="noreferrer">
                                                                    <img src={FaceBook} alt='facebook' />
                                                                    <div className="profile--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                                                        {translate.facebook}
                                                                    </div>
                                                                </a>
                                                                <i
                                                                    className="profile--socials--btn--delete shadow-2px bi bi-trash pointer size-12px mint-green white-bg radius-circular flex-row-center"
                                                                    onClick={() => deleteSocialAcc(account._id)}
                                                                />
                                                            </div>
                                                        )
                                                    } if (account.accountType === 'Whatsapp') {
                                                        return (
                                                            <div className="profile--socials--btn" key={account.accountType}>
                                                                <a href={account.link} target="_blank" rel="noreferrer">
                                                                    <img src={Whatsapp} alt='whatsapp' />
                                                                    <div className="profile--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                                                        {translate.whatsapp}
                                                                    </div>
                                                                    <i className={`profile--socials--btn--delete shadow-2px bi bi-trash pointer size-14px ${mode==='dark-mode'? 'white':'mint-green' } white-bg radius-circular flex-row-center`} onClick={deleteSocialAcc} />
                                                                </a>
                                                                <i
                                                                    className={`profile--socials--btn--delete shadow-2px bi bi-trash pointer size-12px ${mode==='dark-mode'? 'white':'mint-green' } white-bg radius-circular flex-row-center`}
                                                                    onClick={() => deleteSocialAcc(account._id)}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    if (account.accountType === 'Instagram') {
                                                        return (
                                                            <div className="profile--socials--btn" key={account.accountType}>
                                                                <a href={account.link} target="_blank" rel="noreferrer">
                                                                    <img src={Instagram} alt='instagram' />
                                                                    <div className="profile--socials--btn--tag white inter size-12px radius-5px shadow-5px">
                                                                        {translate.instagram}
                                                                    </div>
                                                                </a>
                                                                <i
                                                                    className="profile--socials--btn--delete shadow-2px bi bi-trash pointer size-12px mint-green white-bg radius-circular flex-row-center"
                                                                    onClick={() => deleteSocialAcc(account._id)}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                    return account;
                                                })
                                            ) : userData.socialMediaAccounts.length === 0 && !addSocialAccountForm && !editSocialAccountForm ? (
                                                <div className={`text-shadow font-bold gray inter radius-15px size-14px`}>{translate.noSocialMediaAccounts}</div>
                                            ) : <></>
                                            }
                                            {
                                                addSocialAccountForm && (
                                                    <AddSocialAccountForm popupToggle={setAddSocialAccountForm} />
                                                )
                                            }
                                            {
                                                !addSocialAccountForm && !editSocialAccountForm && userData && userData.socialMediaAccounts && userData.socialMediaAccounts.length > 0 ? (
                                                    <input type='button' className={`profile--input--container margin-14px-V full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg size-14px pointer`}
                                                        onClick={() => setEditSocialAccountForm(true)}
                                                        value={translate.editSocialMediaAccount} />
                                                ) : <>  </>
                                            }
                                            {
                                                editSocialAccountForm && (
                                                    <EditSocialAccountForm popupToggle={setEditSocialAccountForm} />
                                                )}
                                        </div>
                                    </GreenCard>
                                    <GreenCard title={translate.specialty} >
                                        <div className="inter size-22px text-shadow gray flex-row-center font-bold">{userData.speciality.title}</div>
                                    </GreenCard>
                                </div>
                            </div>
                        ) : section === 'changePassword' ? (
                            <ChangePassword />
                        ) : (
                            <>
                            </>
                        )
                    }
                </div>
            </div >
        </div >
    )
}

export default Profile;