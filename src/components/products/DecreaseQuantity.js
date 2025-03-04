import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../apis/actions';
import Select from 'react-select';
import languages from '../../../src/components/global/languages';
import useInput from '../../hooks/useInput';
import './DecreaseQuantity.scss';

export const DecreaseQuantity = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.theme.mode);
    const productData = useSelector((state) => state.product.productData);
    const pieces = productData.pieces;
    const language = useSelector((state) => state.language.language);
    const translate = languages[language];
    const [newPieces, setNewPieces] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);


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
        } else if (value <= 0) {
            error = translate.pleaseEnterQuantityMoreThan0;
        }
        return { isValid, error };
    }, 0);


    const handleDecreasePiece = () => {
        if (selectedPiece && enteredQuantity > 0) {
            const existingPiece = newPieces.find((piece) => piece.value === selectedPiece.value);
            const updatedQuantity = Math.min(enteredQuantity, selectedPiece.quantity);
            const remainingQuantity = selectedPiece.quantity - updatedQuantity;

            if (existingPiece) {
                const updatedPiece = {
                    ...existingPiece,
                    decreasedQuantity: updatedQuantity,
                    quantity: remainingQuantity >= 0 ? remainingQuantity : 0,
                };
                setNewPieces((prevPieces) =>
                    prevPieces.map((piece) => (piece.value === updatedPiece.value ? updatedPiece : piece))
                );
            } else {
                const newPiece = {
                    value: selectedPiece.value,
                    decreasedQuantity: updatedQuantity,
                    quantity: remainingQuantity >= 0 ? remainingQuantity : 0,
                    size: selectedPiece.size,
                    color: {
                        title: selectedPiece.color.title,
                        hexCode: selectedPiece.color.hexCode,
                    },
                };
                setNewPieces((prevPieces) => [...prevPieces, newPiece]);
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedPieces = newPieces.map((piece) => ({
            pieceId: piece.value,
            decreasedQuantity: piece.decreasedQuantity,
        }));

        const product = {
            _id: productData._id,
            pieces: formattedPieces
        };

        dispatch(productActions.decreaseQuantity(product, () => {
            popupToggle(false);
            document.getElementById('dashboard-view').style.zIndex = 10;
            window.onscroll = function () { };
        }, translate.productQuantityDecreasedSuccessfully, translate.someThingWentWrongPleaseTry));
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="decrease-quantity">
            {productData && (
                <div className="flex-col-center inter">
                    <div className="full-width flex-col-left-start decrease-quantity--header">
                        <label className="pointer full-width text-shadow gray font-bold size-26px">
                            {translate.decreaseQuantity}
                        </label>
                    </div>
                    <label className="pointer full-width text-shadow gray font-bold size-14px">
                        {translate.before}
                    </label>
                    {pieces.map((piece, index) => (
                        <div key={index} className="product-details--piece white-bg flex-row-between radius-10px gray shadow-2px flex-wrap margin-6px-V">
                            <div className="flex-col-center">
                                <div className="full-width size-18px">
                                    {translate.size}: {piece.size}
                                </div>
                                <div className="full-width size-18px">
                                    {translate.color}: {piece.color.title}
                                </div>
                            </div>
                            <div className={`product-details--piece--quantity ${language === 'ar' ? 'ar' : 'en'} margin-12px-H`}>
                                <i className={`bi bi-bookmark-fill mint-green flex-col-top-start size-38px`}>
                                    <span style={{ position: 'absolute', fontStyle: 'normal' }} className={`size-22px pt-sans ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{piece.quantity}</span>
                                </i>
                            </div>
                        </div>
                    ))}
                    <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="piece">
                        {translate.selectPiece}: <span className="red">*</span>
                    </label>
                    <div className="decrease-quantity--input radius-10px">
                        <Select
                            value={selectedPiece}
                            placeholder={translate.selectPiece}
                            onChange={setSelectedPiece}
                            options={pieces.map((piece) => ({
                                value: piece._id,
                                label: translate.size + ' ' + piece.size + ' - ' + translate.color + ' ' + piece.color.title + ' - ' + translate.available + ' ' + piece.quantity,
                                quantity: piece.quantity,
                                size: piece.size,
                                color: {
                                    title: piece.color.title,
                                    hexCode: piece.color.hexCode
                                }
                            }))}
                        />
                    </div>
                    <label className="pointer full-width text-shadow gray font-bold margin-6px-V" htmlFor="quantity">
                        {translate.quantity}: <span className="red">*</span>
                    </label>
                    <div className="decrease-quantity--input white-bg radius-10px">
                        <input
                            className="margin-12px-H gray decrease-quantity--input radius-10px"
                            min="0"
                            type="number"
                            id="Quantity"
                            value={enteredQuantity}
                            onChange={quantityChangedHandler}
                            onBlur={quantityBlurHandler}
                        />
                    </div>
                    {quantityIsTouched && <div className="error-message">{quantityError}</div>}
                    <label className="pointer full-width text-shadow gray font-bold size-14px">
                        {translate.after}
                    </label>
                    {newPieces.map((piece, index) => (
                        <div key={index} className="product-details--piece white-bg flex-row-between radius-10px gray shadow-2px flex-wrap margin-6px-V">
                            <div className="flex-col-center">
                                <div className="full-width size-18px">
                                    {translate.size}: {piece.size}
                                </div>
                                <div className="full-width size-18px">
                                    {translate.color}: {piece.color.title}
                                </div>
                            </div>
                            <div className={`product-details--piece--quantity ${language === 'ar' ? 'ar' : 'en'} margin-12px-H`}>
                                <i className={`bi bi-bookmark-fill mint-green flex-col-top-start size-38px`}>
                                    <span style={{ position: 'absolute', fontStyle: 'normal' }} className={`size-22px pt-sans ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{piece.quantity > 0 ? piece.quantity : 0}</span>
                                </i>
                            </div>
                        </div>
                    ))}

                    <input type='button' className={`profile--input--container margin-6px-V full-width shadow-5px font-bold ${mode === 'dark-mode' ? 'gray' : 'white'} radius-15px mint-green-bg size-20px pointer`}
                        onClick={() => handleDecreasePiece()}
                        value={translate.addAction} />

                    <div className="decrease-quantity--actions flex-row-between full-width">
                        <button
                            className={`decrease-quantity--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'
                                } text-shadow size-18px font-bold mint-green-bg`}
                            type="submit"
                        >
                            {translate.confirm}
                        </button>
                        <button
                            className="decrease-quantity--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                            onClick={() => {
                                popupToggle(false);
                                document.getElementById('dashboard-view').style.zIndex = 10;
                                window.onscroll = function () { };
                            }}
                        >
                            {translate.cancel}
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default DecreaseQuantity;
