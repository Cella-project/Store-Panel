import React, { useEffect, useRef } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import background from '../../assets/images/background.png';
import backgroundDark from '../../assets/images/background-dark.png';
import AddProductTagForm from "../products/AddProductTagForm";
import AddProductColorForm from "../products/AddProductColorForm";
import AddProductSizeForm from "../products/AddProductSizeForm";
import RefillProductForm from "../products/RefillProductForm";
import { useSelector } from "react-redux";
import './PopupForm.scss';

const Popup = ({ popupToggle, header, data }) => {
    const popupRef = useRef();
    const mode = useSelector(state => state.theme.mode);
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
        <div className={`popup--overlay ${mode === 'dark-mode' ? 'dark' : ''} full-width flex-row-right-start`}>
            <div className='popup--content flex-col-top-start inter white-bg width-25-100' ref={popupRef}>
                <img src={mode === 'dark-mode' ? backgroundDark : background} className={mode === 'dark-mode' ? 'dark' : ''} alt='bg' />

                <div className={`popup--header flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-20px mint-green-bg full-width`}>
                    {header}
                </div>

                <PerfectScrollbar className='popup--form full-width flex-col-top-start'>
                    {header === 'Add Product Tag' && <AddProductTagForm popupToggle={popupToggle} data={data} />}
                    {header === 'Add Product Color' && <AddProductColorForm popupToggle={popupToggle} data={data} />}
                    {header === 'Add Product Size' && <AddProductSizeForm popupToggle={popupToggle} data={data} />}
                    {header === 'Refill Product' && <RefillProductForm popupToggle={popupToggle} data={data} />}
                </PerfectScrollbar>
            </div>
        </div>
    );
};

export default Popup;
