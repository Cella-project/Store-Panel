import React from 'react';
import Rating from '@mui/material/Rating';
import StarBorder from '@material-ui/icons/StarBorder';

import Canvas from '../common/Canvas';
import { useSelector } from 'react-redux';
import languages from '../global/languages';

import './ReviewCard.scss';

const ReviewCard = ({ review }) => {
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const mode = useSelector(state => state.theme.mode);

    return (
        <>
            <div className='flex-row-left-start full-width'>
                <div className='review-lists-card--img radius-circular flex-row-center'>
                    <Canvas name={review.reviewer.name} borderRadius='50%' width={55} height={55} fontSize={'42px'} />
                    <div className={`${review.status === 'Active' ? 'green' : 'red'}-bg lists-status radius-circular`}></div>
                </div>
                <div className='review-lists-card gray shadow-2px margin-10px-V inter radius-15px white-bg full-width flex-col-left-start flex-wrap'>
                    <div className='review-lists-card--info flex-row-between2col full-width flex-wrap'>
                        <div className='review-lists-card--cont margin-2px-V'>
                            <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.reviewer}: </span>{review.reviewer.name}
                        </div>
                        {review.reviewAt &&
                            <div className='review-lists-card--cont margin-2px-V'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.type}: </span>
                                <i className={`bi bi-box-seam ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-30px`} />
                            </div>
                        }
                        <div className='flex-row-between2col review-lists-card--rating-cont flex-wrap'>
                            <div className='review-lists-card--cont margin-2px-V font-bold flex-row-left-start'>
                                <span className='lists-card--info--disc--hide margin-2px-H font-bold'>{translate.rating}: </span>
                                <div className='flex-row-left-start flex-wrap'>
                                    <Rating name="rating" emptyIcon={<StarBorder className='gray' fontSize='inherit' />} style={{ color: '#FDCC0D' }} value={review.rate} precision={1} size={"small"} readOnly />
                                    <span className='size-12px gray font-bold margin-4px-H'>{review.rate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='review-lists-card--content full-width text-shadow shadow-5px margin-8px-V radius-15px size-14px'>
                        {review.comment}
                    </div>
                </div>
            </div>
        </>

    )
}

export default ReviewCard;