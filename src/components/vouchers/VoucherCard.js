import React, { useState } from 'react';

import Canvas from '../common/Canvas';

import './VoucherCard.scss';

const VoucherCard = ({ type, status, value, store, code, img }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <div key={Math.random().toString()} className='voucher-list-card gray shadow-2px margin-10px-V inter radius-15px white-bg full-width flex-col-left-start'>
                <div className='voucher-list-card--info flex-row-between2col full-width pointer' onClick={toggleOpen}>
                    <div className='margin-2px-V flex-row-left-start'>
                        <span className='margin-4px-H font-bold'>Type: </span>
                        <i className={`${type} ${status} size-30px`} />
                    </div>
                    <div className='margin-2px-V flex-row-left-start'>
                        <span className='margin-4px-H font-bold'>Code: </span>
                        <div className='flex-col-left-start'>
                            {code}
                            <div className='margin-10px-H gray size-12px'>{value} sale on {store}</div>
                        </div>
                    </div>
                    {img &&
                        <div className='margin-2px-V flex-row-left-start'>
                            <span className='margin-4px-H font-bold'>Sale for: </span>
                            {store !== 'Any Product' &&
                                <div className='voucher-list-card--img'>
                                    <Canvas name={store} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                                </div>
                            }
                            <div className='size-14px margin-6px-H'>{store}</div>
                        </div>
                    }
                    <div className='margin-2px-V'>
                        <span className='margin-4px-H font-bold'>Value: </span>
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
                            <div className='margin-4px-H font-bold'>Code: </div>
                            {code}
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>For: </div>
                            {store}
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>Type: </div>
                            Percentage %
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>Value: </div>
                            {value}
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>Min: </div>
                            20$
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>Max: </div>
                            100$
                        </div>
                        <div className='flex-row-left-start margin-4px-V'>
                            <div className='margin-4px-H font-bold'>Remaining: </div>
                            64
                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default VoucherCard;