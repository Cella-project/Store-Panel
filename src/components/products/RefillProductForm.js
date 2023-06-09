import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../apis/actions';

import useInput from '../../hooks/useInput';
import './RefillProductForm.scss'
export const RefillProductForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);
    const productData = useSelector((state) => state.product.productData);


    const {
        value: enteredQuantity,
        error: quantityError,
        isTouched: quantityIsTouched,
        valueChangeHandler: quantityChangedHandler,
        inputBlurHandler: quantityBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = 'Please enter a quantity.';
        }
        else if (value <= 0) {
            error = 'Please enter a quantity greater than 0.';
        }
        return { isValid, error };
    }, 0);

    // Handle Color Select
    const [selectedColors, setSelectedColors] = useState(productData.colors.map((color) => ({
        ...color,
        quantity: 0
      }))
    );
    const [selectedSizes, setSelectedSizes] = useState(productData.sizes.map((size) => ({
        ...size,
        quantity: 0
    }))
    );

    const handleColorQuantityChange = (index, event) => {
        const newSelectedColors = [...selectedColors];
        newSelectedColors[index].quantity = parseInt(event.target.value);
        setSelectedColors(newSelectedColors);
    };

    const totalColorQuantity = selectedColors.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
    const remainingQuantitiesOfColors = enteredQuantity - totalColorQuantity;

    // Handle Size Select

    const totalSizeQuantity = selectedSizes.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
    const remainingQuantitiesOfSizes = enteredQuantity - totalSizeQuantity;

    const handleSizeQuantityChange = (index, event) => {
        const newSelectedSizes = [...selectedSizes];
        newSelectedSizes[index].quantity = parseInt(event.target.value);
        setSelectedSizes(newSelectedSizes);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const product = {
            _id: productData._id,
            quantity: parseInt(enteredQuantity),
            colors: selectedColors.map(item => ({
                _id: item._id,
                quantity: parseInt(item.quantity)
            })),
            sizes: selectedSizes.map(item => ({
                _id: item._id,
                quantity: parseInt(item.quantity)
            })),
        };
        dispatch(productActions.refillProductQuantity(product, () => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
        }));

    }


    return (
        <div className='refill-product flex-row-center inter'>
            {
                productData &&
                <form onSubmit={handleSubmit} noValidate className=' flex-col-center'>
                    <div>
                        <div className='full-width flex-col-left-start refill-product--header'>
                            <label className='pointer full-width text-shadow gray font-bold size-26px'>Refill Product</label>
                        </div>
                        <div>
                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="quantity">Quantity : <span className='red'>*</span></label>
                            <input className="pointer margin-12px-H gray refill-product--input radius-10px" min='0' type="number" id="Quantity" value={enteredQuantity} onChange={quantityChangedHandler} onBlur={quantityBlurHandler} />
                            {quantityIsTouched && (<div className="error-message">{quantityError}</div>)}
                        </div>
                        {productData.colors && productData.colors.length > 0 && (
                            <div className='full-width flex-col-left-start refill-product--input-container'>
                                <label className='pointer full-width flex-row-between text-shadow gray font-bold margin-6px-H' htmlFor='color'>
                                    Colors :
                                    {

                                        remainingQuantitiesOfColors !== 0 && (remainingQuantitiesOfColors >= 0 ? (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} orange-bg radius-10px padding-6px-H`}>Remaining {remainingQuantitiesOfColors}</span>) : (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} red-bg radius-10px padding-6px-H`}>{remainingQuantitiesOfColors}</span>))
                                    }
                                </label>

                                <div className="flex-row-between flex-wrap ">
                                    {selectedColors.map((color, index) => (
                                        <div key={index} style={{ background: color.hexCode }} className="refill-product--selected-item shadow-2px radius-10px flex-row-between size-14px white">
                                            <span className={`margin-4px-H ${(mode === 'dark-mode') ? 'gray' : 'white'}`}>{color.color}:</span>
                                            <input className='refill-product--input--number shadow-2px radius-10px gray' type="number" min="1" max="999" value={color.quantity} onChange={(event) => handleColorQuantityChange(index, event)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='full-width flex-col-left-start refill-product--input-container'>
                            <label className='pointer full-width flex-row-between text-shadow gray font-bold margin-6px-V' htmlFor='size'>
                                Sizes :
                                {
                                    remainingQuantitiesOfSizes !== 0 && (remainingQuantitiesOfSizes >= 0 ? (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} orange-bg radius-10px padding-6px-H`}>Remaining {remainingQuantitiesOfSizes}</span>) : (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} red-bg radius-10px padding-6px-H`}>{remainingQuantitiesOfSizes}</span>))
                                }
                            </label>

                            <div className="flex-row-between flex-wrap ">
                                {selectedSizes.map((size, index) => (
                                    <div key={index} className="refill-product--selected-item shadow-2px radius-10px flex-row-between size-14px white-bg gray">
                                        <span className='margin-4px-H '>{size.size}:</span>
                                        <input className='refill-product--input--number shadow-2px radius-10px gray' type="number" min="1" max="999" value={size.quantity} onChange={(event) => handleSizeQuantityChange(index, event)} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="refill-product--actions flex-row-between full-width">
                            <button
                                className={`refill-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold orange-bg`}
                                type="submit"
                            >
                                Confirm
                            </button>
                            <button
                                className="refill-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                onClick={() => {
                                    popupToggle(false);
                                    document.getElementById("dashboard-view").style.zIndex = 10;
                                    window.onscroll = function () { };
                                }} >
                                Cancel
                            </button>
                        </div>

                    </div>

                </form>
            }



        </div >
    );
}


export default RefillProductForm
