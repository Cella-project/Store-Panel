import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';
import languages from '../global/languages';
import './EditSocialAccountForm.scss';

const EditSocialAccountForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    const [facebookData, setFacebookData] = useState(() => {
        const facebookAccount = userData.socialMediaAccounts.find(
            (account) => account.accountType === 'Facebook'
        );

        return facebookAccount ? facebookAccount : '';
    });

    const [whatsappData, setWhatsappData] = useState(() => {
        const whatsappAccount = userData.socialMediaAccounts.find(
            (account) => account.accountType === 'Whatsapp'
        );

        return whatsappAccount ? whatsappAccount : '';
    });

    const [instagramData, setInstagramData] = useState(() => {
        const instagramAccount = userData.socialMediaAccounts.find(
            (account) => account.accountType === 'Instagram'
        );

        return instagramAccount ? instagramAccount : '';
    });

    const formSubmissionHandler = (e) => {
        e.preventDefault();

        // Check if the Facebook link is updated
        const facebookAccount = userData.socialMediaAccounts.find(
            (account) => account.accountType === 'Facebook'
        );
        if (facebookAccount && facebookData.link !== facebookAccount.link) {
            dispatch(
                authActions.editStoreSocialMediaAccount(
                    {
                        _id: userData._id,
                        accountId: facebookAccount._id, // Use _id as the accountId
                        link: facebookData.link

                    },
                    () => {
                        // Dispatch successful action
                        popupToggle(false);
                    },
                    translate.socialMediaAddedSuccessfully,
                    translate.someThingWentWrongPleaseTry
                )
            );
        }

        // Check if the Whatsapp link is updated
        const whatsappAccount = userData.socialMediaAccounts.find(
            (account) => account.accountType === 'Whatsapp'
        );
        if (whatsappAccount && whatsappData.link !== whatsappAccount.link) {
            dispatch(
                authActions.editStoreSocialMediaAccount(
                    {

                            _id: userData._id,
                            accountId: whatsappAccount._id, // Use _id as the accountId
                            link: whatsappData.link
                        
                    },
                    () => {
                        // Dispatch successful action
                        popupToggle(false);
                    },
                    translate.socialMediaAddedSuccessfully,
                    translate.someThingWentWrongPleaseTry
                )
            );
        }

        // Check if the Instagram link is updated
        const instagramAccount = userData.socialMediaAccounts.find(
            (account) => account.accountType === 'Instagram'
        );
        if (instagramAccount && instagramData.link !== instagramAccount.link) {
            dispatch(
                authActions.editStoreSocialMediaAccount(
                    {
                            _id: userData._id,
                            accountId: instagramAccount._id, // Use _id as the accountId
                            link: instagramData.link
                        
                    },
                    () => {
                        // Dispatch successful action
                        popupToggle(false);
                    },
                    translate.socialMediaAddedSuccessfully,
                    translate.someThingWentWrongPleaseTry
                )
            );
        }
    };





    return (
        <form noValidate className='add-store-socials full-width' onSubmit={formSubmissionHandler}>
            <div className='full-width flex-col-center add-store-socials--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.socialMediaAccounts.accountType}</label>
                {
                    userData.socialMediaAccounts.find(
                        (account) => account.accountType === 'Facebook'
                    ) &&
                    <div className='full-width gray radius-10px margin-8px-V white-bg flex-row-left-start add-store-socials--input'>
                        <i className='bi bi-facebook size-20px' />
                        <input
                            className='full-width gray margin-6px-H'
                            type='text'
                            placeholder={translate.facebookAccountLink}
                            value={facebookData.link}
                            onChange={(e) => {
                                setFacebookData((prevData) => ({
                                    ...prevData,
                                    link: e.target.value
                                }));
                            }}
                        />
                    </div>
                }
                {
                    userData.socialMediaAccounts.find(
                        (account) => account.accountType === 'Whatsapp'
                    ) &&
                    <div className='full-width gray radius-10px margin-8px-V white-bg flex-row-left-start add-store-socials--input'>
                        <i className='bi bi-whatsapp size-20px' />
                        <input
                            className='full-width gray margin-6px-H'
                            type='text'
                            placeholder={translate.whatsappAccountLink}
                            value={whatsappData.link}
                            onChange={(e) => {
                                setWhatsappData((prevData) => ({
                                    ...prevData,
                                    link: e.target.value
                                }));
                            }}
                        />
                    </div>
                }

                {
                    userData.socialMediaAccounts.find(
                        (account) => account.accountType === 'Instagram'
                    ) &&
                    <div className='full-width gray radius-10px margin-8px-V white-bg flex-row-left-start add-store-socials--input'>
                        <i className='bi bi-instagram size-20px' />
                        <input
                            className='full-width gray margin-6px-H'
                            type='text'
                            placeholder={translate.instagramAccountLink}
                            value={instagramData.link}
                            onChange={(e) => {
                                setInstagramData((prevData) => ({
                                    ...prevData,
                                    link: e.target.value
                                }));
                            }}
                        />
                    </div>
                }

            </div>
            <div className="add-store--actions flex-row-between full-width">
                <button
                    className={`add-branch--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                    type="submit"
                >
                    {translate.confirm}
                </button>
                <button
                    className={`add-branch--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px gray-bg`}
                    onClick={() => {
                        popupToggle(false);
                    }}
                >
                    {translate.cancel}
                </button>
            </div>
        </form>
    )
}

export default EditSocialAccountForm