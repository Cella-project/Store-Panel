import React, { useEffect, useRef, useState } from "react";
import UKFlag from '../../assets/images/UK.png';
import EGFlag from '../../assets/images/EG.png';
import { useSelector,useDispatch } from "react-redux";
import { languageMutations } from "../../redux/mutations";


import './LangMenu.scss';

const LangMenu = () => {
    const dispatch = useDispatch();
    const [langMenuShown, setLangMenuShown] = useState(false);
    const lang = useSelector(state => state.language.language);


    const mode = useSelector(state => state.theme.mode);

    const changeLangHandler = (val) => {
        dispatch(languageMutations.setLanguage(val));
        setLangMenuShown(!langMenuShown);
    }

    let menuRef = useRef();

    useEffect(() => {
        let mouseHandler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setLangMenuShown(false);
            }
        };

        let keyboardHandler = (e) => {
            if (e.key === "Escape") {
                setLangMenuShown(false);
            }
        }

        document.addEventListener('mousedown', mouseHandler);
        document.addEventListener('keydown', keyboardHandler);

        return () => {
            document.removeEventListener('mousedown', mouseHandler);
            document.removeEventListener('keydown', keyboardHandler);
        }
    });

    return (
        <div ref={menuRef} onClick={setLangMenuShown.bind(null, !langMenuShown)} className='menu flex-row-center white-bg radius-15px margin-6px-H shadow-2px pointer'>
            <img className='menu--img margin-8px-H flex-row-center radius-circular' src={lang === 'en' ? UKFlag : EGFlag} alt='flag' />
            <p className={`menu--content space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-12px margin-4px-H`}>{lang.toLocaleUpperCase()}</p>
            <i className={`menu--content bi bi-chevron-${langMenuShown ? 'up' : 'down'} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-12px margin-4px-H`}></i>
            {langMenuShown && <div className='menu--lang-menu flex-col-center white-bg radius-15px shadow-2px'>
                <div onClick={changeLangHandler.bind(null, 'en')} className='menu--lang-menu--item full-width flex-row-left-start margin-2px-V pointer'>
                    <img className='menu--lang-menu--item--img margin-8px-H flex-row-center radius-circular' src={UKFlag} alt='flag' />
                    <p className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-12px`}>EN</p>
                </div>
                <div onClick={changeLangHandler.bind(null, 'ar')} className='menu--lang-menu--item full-width flex-row-left-start margin-2px-V pointer'>
                    <img className='menu--lang-menu--item--img margin-8px-H flex-row-center radius-circular' src={EGFlag} alt='flag' />
                    <p className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-12px`}>AR</p>
                </div>
            </div>}
        </div>
    );
};

export default LangMenu;