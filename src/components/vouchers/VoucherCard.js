import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Canvas from '../common/Canvas';
import languages from '../global/languages';
import './VoucherCard.scss';

const VoucherCard = ({ type, status, value, store, code, img }) => {
    const [open, setOpen] = useState(false);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <div key={Math.random().toString()} className='voucher-list-card gray shadow-2px margin-10px-V inter radius-15px white-bg full-width flex-col-left-start'>
                <div className='voucher-list-card--info flex-row-between2col full-width pointer' onClick={toggleOpen}>
                    <div className='margin-2px-V flex-row-left-start'>
                        <span className='margin-4px-H font-bold'>{translate.type}: </span>
                        <i className={`${type} ${status} size-30px`} />
                    </div>
                    <div className='margin-2px-V flex-row-left-start'>
                        <span className='margin-4px-H font-bold'>{translate.code}: </span>
                        <div className='flex-col-left-start'>
                            {code}
                            <div className='margin-10px-H gray size-12px'>{value} {translate.saleOn} {store}</div>
                        </div>
                    </div>
                    {img &&
                        <div className='margin-2px-V flex-row-left-start'>
                            <span className='margin-4px-H font-bold'>{translate.saleFor}: </span>
                            {store !== 'Any Product' &&
                                <div className='voucher-list-card--img'>
                                    <Canvas name={store} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                                </div>
                            }
                            <div className='size-14px margin-6px-H'>{store}</div>
                        </div>
                    }
                    <div className='margin-2px-V'>
                        <span className='margin-4px-H font-bold'>{translate.value}: </span>
                        {value}
                    </div>
                    <div className='voucher-list-card--arrow margin-2px-V size-14px font-bold'>
                        <i className={`bi bi-chevron-${open ? 'up' : 'down'} gray`} />
                    </div>
                </div>

                {
                    open &&
                    <div className='full-width flex-col-left-start size-14px margin-8px-V'>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>{translate.code}: </div>
                            {code}
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>{translate.for}: </div>
                            {store}
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>{translate.type}: </div>
                            {translate.percentage} %
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>{translate.value}: </div>
                            {value}
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>{translate.min}: </div>
                            20$
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>{translate.max}: </div>
                            100$
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>{translate.remaining}: </div>
                            64
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default VoucherCard;