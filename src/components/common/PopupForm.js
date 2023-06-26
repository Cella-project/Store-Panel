import React, { useEffect, useRef } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import background from '../../assets/images/background.svg';
import backgroundDark from '../../assets/images/background-dark.svg';
import AddProductTagForm from "../products/AddProductTagForm";
import AddProductColorForm from "../products/AddProductColorForm";
import AddProductSizeForm from "../products/AddProductSizeForm";
import RefillProductForm from "../products/RefillProductForm";
import { useSelector } from "react-redux";
import VerifyOTP from "../verifyEmail/VerifyOTP";

import './PopupForm.scss';

const Popup = ({ popupToggle, header, data }) => {
    const popupRef = useRef();
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector((state) => state.language.language);
    const dashboard = document.getElementById('dashboard-view');

    useEffect(() => {
        const mouseHandler = (e) => {
            if (!popupRef.current.contains(e.target)) {
                popupToggle(false);
                dashboard.style.zIndex = 10;
                window.onscroll = null;
            }
        };

        dashboard.addEventListener('mousedown', mouseHandler);

        return () => {
            dashboard.removeEventListener('mousedown', mouseHandler);
        };
    }, [dashboard, popupToggle]);

    return (
        <div className={`popup--overlay ${mode === 'dark-mode' ? 'dark' : ''} full-width flex-row-${header === 'Verify Email' ? 'top-start' : 'right-start'}`}>
            {header === 'Verify Email' ? (
                <div className='popup--verify flex-col-top-start inter white-bg' ref={popupRef}>
                    <img src={mode === 'dark-mode' ? backgroundDark : background} className={mode === 'dark-mode' ? 'dark' : ''} alt='bg' />

                    <div className={`popup--verify--header flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-20px mint-green-bg full-width`}>
                        {header}
                    </div>

                    <div className='popup--verify--cont flex-col-top-start'>
                        <VerifyOTP popupToggle={popupToggle} />
                    </div>
                </div>
            ) : (
                <div className={`popup--content${language === 'ar' ? '-arabic' : ''} flex-col-top-start inter white-bg width-25-100`} ref={popupRef}>
                    <img src={mode === 'dark-mode' ? backgroundDark : background} className={mode === 'dark-mode' ? 'dark' : ''} alt='bg' />

                    <div className={`popup--header${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-20px mint-green-bg full-width`}>
                        {header}
                    </div>

                    <PerfectScrollbar className='popup--form full-width flex-col-top-start'>
                        {header === 'Add Product Tag' && <AddProductTagForm popupToggle={popupToggle} data={data} />}
                        {header === 'Add Product Color' && <AddProductColorForm popupToggle={popupToggle} data={data} />}
                        {header === 'Add Product Size' && <AddProductSizeForm popupToggle={popupToggle} data={data} />}
                        {header === 'Refill Product' && <RefillProductForm popupToggle={popupToggle} data={data} />}
                    </PerfectScrollbar>
                </div>
            )
            }
        </div>
    );
};

export default Popup;
