import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import StarBorder from '@material-ui/icons/StarBorder';
import defaultProductPhoto from '../../assets/images/productDefault.png';
import { useSelector } from 'react-redux';
import languages from '../global/languages';
import './ProductCard.scss';

const ProductCard = ({ productCard, width = 'width-90-100', price, size, quantity, color }) => {
    // check if product has discount
    const hasDiscount = productCard?.discount?.hasDiscount;

    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    // calculate the discounted price
    let newPrice = price ? price : productCard.price;
    let oldPrice = '';
    if (hasDiscount) {
        const discountType = productCard.discount.discountType;
        const discountAmount = productCard.discount.discountAmount;
        if (discountType === 'Percentage') {
            newPrice = productCard.price * (100 - discountAmount) / 100;
        } else if (discountType === 'Value') {
            newPrice = productCard.price - discountAmount;
        }
        oldPrice = productCard.price;
    }
    // format the prices to display correctly
    const formattedNewPrice = price ? price : newPrice.toFixed(2);
    const formattedOldPrice = oldPrice && typeof (oldPrice) === 'number' ? oldPrice.toFixed(2) : '';

    return (
        <div className={`product-card ${width} shadow-5px inter radius-15px white-bg flex-row-top-between2col pointer`} >
            <Link to={`/store-panel/products/${productCard._id}`} className='lists-card--link pointer full-width flex-row-left-start2col flex-wrap'>
                <div className='flex-col-top-start'>
                    <div className='product-card--img flex-row-center'>
                        {productCard.img ? (
                            <img src={productCard.img !== 'No Image' ? productCard.img : defaultProductPhoto} alt='product-pic' />
                        ) : (
                            <>
                                <img src={productCard.album.length > 0 ? productCard.album[0].URL : defaultProductPhoto} alt='product-pic' />
                                <div className={`product-card--status${language === 'ar' ? '-arabic' : ''} ${(productCard.status === 'Active' && productCard.avilableQuantity > 0)? 'green-bg' : ((productCard.status === 'Active' && productCard.avilableQuantity === 0)? 'yellow-bg' : 'red-bg')} shadow-5px radius-circular`}></div>
                            </>
                        )}
                    </div>
                    {
                        productCard.rating != null &&
                        <div className='flex-row-center full-width margin-6px-V'>
                            <Rating name="rating" emptyIcon={<StarBorder className='gray' fontSize='inherit' />} style={{ color: '#FDCC0D' }} value={productCard.rating} size={"medium"} precision={1} readOnly />
                            <span className='size-14px gray font-bold margin-4px-H'>{productCard.rating}</span>
                        </div>
                    }
                </div>
                <div className='product-card--details flex-col-left-start'>
                    <div className={`product-card--type full-width ${mode === 'dark-mode' ? 'gray' : 'mint-green'} flex-row-left-start size-20px font-bold flex-wrap`}>
                        {productCard.title.toUpperCase()}
                    </div>
                    <div className='product-card--cont full-width flex-col-left-start gray size-14px font-bold margin-12px-V'>
                        {
                            productCard.store &&
                            <div className='product-card--store'>
                                {productCard.store.storeName}
                            </div>
                        }
                        <div className='product-card--specialty margin-2px-V'>
                            {productCard.subCategory && typeof productCard.subCategory === 'object' ?
                                productCard.subCategory.title :
                                productCard.subCategory
                            }
                        </div>


                        {(productCard.avilableQuantity || quantity) &&
                            <span className="gray size-14px margin-2px-V">{translate.quantity}:
                                <span className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-6px-H`}>{quantity || productCard.avilableQuantity}</span>
                            </span>
                        }
                        <span className="gray size-14px margin-2px-V">{translate.material}:
                            <span className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-6px-H`}>{productCard.material}</span>
                        </span>
                        {
                            size &&
                            <span className="gray size-14px margin-2px-V">{translate.size}:
                                <span className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-6px-H`}>{size}</span>
                            </span>
                        }
                        {
                            color &&
                            <span className="gray size-14px margin-2px-V">{translate.color}:
                                <span className="mint-green size-14px margin-6px-H">{color}</span>
                            </span>
                        }
                    </div>
                    <div className='product-card--price full-width flex-row-right-start'>
                        {hasDiscount && (
                            <div className='gray'>
                                <s>
                                    <span className='product-card--old-price size-14px font-bold'>{Math.trunc(formattedOldPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                    <span className='size-8px'>.{formattedOldPrice.slice(-2)}</span>
                                </s>
                            </div>
                        )}
                        <div className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} margin-2px-V`}>
                            <span className='product-card--new-price size-34px font-bold'>{Math.trunc(formattedNewPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                            <span className='size-12px'>.{formattedNewPrice.slice(-2)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>

    )
}

export default ProductCard;