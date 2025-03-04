import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productActions, specialityControlActions, subCategoryActions } from '../../../apis/actions';

import languages from '../../../components/global/languages';
import useInput from '../../../hooks/useInput';
import { subCategoryMutations } from '../../../redux/mutations';

import './EditProduct.scss';

export const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector((state) => state.language.language);
    const translate = languages[language];
    const productData = useSelector((state) => state.product.productData);
    const materials = useSelector(state => state.specialityControl.materials);
    const [currentPage, setCurrentPage] = useState(1);
    const subCategories = useSelector((state) => state.subCategory.subCategories);
    const [model, setModel] = useState(null);

    useEffect(() => {
        document.title = 'Edit product • Store Panel';
        dispatch(productActions.getProductData(params.id));
        dispatch(subCategoryMutations.setSubCategories(null));
        dispatch(subCategoryActions.getSubCategories(productData.mainCategory._id));
        dispatch(specialityControlActions.getMaterials(productData.speciality._id));
    }, [dispatch, params.id, productData.mainCategory._id, productData.speciality._id]);

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
    }, productData.title);

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
    }, productData.description);


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
    }, productData.material);

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
    }, productData.price);

    const {
        value: enteredSubCategory,
        error: subCategoryError,
        isTouched: subCategoryIsTouched,
        valueChangeHandler: subCategoryChangedHandler,
        inputBlurHandler: subCategoryBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = translate.pleaseEnterMainCategory;
        }
        return { isValid, error };
    }, productData.subCategory.title);

    const handlePhotoAdd = (event) => {
        const album = {}
        const data = new FormData();
        data.append('path', 'products');
        data.append('file', event.target.files[0]);
        dispatch(productActions.addProductPicture(data, (response) => {
            const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
            album.imgURL = url;
            dispatch(productActions.addProductImage({ _id: productData._id, imgURL: album.imgURL }));
        }, translate.productImageAddedSuccessfully, translate.someThingWentWrongPleaseTry));
    };

    const handlePhotoRemove = (_id) => {
        dispatch(productActions.deleteProductImage({ _id: productData._id, imgId: _id }, translate.areYouShowDeleteProductImage, translate.someThingWentWrongPleaseTry));
    };

    const upload3DModelToServer = async (e) => {
        const data = new FormData();
        data.append('path', '3DModels');
        data.append('file', e.target.files[0]);
        dispatch(productActions.addProduct3DModel(data, (response) => {
            const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
            setModel(url);
        }));
    }

    // Handle Price Change
    const [discountType, setDiscountType] = useState(productData.discount.discountType);
    const [discountValue, setDiscountValue] = useState(productData.discount.discountAmount);

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

        const updatedProduct = {
            _id: productData._id,
        }

        if (enteredTitle !== productData.title) {
            updatedProduct.title = enteredTitle;
        }

        if (enteredDescription !== productData.description) {
            updatedProduct.description = enteredDescription;
        }

        if (parseFloat(enteredPrice) !== productData.price) {
            updatedProduct.price = parseFloat(enteredPrice);
        }

        if (enteredMaterial.title !== productData.material && enteredMaterial.title !== '') {
            updatedProduct.material = enteredMaterial.title;
        }

        if (model) {
            updatedProduct.model3D = model;
        }

        if (enteredSubCategory.title !== productData.subCategory.title && enteredSubCategory.title !== '') {
            updatedProduct.subCategory = {
                _id: enteredSubCategory.id,
                title: enteredSubCategory.title,
            };
        }

        const editedProduct = { ...updatedProduct };

        if (discountType !== 'None') {
            editedProduct.discount = {
                hasDiscount: true,
                discountType: discountType,
                discountAmount: discountValue
            };
        }

        dispatch(productActions.updateProduct(editedProduct,
            () => {
                navigate(`/store-panel/products/${productData._id}`);
            }, translate.productUpdatedSuccessfully, translate.someThingWentWrongPleaseTry));
    };

    return (
        <div className='edit-product flex-row-center inter'>
            {
                productData &&
                <form onSubmit={handleSubmit} noValidate className='flex-col-center full-width'>
                    <div className="full-width flex-row-center margin-12px-V">
                        <p
                            style={{ margin: '30px' }}
                            className="size-26px font-bold inter gray">{translate.editProduct}
                        </p>
                    </div>

                    <div className="edit-product--body white-bg full-width radius-10px shadow-2px">
                        <div className="edit-product--muiBox-root radius-10px shadow-2px">
                            <div className='edit-product--muiBox-root--main mint-green-bg radius-10px flex-row-between'>
                                <div className='flex-col-center padding-10px-H'>
                                    <div>
                                        <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 1 ? "-fill" : ""} white`}></i>
                                    </div>
                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                        1. {translate.productInformation}
                                    </div>
                                </div>
                                <div className='flex-col-center padding-10px-H'>
                                    <div>
                                        <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 2 ? "-fill" : ""} white`}></i>
                                    </div>
                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                        2. {translate.productAlbum}
                                    </div>
                                </div>
                                <div className='flex-col-center padding-10px-H'>
                                    <div>
                                        <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 3 ? "-fill" : ""} white`}></i>
                                    </div>
                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                        3. {translate.productPricing}
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
                                    <p style={{ marginLeft: '0 5px 0 5px', visibility: titleError && titleIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                                        <i className="bi bi-exclamation-triangle-fill red"></i> {titleError}
                                    </p>
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
                                    <p style={{ marginLeft: '0 5px 0 5px', visibility: descriptionError && descriptionIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                                        <i className="bi bi-exclamation-triangle-fill red"></i> {descriptionError}
                                    </p>
                                </div>
                                {subCategories && subCategories.length > 0 && (
                                    <div className='full-width flex-col-left-start add-product--input-container'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='SubCategory'>{translate.subCategory} <span className='red'>*</span></label>
                                        <div className={`full-width light-gray radius-10px white-bg flex-row-top-start add-product--input `}>
                                            <i className='bi bi-pin-map size-20px gray' />
                                            <Select
                                                className='add-product--select full-width gray margin-4px-H'
                                                styles={{
                                                    option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                    menu: (provided) => ({
                                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                        position: 'relative',
                                                    }),
                                                }}
                                                value={enteredSubCategory}
                                                defaultInputValue={enteredSubCategory}
                                                disabled={subCategories.length === 0}
                                                placeholder="Select Sub Category"
                                                options={subCategories.filter(subCategory => subCategory.status === "Active").map(subCategory => ({ label: subCategory.title, value: { label: subCategory.title, title: subCategory.title, id: subCategory._id } }))}
                                                onChange={(subCategory) =>
                                                    subCategoryChangedHandler({ target: { id: "subCategory", label: subCategory.title, value: subCategory.value } })
                                                }
                                                onBlur={subCategoryBlurHandler}
                                            />
                                        </div>
                                        <p style={{ marginLeft: '0 5px 0 5px', visibility: subCategoryError && subCategoryIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                                            <i className="bi bi-exclamation-triangle-fill red"></i> {subCategoryError}
                                        </p>
                                    </div>
                                )}
                                {materials && materials.length > 0 && (
                                    <div className='full-width flex-col-left-start edit-product--input-container'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='material'>
                                            {translate.material} :<span className='red'>*</span>
                                        </label>
                                        <div className={`full-width light-gray radius-10px white-bg flex-row-top-start edit-product--input `}>
                                            <i className='bi bi-pin-map size-20px gray' />
                                            <Select
                                                className='edit-product--select full-width gray margin-4px-H'
                                                styles={{
                                                    option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                    menu: (provided) => ({
                                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`,
                                                        position: 'relative',
                                                    }),
                                                }}
                                                value={enteredMaterial}
                                                defaultInputValue={enteredMaterial}
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
                                        <p style={{ marginLeft: '0 5px 0 5px', visibility: materialError && materialIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                                            <i className="bi bi-exclamation-triangle-fill red"></i> {materialError}
                                        </p>
                                    </div>
                                )
                                }
                                <div className="edit-product--actions flex-row-between full-width">
                                    <button
                                        className="edit-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                        onClick={() => {
                                            navigate('/store-panel/products');
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
                                                <button className='edit-product--gallary ' type="button" onClick={() => handlePhotoRemove(photo._id)}>
                                                    <i className="bi bi-trash pointer size-20px gray"></i>
                                                </button>
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
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.product3DModel}: </label>
                            </div>
                            {productData.model3D === 'No Model' ?
                                <>
                                    <div className="flex-row-center full-width">
                                        <label htmlFor="3D" className={`add-product--actions--button radius-10px mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                            {translate.add3DModel}
                                        </label>
                                        <input type="file" id="3D" onChange={upload3DModelToServer} hidden />
                                    </div>
                                    {model &&
                                        <div className="flex-row-center full-width">
                                            <p className="no-space green size-16px">{translate.modelAdded}</p>
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    <div className="flex-row-center full-width">
                                        <label htmlFor="3D" className={`add-product--actions--button radius-10px mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                            {translate.edit3DModel}
                                        </label>
                                        <input type="file" id="3D" onChange={upload3DModelToServer} hidden />
                                    </div>
                                    {model &&
                                        <div className="flex-row-center full-width">
                                            <p className="no-space green size-16px">{translate.modelEdited}</p>
                                        </div>
                                    }
                                </>
                            }
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
                                    <p style={{ marginLeft: '0 5px 0 5px', visibility: priceError && priceIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                                        <i className="bi bi-exclamation-triangle-fill red"></i> {priceError}
                                    </p>
                                    <div className='full-width edit-product--price--discount'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.discount}:<span className='red'>*</span></label>
                                        <div className='margin-6px-V flex-row-left-start2col'>
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
                                                <div className='margin-6px-V flex-row-center full-width flex-wrap'>
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
