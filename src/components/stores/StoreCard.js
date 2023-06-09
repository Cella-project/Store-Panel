import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarBorder from '@material-ui/icons/StarBorder';
import Canvas from '../common/Canvas';
import { useSelector } from 'react-redux';

import './StoreCard.scss';

const StoreCard = ({ storeCards, index }) => {
    const mode = useSelector(state => state.theme.mode);

    return (
        <div key={index} className='store-card width-90-100 shadow-5px margin-10px-V inter radius-15px white-bg pointer'>
            <Link to={`/stores/${storeCards._id}`} className='store-card--link full-width flex-row-between2col flex-wrap'>
                <div className='store-card--img flex-row-center'>
                    {storeCards.logo === 'No Image' ?
                        <Canvas name={storeCards.storeName} width={130} height={130} fontSize={'100px'} />
                        :
                        <img src={storeCards.logo} className='white-bg' alt="" />
                    }
                    <div className={`store-card--status ${storeCards.status === 'Active' ? 'green-bg' : 'red-bg'} shadow-5px radius-circular`}></div>
                </div>
                <div className='store-card--cont flex-row-between2col'>
                    <div className='store-card--store-info full-width flex-col-left-start'>
                        <div className='flex-row-left-start full-width'>
                            <span className={`size-22px ${mode === 'dark-mode' ? 'gray' : 'orange'} text-shadow font-bold`}>{storeCards.storeName}</span>
                        </div>
                        <div className='store-card--owner-info size-14px flex-col-left-start'>
                            <span className='gray margin-2px-V'>
                                <span className='gray font-bold'>Owner Name: </span>
                                {storeCards.owner.name}
                            </span>
                            <span className='gray margin-2px-V'>
                                <span className='gray font-bold'>Phone: </span>
                                {storeCards.owner.phoneNum}
                            </span>
                            <span className='gray margin-2px-V'>
                                <span className='gray font-bold'>Specialty: </span>
                                {storeCards.speciality.title}
                            </span>
                            <span className='gray margin-2px-V'>
                                {storeCards.addresses && storeCards.addresses.length > 0 &&
                                    <>
                                        <span className='gray font-bold'>City: </span>
                                        {storeCards.addresses[0].city}
                                    </>
                                }
                            </span>
                        </div>
                    </div>
                    <div className='flex-row-between store-card--cont2'>
                        <div className='store-card--rating flex-row-left-start size-16px font-bold'>
                            <Rating name="rating" emptyIcon={<StarBorder className='gray' fontSize='inherit' />} style={{ color: '#FDCC0D' }} value={storeCards.rating} precision={0.5} size={"medium"} readOnly />
                            <span className='size-14px gray font-bold margin-4px-H'>{storeCards.rating}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default StoreCard;