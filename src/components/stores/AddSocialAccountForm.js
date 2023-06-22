import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';
import languages from '../global/languages';
import './AddSocialAccountForm.scss';

const AddSocialAccountForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    const Facebook = useRef('');
    const Whatsapp = useRef('');
    const Instagram = useRef('');

    const [socialMediaAccounts, setSocialMediaAccounts] = useState({
        Facebook: '',
        Whatsapp: '',
        Instagram: '',
    });

    const formSubmissionHandler = (e) => {
        e.preventDefault();

        if (Facebook.current.length > 0) {
            dispatch(authActions.addStoreSocialMediaAccount({
                _id: userData._id,
                accountType: 'Facebook',
                link: Facebook.current
            }, () => {
                Facebook.current = '';
                setSocialMediaAccounts({ ...socialMediaAccounts, Facebook: '' });
                popupToggle(false);
                document.getElementById("dashboard-view").style.zIndex = 10;
                window.onscroll = function () { };
            }));
        }
        if (Whatsapp.current.length > 0) {
            dispatch(authActions.addStoreSocialMediaAccount({
                _id: userData._id,
                accountType: 'Whatsapp',
                link: Whatsapp.current
            }, () => {
                Whatsapp.current = '';
                setSocialMediaAccounts({ ...socialMediaAccounts, Whatsapp: '' });
                popupToggle(false);
                document.getElementById("dashboard-view").style.zIndex = 10;
                window.onscroll = function () { };
            }));
        }
        if (Instagram.current.length > 0) {
            dispatch(authActions.addStoreSocialMediaAccount({
                _id: userData._id,
                accountType: 'Instagram',
                link: Instagram.current
            }, () => {
                Instagram.current = '';
                setSocialMediaAccounts({ ...socialMediaAccounts, Instagram: '' });
                popupToggle(false);
                document.getElementById("dashboard-view").style.zIndex = 10;
                window.onscroll = function () { };
            }));
        }
    }

    return (
        <form noValidate className='add-store-socials full-width' onSubmit={formSubmissionHandler}>
            <div className='full-width flex-col-center add-store-socials--input-container'>
                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.setSocialMediaAccounts}</label>
                <div className='full-width gray radius-10px margin-8px-V white-bg flex-row-left-start add-store-socials--input'>
                    <i className='bi bi-facebook size-20px' />
                    <input className='full-width gray margin-6px-H'
                        type={'text'}
                        placeholder={translate.facebookAccountLink}
                        value={socialMediaAccounts.Facebook}
                        onChange={(e) => {
                            Facebook.current = e.target.value;
                            setSocialMediaAccounts({ ...socialMediaAccounts, Facebook: e.target.value })
                        }}
                    />
                </div>
                <div className='full-width gray radius-10px margin-8px-V white-bg flex-row-left-start add-store-socials--input'>
                    <i className='bi bi-whatsapp size-20px' />
                    <input className='full-width gray margin-6px-H'
                        type={'text'}
                        placeholder={translate.whatsappAccountLink}
                        value={socialMediaAccounts.Whatsapp}
                        onChange={(e) => {
                            Whatsapp.current = e.target.value;
                            setSocialMediaAccounts({ ...socialMediaAccounts, Whatsapp: e.target.value })
                        }}
                    />
                </div>
                <div className='full-width gray radius-10px margin-8px-V white-bg flex-row-left-start add-store-socials--input'>
                    <i className='bi bi-instagram size-20px' />
                    <input className='full-width gray margin-6px-H'
                        type={'text'}
                        placeholder={translate.instagramAccountLink}
                        value={socialMediaAccounts.Instagram}
                        onChange={(e) => {
                            Instagram.current = e.target.value;
                            setSocialMediaAccounts({ ...socialMediaAccounts, Instagram: e.target.value })
                        }}
                    />
                </div>
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
                        setSocialMediaAccounts({ ...socialMediaAccounts, Facebook: '', Whatsapp: '', Instagram: '' });
                    }}
                >
                    {translate.cancel}
                </button>
            </div>
        </form>
    )
}

export default AddSocialAccountForm