import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarBorder from '@material-ui/icons/StarBorder';
import languages from '../global/languages';
import { useSelector } from 'react-redux';
import './ReviewCard.scss';
import Canvas from '../common/Canvas';

const ReviewCard = ({ visible, customer, type, name, rating, status }) => {
    const [reviewShown, setreviewShown] = useState(visible);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const toggleReview = () => {
        setreviewShown(!reviewShown);
    }

    return (
        <>
            <div className='flex-row-left-start full-width'>
                <div className='review-lists-card--img radius-circular flex-row-center'>
                    <Canvas name={customer} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                    <div className={`${status ? status + '-bg lists-status' : ''} radius-circular`}></div>
                </div>
                <div className='review-lists-card gray shadow-2px margin-10px-V inter radius-15px white-bg full-width flex-col-left-start flex-wrap'>
                    <div className='review-lists-card--info flex-row-between2col full-width flex-wrap pointer' onClick={toggleReview}>
                        <div className='review-lists-card--cont margin-2px-V'>
                            <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.customer}: </span>{customer}
                        </div>
                        {type &&
                            <div className='review-lists-card--cont margin-2px-V'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.type}: </span>
                                <i className={`${type} orange size-30px`} />
                            </div>
                        }
                        {name &&
                            <div className='review-lists-card--cont margin-2px-V'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.name}: </span>{name}
                            </div>
                        }
                        <div className='flex-row-between2col review-lists-card--rating-cont flex-wrap'>
                            <div className='review-lists-card--cont margin-2px-V font-bold flex-row-left-start'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.rating}: </span>
                                <div className='flex-row-left-start flex-wrap'>
                                    <Rating name="rating" emptyIcon={<StarBorder className='gray' fontSize='inherit' />} style={{ color: '#FDCC0D' }} value={rating} precision={0.5} size={"small"} readOnly />
                                    <span className='size-12px gray font-bold margin-4px-H'>{rating}</span>
                                </div>
                            </div>
                            <div className='review-lists-card--arrow margin-2px-V size-14px font-bold'>
                                <i className={`bi bi-chevron-${reviewShown ? 'up' : 'down'} gray`} />
                            </div>
                        </div>
                    </div>
                    {reviewShown &&
                        <div className='full-width flex-row-between2col review-lists-card--exp'>
                            <div className='review-lists-card--content text-shadow shadow-5px radius-15px size-14px'>
                                The best Store in the world.
                                The best Store in the world.
                                The best Store in the world.
                                The best Delivery in the world.
                                The best Delivery in the world.
                                The best Delivery in the world.
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>

    )
}

export default ReviewCard;