import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productActions } from '../../../apis/actions';

import languages from '../../../components/global/languages';
import useInput from '../../../hooks/useInput';

import './EditProduct.scss'
export const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector((state) => state.language.language);
    const translate = languages[language];
    const productData = useSelector((state) => state.product.productData);
    const materials = useSelector(state => state.specialityControl.materials);
    const product = useSelector((state) => state.product.products.find((p) => p._id === params.id));
    const [currentPage, setCurrentPage] = useState(1);
    const storeData = useSelector(state => state.auth.userData);

    useEffect(() => {
        document.title = 'Edit product • Store Panel';
        dispatch(productActions.getProducts(storeData._id));
    }, [dispatch, storeData._id]);


    // useEffect(() => {
    //     if (category === null) {
    //         dispatch(specialityActions.getCategoryData(product.category._id));
    //         dispatch(specialityMutations.setCategoryData(product.category._id));
    //     }
    //     else if (category.type === 'Sub') {
    //         dispatch(specialityActions.getCategoryData(category.parent._id));
    //         dispatch(specialityMutations.setCategoryData(category.parent._id));
    //     }
    //     else if (category.type === 'Main') {
    //         dispatch(specialityActions.getspecialityData(category.parent._id));
    //         dispatch(specialityMutations.setspecialityData(category.parent._id));
    //         dispatch(specialityControlActions.getColors(category.parent._id));
    //     }

    // }, [dispatch, category, product.category._id]);


    const {
        value: enteredTitle,
        error: titleError,
        isTouched: titleIsTouched,
        valueChangeHandler: titleChangedHandler,
        inputBlurHandler: titleBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '';
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterTitle;
        }
        else if (value.length < 3 || value.length > 50) {
            error = translate.pleaseEnterTitle3_50;
        }
        return { isValid, error };
    }, product.title);

    const {
        value: enteredDescription,
        error: descriptionError,
        isTouched: descriptionIsTouched,
        valueChangeHandler: descriptionChangedHandler,
        inputBlurHandler: descriptionBlurHandler,
    } = useInput((value) => {
        const isValid = value.trim() !== '';
        let error = '';
        if (value.trim() === '') {
            error = translate.pleaseEnterDescription;
        }
        return { isValid, error };
    }, product.description);


    const {
        value: enteredMaterial,
        error: materialError,
        isTouched: materialIsTouched,
        valueChangeHandler: materialChangedHandler,
        inputBlurHandler: materialBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = translate.pleaseEnterMaterial;
        }
        return { isValid, error };
    }, product.material);

    const {
        value: enteredPrice,
        error: priceError,
        isTouched: priceIsTouched,
        valueChangeHandler: priceChangedHandler,
        inputBlurHandler: priceBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = translate.pleaseEnterPrice;
        }
        else if (value <= 0) {
            error = translate.pleaseEnterPriceMoreThan0;
        }
        return { isValid, error };
    }, product.price);


    const handlePhotoAdd = (event) => {
        const album = {}
        const data = new FormData();
        data.append('path', 'products');
        data.append('file', event.target.files[0]);
        dispatch(productActions.addProductPicture(data, (response) => {
            const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
            album.imgURL = url;
            dispatch(productActions.addProductImage({ _id: product._id, imgURL: album.imgURL }));
        }));
    };

    // const handlePhotoIndexChange = (oldIndex, newIndex) => {
    //     const newPhotos = [...photos];
    //     [newPhotos[oldIndex], newPhotos[newIndex]] = [newPhotos[newIndex], newPhotos[oldIndex]];
    //     setPhotos(newPhotos);
    // };

    const handlePhotoRemove = (_id) => {
        dispatch(productActions.deleteProductImage({ _id: product._id, imgId: _id }));
    };


    // Handle Price Change
    const [discountType, setDiscountType] = useState(product.discount.discountType);
    const [discountValue, setDiscountValue] = useState(product.discount.discountAmount);

    const handleDiscountTypeChange = (event) => {
        setDiscountType(event.target.value);
    };

    const handleDiscountValueChange = (event) => {
        setDiscountValue(parseFloat(event.target.value));
    };

    const calculateNewPrice = () => {
        if (discountType === 'Percentage') {
            return enteredPrice - (enteredPrice * (discountValue / 100));
        } else if (discountType === 'Value') {
            return enteredPrice - discountValue;
        } else {
            return enteredPrice;
        }
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        const editedProduct = {
            _id: product._id,
            title: enteredTitle,
            description: enteredDescription,
            price: parseInt(enteredPrice),
            // material: enteredMaterial.title,
        };
        if (discountType !== 'None') {
            editedProduct.discount = {
                hasDiscount: true,
                discountType: discountType,
                discountAmount: discountValue
            };
        }

        dispatch(productActions.updateProduct(editedProduct,
            () => {
                navigate(`/products/${product._id}`);
            }));
    };



    return (
        <div className='edit-product flex-row-center inter'>
            {
                productData &&
                <form onSubmit={handleSubmit} noValidate className=' flex-col-center'>
                    <div className="full-width flex-row-center margin-12px-V">
                        <p
                            style={{ margin: '30px' }}
                            className="size-26px font-bold inter gray">{translate.editProduct}
                        </p>
                    </div>

                    <div className="edit-product--body white-bg full-width radius-10px shadow-2px">
                        <div className="edit-product--muiBox-root radius-10px shadow-2px">
                            <div className='edit-product--muiBox-root--main mint-green-bg radius-10px'>
                                <div className='flex-row-between edit-product--muiBox-root--main--title'>
                                    <div className='flex-col-center  padding-10px-H'>
                                        <div>
                                            <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 1 ? "-fill" : ""} white`}></i>
                                        </div>
                                        <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                            1. {translate.productInformation}
                                        </div>
                                    </div>
                                    <div className='flex-col-center  padding-10px-H'>
                                        <div>
                                            <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 2 ? "-fill" : ""} white`}></i>
                                        </div>
                                        <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                            2. {translate.productAlbum}
                                        </div>
                                    </div>
                                    <div className='flex-col-center  padding-10px-H'>
                                        <div>
                                            <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 3 ? "-fill" : ""} white`}></i>
                                        </div>
                                        <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                            3. {translate.productPricing}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {currentPage === 1 &&
                            <div>
                                <div className='full-width flex-col-left-start edit-product--header'>
                                    <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.productInformation}</label>
                                </div>
                                <div className='full-width flex-col-left-start edit-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.productTitle} <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-left-start edit-product--input `}>
                                        <i className='bi bi-person size-20px gray' />
                                        <input
                                            className='full-width gray margin-4px-H'
                                            type={'text'}
                                            placeholder={translate.productTitle}
                                            id={'title'}
                                            value={enteredTitle}
                                            onChange={titleChangedHandler}
                                            onBlur={titleBlurHandler}
                                            autoFocus
                                        />
                                    </div>
                                    {titleIsTouched && (<div className="error-message">{titleError}</div>)}
                                </div>
                                <div className='full-width flex-col-left-start edit-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.productDescription} <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-left-start edit-product--input`}>
                                        <textarea
                                            className='full-width gray margin-4px-H'
                                            type={'text'}
                                            placeholder={translate.productDescription}
                                            id={'description'}
                                            value={enteredDescription}
                                            onChange={descriptionChangedHandler}
                                            onBlur={descriptionBlurHandler}
                                            style={{ resize: 'none' }}
                                        />
                                    </div>
                                    {descriptionIsTouched && (<div className="error-message">{descriptionError}</div>)}
                                </div>
                                {
                                    materials && materials.length > 0 && (
                                        <div className='full-width flex-col-left-start edit-product--input-container'>
                                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='material'>
                                                {translate.material} :<span className='red'>*</span>
                                            </label>
                                            <div className={`full-width light-gray radius-10px white-bg flex-row-left-start edit-product--input `}>
                                                <i className='bi bi-pin-map size-20px gray' />
                                                <Select
                                                    className='edit-product--select full-width gray margin-4px-H'
                                                    styles={{
                                                        option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                        menu: (provided) => ({
                                                            ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                                        }),
                                                    }}
                                                    value={enteredMaterial}
                                                    disabled={materials.length === 0}
                                                    placeholder={translate.selectMaterial}
                                                    options={materials.map(m => ({ label: m.title, value: { label: m.title, title: m.title, id: m._id } }))}
                                                    onChange={(subCategory) =>
                                                        materialChangedHandler({ target: { id: "subCategory", label: subCategory.title, value: subCategory.value } })
                                                    }
                                                    onBlur={materialBlurHandler}
                                                />
                                            </div>
                                            {materialIsTouched && (<div className="error-message">{materialError}</div>)}
                                        </div>
                                    )
                                }

                                <div className="edit-product--actions flex-row-between full-width">
                                    <button
                                        className="edit-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                        onClick={() => {
                                            navigate('/products');
                                        }}
                                    >
                                        {translate.cancel}
                                    </button>
                                    <button
                                        className={`edit-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                                        onClick={() => {
                                            setCurrentPage(2);
                                        }}
                                    >
                                        {translate.next}
                                    </button>
                                </div>
                            </div>
                        }
                        {currentPage === 2 && <div>
                            <div className='full-width flex-col-left-start edit-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.productAlbum}</label>
                            </div>
                            <div className='full-width flex-col-left-start edit-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.productImages} : <span className='red'>*</span></label>
                            </div>
                            <div className="edit-product--photo flex-col-center">
                                <div className="flex-row-center flex-wrap">
                                    {productData.album.map((photo, index) => (
                                        <div className="edit-product--photo--item padding-10px-H flex-col-center " key={index}>
                                            <div className={`inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} margin-6px-V`}> {translate.photoNumber} : {index + 1}</div>
                                            <img src={photo.URL} alt={` ${index}`} />
                                            <div className="flex-row-center full-width margin-6px-V ">
                                                {/* <button
                                                    type="button"
                                                    className={`edit-product--gallary-left ${mode === 'dark-mode' ? 'gray-bg' : 'mint-green-bg'} radius-circular pointer white`}
                                                    onClick={() => handlePhotoIndexChange(index, index - 1)}
                                                    disabled={index === 0}
                                                >
                                                    <i className="bi bi-caret-left-fill flex-row-right-start"></i>
                                                </button> */}
                                                <button className='edit-product--gallary ' type="button" onClick={() => handlePhotoRemove(photo._id)}>
                                                    <i className="bi bi-trash pointer size-20px gray"></i>
                                                </button>
                                                {/* <button
                                                    type="button"
                                                    className={`edit-product--gallary-right ${mode === 'dark-mode' ? 'gray-bg' : 'mint-green-bg'} radius-circular pointer white`}
                                                    onClick={() => handlePhotoIndexChange(index, index + 1)}
                                                    disabled={index === photos.length - 1}
                                                >
                                                    <i className="bi bi-caret-right-fill flex-row-right-start"></i>
                                                </button> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-row-center full-width">
                                    <label htmlFor="photos" className={`edit-product--actions--button radius-10px mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                        {translate.addPhoto}
                                    </label>
                                    <input type="file" id="photos" onChange={handlePhotoAdd} hidden />
                                </div>
                            </div>

                            <div className="edit-product--actions flex-row-between full-width">
                                <button
                                    className="edit-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        setCurrentPage(1);
                                    }}
                                >
                                    {translate.back}
                                </button>
                                <button
                                    className={`edit-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                                    onClick={() => {
                                        setCurrentPage(3);
                                    }}
                                >
                                    {translate.next}
                                </button>
                            </div>
                        </div>}

                        {currentPage === 3 &&
                            <div>
                                <div className='full-width flex-col-left-start edit-product--header'>
                                    <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.productPricing}</label>
                                </div>
                                <div className="edit-product--price full-width flex-col-center edit-product--input-container">
                                    <div>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="price">{translate.price}:<span className='red'>*</span></label>
                                        <input className="pointer margin-12px-H gray edit-product--input radius-10px" min='0' type="number" id="price" value={enteredPrice} onChange={priceChangedHandler} onBlur={priceBlurHandler} />
                                    </div>
                                    {priceIsTouched && (<div className="error-message">{priceError}</div>)}
                                    <div className='full-width edit-product--price--discount'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.discount}:<span className='red'>*</span></label>
                                        <div className='margin-6px-V'>
                                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
                                                <input className="pointer margin-12px-H" type="radio" name="discount-type" value="None" checked={discountType === 'None'} onChange={handleDiscountTypeChange} />
                                                {translate.noDiscount}
                                            </label>
                                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
                                                <input className="pointer margin-12px-H" type="radio" name="discount-type" value="Percentage" checked={discountType === 'Percentage'} onChange={handleDiscountTypeChange} />
                                                {translate.percentage}
                                            </label>
                                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>
                                                <input className="pointer margin-12px-H" type="radio" name="discount-type" value="Value" checked={discountType === 'Value'} onChange={handleDiscountTypeChange} />
                                                {translate.value}
                                            </label>
                                        </div>
                                        {discountType !== 'None' && (
                                            <div className='full-width'>
                                                <div className='margin-6px-V flex-row-center  full-width'>
                                                    <label className='pointer text-shadow gray font-bold margin-6px-H' htmlFor="discount-value">{discountType === 'Percentage' ? translate.percentage : translate.value}:</label>
                                                    <input className='gray edit-product--input radius-10px' min='0' type="number" id="discount-value" value={discountValue} onChange={handleDiscountValueChange} />
                                                </div>
                                                <div className='flex-row-center'>
                                                    <label className='text-shadow gray font-bold margin-6px-H'>{translate.newPrice}:</label>
                                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} font-bold size-26px`}>{calculateNewPrice()}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="edit-product--actions flex-row-between full-width">
                                    <button
                                        className="edit-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                        onClick={() => {
                                            setCurrentPage(2);
                                        }}
                                    >
                                        {translate.back}
                                    </button>
                                    <button
                                        className={`edit-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                                        type="submit"
                                    >
                                        {translate.confirm}
                                    </button>
                                </div>
                            </div>}
                    </div>

                </form>
            }



        </div >
    );
}

export default EditProduct
