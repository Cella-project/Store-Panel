import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../apis/actions';
import languages from '../global/languages';
import useInput from '../../hooks/useInput';
import './RefillProductForm.scss'
import Select from 'react-select';

export const RefillProductForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector((state) => state.language.language);
    const translate = languages[language];
    const productData = useSelector((state) => state.product.productData);
    const sizes = productData.sizes;
    const colors = productData.colors;

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
            error = translate.pleaseEnterQuantity;
        }
        else if (value <= 0) {
            error = translate.pleaseEnterQuantityMoreThan0;
        }
        return { isValid, error };
    }, 0);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [pieces, setPieces] = useState([]);

    const handleAddPiece = () => {
        // Check if size and color are not null
        if (selectedSize && selectedColor) {
            // Check if a piece with the same color and size already exists
            const existingPiece = pieces.find(
                (piece) =>
                    piece.color?.title === selectedColor.label &&
                    piece.size?.title === selectedSize.title
            );

            if (existingPiece) {
                // If a piece with the same color and size exists, update its quantity
                existingPiece.quantity += parseInt(enteredQuantity);
                setPieces([...pieces]); // Update the state with the modified array
            } else {
                // Otherwise, add a new piece to the array
                const newPiece = {
                    quantity: parseInt(enteredQuantity),
                    color: { title: selectedColor.label, hexCode: selectedColor.hexCode },
                    size: selectedSize,
                };
                setPieces((prevPieces) => [...prevPieces, newPiece]);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const product = {
            _id: productData._id,
            pieces: pieces,
        };
        dispatch(productActions.refillProductQuantity(product, () => {
            popupToggle(false);
            document.getElementById("dashboard-view").style.zIndex = 10;
            window.onscroll = function () { };
        }, translate.productQuantityAddedSuccessfully, translate.someThingWentWrongPleaseTry));

    }


    return (
        <div className='refill-product full-width flex-row-center inter'>
            {
                productData &&
                <form onSubmit={handleSubmit} noValidate className='flex-col-center full-width'>
                    <div>
                        <div className='full-width flex-col-left-start refill-product--header'>
                            <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.refillProduct}</label>
                        </div>
                        <div>
                            <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="quantity">
                                Quantity : <span className="red">*</span>
                            </label>
                            <div className='refill-product--input radius-10px'>
                                <input
                                    className="pointer margin-12px-H gray refill-product--input radius-10px"
                                    min="0"
                                    type="number"
                                    id="Quantity"
                                    value={enteredQuantity}
                                    onChange={quantityChangedHandler}
                                    onBlur={quantityBlurHandler}
                                />
                            </div>
                            {quantityIsTouched && <div className="error-message">{quantityError}</div>}
                        </div>
                        {colors && colors.length > 0 && (
                            <div className='full-width flex-col-left-start refill-product--input-container'>
                                <label className='pointer full-width flex-row-between text-shadow gray font-bold margin-6px-H' htmlFor='color'>
                                    {translate.colors} :
                                </label>
                                <Select
                                    className="add-product--select full-width gray margin-4px-H"
                                    styles={{
                                        option: (provided, state) => ({
                                            ...provided,
                                            cursor: 'pointer',
                                            ':hover': { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` },
                                            backgroundColor: state.isFocused || state.isSelected ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit',
                                        }),
                                        menu: (provided) => ({ ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}` }),
                                    }}
                                    isDisabled={colors.length === 0}
                                    placeholder="Select Color"
                                    options={colors.map((color) => ({
                                        label: color.title,
                                        value: color.title,
                                        hexCode: color.hexCode,
                                    }))}
                                    onChange={(color) => setSelectedColor(color)}
                                />
                            </div>
                        )}
                        {sizes && sizes.length > 0 && (
                            <div className="full-width flex-col-left-start refill-product--input-container">
                                <label className="pointer full-width flex-row-between text-shadow gray font-bold margin-6px-V" htmlFor="size">
                                    {translate.sizes} :
                                </label>
                                <Select
                                    className="add-product--select full-width gray margin-4px-H"
                                    styles={{
                                        option: (provided, state) => ({
                                            ...provided,
                                            cursor: 'pointer',
                                            ':hover': { backgroundColor: `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` },
                                            backgroundColor: state.isFocused || state.isSelected ? `${mode === 'dark-mode' ? '#d14e0d' : '#7FBCD2'}` : 'inherit',
                                        }),
                                        menu: (provided) => ({ ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}` }),
                                    }}
                                    isDisabled={sizes.length === 0}
                                    placeholder="Select Size"
                                    options={sizes.map((size) => ({
                                        label: size.title,
                                        value: size.title,
                                    }))}
                                    onChange={(size) => setSelectedSize(size.value)}
                                />
                            </div>
                        )}
                        <input type='button' className={`profile--input--container margin-6px-V full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg size-20px pointer`}
                            onClick={() => handleAddPiece()}
                            value="Add" />
                        {pieces.map((piece, index) => (
                            <div key={index} className="product-details--piece flex-row-center flex-wrap">
                                <div className="flex-row-center mint-green-bg shadow-2px white product-details--piece--size font-bold size-20px">
                                    {piece.size}
                                </div>
                                <div className="white-bg font-bold gray shadow-5px product-details--piece--info flex-row-between">
                                    Available: {piece.quantity}
                                </div>
                                <div style={{ backgroundColor: piece.color.hexCode }} className="shadow-5px product-details--piece--color shadow-2px flex-row-between" />
                            </div>
                        ))}
                        <div className="refill-product--actions flex-row-between full-width">
                            <button
                                className={`refill-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                                type="submit"
                            >
                                {translate.confirm}
                            </button>
                            <button
                                className="refill-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                onClick={() => {
                                    popupToggle(false);
                                    document.getElementById("dashboard-view").style.zIndex = 10;
                                    window.onscroll = function () { };
                                }} >
                                {translate.cancel}
                            </button>
                        </div>

                    </div>

                </form>
            }



        </div >
    );
}


export default RefillProductForm
