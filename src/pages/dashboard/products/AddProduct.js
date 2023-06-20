import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  mainCategoryActions, subCategoryActions, specialityControlActions, productActions } from '../../../apis/actions';
import {  mainCategoryMutations, subCategoryMutations, specialityControlMutations } from '../../../redux/mutations';

import useInput from '../../../hooks/useInput';
import languages from '../../../components/global/languages';
import './AddProduct.scss'
export const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mode = useSelector((state) => state.theme.mode);
    const language = useSelector((state) => state.language.language);
    const translate = languages[language];
    const storeData = useSelector((state) => state.auth.userData);
    const mainCategories = useSelector((state) => state.mainCategory.mainCategories);
    const subCategories = useSelector((state) => state.subCategory.subCategories);
    const colors = useSelector(state => state.specialityControl.colors);
    const tags = useSelector(state => state.specialityControl.tags);
    const sizes = useSelector(state => state.specialityControl.sizes);
    const materials = useSelector(state => state.specialityControl.materials);
    const [currentPage, setCurrentPage] = useState(1);
    const [photos, setPhotos] = useState([]);

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
    });

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
    });

    const {
        value: enteredMainCategory,
        error: mainCategoryError,
        isTouched: mainCategoryIsTouched,
        valueChangeHandler: mainCategoryChangedHandler,
        inputBlurHandler: mainCategoryBlurHandler,
    } = useInput((value) => {
        const isValid = value !== '';
        let error = '';
        if (value === '') {
            error = translate.pleaseEnterSpeciality;
        }
        return { isValid, error };
    });

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
    });
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
    });

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
    }, 0);

    const handlePhotoAdd = (event) => {
        const newPhotos = Array.from(event.target.files);
        setPhotos([...photos, ...newPhotos]);
    };

    const handlePhotoIndexChange = (oldIndex, newIndex) => {
        const newPhotos = [...photos];
        [newPhotos[oldIndex], newPhotos[newIndex]] = [newPhotos[newIndex], newPhotos[oldIndex]];
        setPhotos(newPhotos);
    };

    const handlePhotoRemove = (index) => {
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        setPhotos(newPhotos);
    };

    const [album, setAlbum] = useState([]);
    const uploadPhotosToServer = async (files) => {
        const album = { photos: [] };
        for (const file of files) {
            const data = new FormData();
            data.append('path', 'products');
            data.append('file', file);
            dispatch(productActions.addProductPicture(data, (response) => {
                const url = 'http://www.actore.store/api/file-manager/file/' + response.data.data;
                album.photos.push({ 'URL': url });
            }));
        }
        setAlbum(album.photos);
    }

    // Handle Color Select
    const [selectedColors, setSelectedColors] = useState([]);

    const handleColorQuantityChange = (index, event) => {
        const newSelectedColors = [...selectedColors];
        newSelectedColors[index].quantity = parseInt(event.target.value);
        setSelectedColors(newSelectedColors);
    };

    const handleColorDelete = (index) => {
        const newSelectedColors = [...selectedColors];
        newSelectedColors.splice(index, 1);
        setSelectedColors(newSelectedColors);
    };

    const handleColorSelect = (color) => {
        const selectedColor = color;
        const index = selectedColors.findIndex((c) => c._id === selectedColor.target.id);
        if (index === -1) {
            setSelectedColors([...selectedColors, { color: color.target.label, _id: color.target.id, hexCode: color.target.hexCode, quantity: 1 }]);
        } else {
            const newSelectedColors = [...selectedColors];
            newSelectedColors[index].quantity += 1;
            setSelectedColors(newSelectedColors);
        }
    };
    const totalColorQuantity = selectedColors.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
    const remainingQuantitiesOfColors = enteredQuantity - totalColorQuantity;

    // Handle Size Select
    const [selectedSizes, setSelectedSizes] = useState([]);
    const handleSizeSelect = (size) => {
        const selectedSize = size;
        const index = selectedSizes.findIndex((s) => s._id === selectedSize.target.id);
        if (index === -1) {
            setSelectedSizes([...selectedSizes, { _id: size.target.id, size: size.target.label, quantity: 1 }]);
        } else {
            const newSelectedSizes = [...selectedSizes];
            newSelectedSizes[index].quantity++;
            setSelectedSizes(newSelectedSizes);
        }
    };
    const totalSizeQuantity = selectedSizes.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
    const remainingQuantitiesOfSizes = enteredQuantity - totalSizeQuantity;

    const handleSizeQuantityChange = (index, event) => {
        const newSelectedSizes = [...selectedSizes];
        newSelectedSizes[index].quantity = parseInt(event.target.value);
        setSelectedSizes(newSelectedSizes);
    };

    const handleSizeDelete = (index) => {
        const newSelectedSizes = [...selectedSizes];
        newSelectedSizes.splice(index, 1);
        setSelectedSizes(newSelectedSizes);
    };

    // Handle Tag Select
    const [selectedTags, setSelectedTags] = useState([]);
    const handleTagSelect = (tag) => {
        const selectedTag = tag;
        const index = selectedTags.findIndex((t) => t._id === selectedTag.target.id);
        if (index === -1) {
            setSelectedTags([...selectedTags, { _id: tag.target.id, tag: tag.target.label }]);
        } else {
            const newSelectedTags = [...selectedTags];
            newSelectedTags.splice(index, 1);
            setSelectedTags(newSelectedTags);
        }
    };

    const handleTagDelete = (index) => {
        const newSelectedTags = [...selectedTags];
        newSelectedTags.splice(index, 1);
        setSelectedTags(newSelectedTags);
    };

    // Handle Price Change
    const [discountType, setDiscountType] = useState('None');
    const [discountValue, setDiscountValue] = useState(0);

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
    useEffect(() => {
        if (enteredMainCategory === '') {
            dispatch(mainCategoryMutations.setMainCategories(null));
            dispatch(mainCategoryActions.getMainCategories(storeData.speciality._id));
        }
    }, [dispatch, enteredMainCategory,storeData.speciality._id]);


    useEffect(() => {
        if (enteredMainCategory !== '') {
            dispatch(subCategoryMutations.setSubCategories(null));
            dispatch(subCategoryActions.getSubCategories(enteredMainCategory.id));
            dispatch(specialityControlMutations.setColors(null));
            dispatch(specialityControlMutations.setTags(null));
            dispatch(specialityControlMutations.setMaterials(null));
            dispatch(specialityControlMutations.setSizes(null));
            dispatch(specialityControlActions.getColors(storeData.speciality._id));
            dispatch(specialityControlActions.getTags(storeData.speciality._id));
            dispatch(specialityControlActions.getMaterials(storeData.speciality._id));
            dispatch(specialityControlActions.getSizes(storeData.speciality._id));
        }
    }, [dispatch, enteredMainCategory,storeData.speciality._id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const product = {
            title: enteredTitle,
            description: enteredDescription,
            store:
            {   
                _id: storeData._id,
                storeName: storeData.storeName,
            },
            price: parseInt(enteredPrice),
            avilableQuantity: parseInt(enteredQuantity),
            category: {
                _id: enteredSubCategory.id,
                title: enteredSubCategory.title,
            },
            colors: selectedColors.map(item => ({
                color: item.color,
                hexCode: item.hexCode,
                quantity: parseInt(item.quantity)
            })),
            sizes: selectedSizes.map(item => ({
                size: item.size,
                quantity: parseInt(item.quantity)
            })),
            material: enteredMaterial.title,
        };
        if (selectedTags.length > 0) {
            product.tags = selectedTags.map(item => ({
                tag: item.tag
            }));
        }
        if (album.length > 0) {
            product.album = album;
        }

        if (discountType !== 'None') {
            product.discount = {
                hasDiscount: true,
                discountType: discountType,
                discountAmount: discountValue
            };
        }

        dispatch(productActions.addProduct(product,
            () => {
                navigate(`/home/`);
            }));
    };


    return (
        <div className='add-product flex-row-center inter'>
            <form onSubmit={handleSubmit} noValidate className=' flex-col-center'>
                <div className="full-width flex-row-center margin-12px-V">
                    <p
                        style={{ margin: '30px' }}
                        className="size-26px font-bold inter gray">{translate.addProduct}
                    </p>
                </div>

                <div className="add-product--body white-bg full-width radius-10px shadow-2px">
                    <div className="add-product--muiBox-root radius-10px shadow-2px">
                        <div className='add-product--muiBox-root--main mint-green-bg radius-10px'>
                            <div className='flex-row-between add-product--muiBox-root--main--title'>
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
                                        3. {translate.productVariants}
                                    </div>
                                </div>
                                <div className='flex-col-center  padding-10px-H'>
                                    <div>
                                        <i className={`${mode === 'dark-mode' ? 'gray' : 'white'} bi bi-circle${currentPage >= 4 ? "-fill" : ""} white`}></i>
                                    </div>
                                    <div className={`${mode === 'dark-mode' ? 'gray' : 'white'} size-12px inter`}>
                                        4. {translate.productPricing}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {currentPage === 1 &&
                        <div>
                            <div className='full-width flex-col-left-start add-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.productInformation}</label>
                            </div>
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.productTitle} <span className='red'>*</span></label>
                                <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input `}>
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
                            <div className='full-width flex-col-left-start add-product--input-container'>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.productDescription} <span className='red'>*</span></label>
                                <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input`}>
                                    <textarea
                                        className='full-width gray margin-4px-H'
                                        type={'text'}
                                        placeholder={translate.productDescription}
                                        id={'description'}
                                        value={enteredDescription}
                                        onChange={descriptionChangedHandler}
                                        onBlur={descriptionBlurHandler}
                                        style={{ resize: 'none' }} // disable resizing
                                    />
                                </div>
                                {descriptionIsTouched && (<div className="error-message">{descriptionError}</div>)}
                            </div>
                            {mainCategories && mainCategories.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='MainCategory'>{translate.mainCategory} <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input`}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                                }),
                                            }}
                                            value={enteredMainCategory}
                                            disabled={mainCategories.length === 0}
                                            placeholder={translate.selectMainCategory}
                                            options={mainCategories.filter(mainCategory => mainCategory.status === "Active").map(mainCategory => ({ label: mainCategory.title, value: { label: mainCategory.title, title: mainCategory.title, id: mainCategory._id } }))}
                                            onChange={(mainCategory) =>
                                                mainCategoryChangedHandler({ target: { id: "mainCategory", label: mainCategory.title, value: mainCategory.value } })
                                            }
                                            onBlur={mainCategoryBlurHandler}
                                        />
                                    </div>
                                    {mainCategoryIsTouched && (<div className="error-message">{mainCategoryError}</div>)}
                                </div>
                            )}
                            {subCategories && subCategories.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='SubCategory'>{translate.subCategory} <span className='red'>*</span></label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input `}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                                }),
                                            }}
                                            value={enteredSubCategory}
                                            disabled={subCategories.length === 0}
                                            placeholder="Select Sub Category"
                                            options={subCategories.filter(subCategory => subCategory.status === "Active").map(subCategory => ({ label: subCategory.title, value: { label: subCategory.title, title: subCategory.title, id: subCategory._id } }))}
                                            onChange={(subCategory) =>
                                                subCategoryChangedHandler({ target: { id: "subCategory", label: subCategory.title, value: subCategory.value } })
                                            }
                                            onBlur={subCategoryBlurHandler}
                                        />
                                    </div>
                                    {subCategoryIsTouched && (<div className="error-message">{subCategoryError}</div>)}
                                </div>
                            )}

                            <div className="add-product--actions flex-row-between full-width">
                                <button
                                    className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        navigate('/products');
                                    }}
                                >
                                    {translate.cancel}
                                </button>
                                <button
                                    className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
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
                        <div className='full-width flex-col-left-start add-product--header'>
                            <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.productAlbum}</label>
                        </div>
                        <div className='full-width flex-col-left-start add-product--input-container'>
                            <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>{translate.productImages} : <span className='red'>*</span></label>
                        </div>
                        <div className="add-product--photo flex-col-center">
                            <div className="flex-row-center flex-wrap">
                                {photos.map((photo, index) => (
                                    <div className="add-product--photo--item padding-10px-H flex-col-center " key={index}>
                                        <div className={`inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} margin-6px-V`}> {translate.photoNumber} : {index + 1}</div>
                                        <img src={URL.createObjectURL(photo)} alt={` ${index}`} />
                                        <div className="flex-row-between full-width margin-6px-V ">
                                            <button
                                                type="button"
                                                className={`add-product--gallary-left ${mode === 'dark-mode' ? 'gray-bg' : 'mint-green-bg'} radius-circular pointer white`}
                                                onClick={() => handlePhotoIndexChange(index, index - 1)}
                                                disabled={index === 0}
                                            >
                                                <i className="bi bi-caret-left-fill flex-row-right-start"></i>
                                            </button>
                                            <button className='add-product--gallary' type="button" onClick={() => handlePhotoRemove(index)}>
                                                <i className="bi bi-trash pointer size-20px gray"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className={`add-product--gallary-right ${mode === 'dark-mode' ? 'gray-bg' : 'mint-green-bg'} radius-circular pointer white`}
                                                onClick={() => handlePhotoIndexChange(index, index + 1)}
                                                disabled={index === photos.length - 1}
                                            >
                                                <i className="bi bi-caret-right-fill flex-row-right-start"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex-row-center full-width">
                                <label htmlFor="photos" className={`add-product--actions--button radius-10px mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`}>
                                    {translate.addPhoto}
                                </label>
                                <input type="file" id="photos" onChange={handlePhotoAdd} multiple hidden />
                            </div>
                        </div>

                        <div className="add-product--actions flex-row-between full-width">
                            <button
                                className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                onClick={() => {
                                    setCurrentPage(1);
                                }}
                            >
                                {translate.back}
                            </button>
                            <button
                                className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                                onClick={() => {
                                    uploadPhotosToServer(photos);
                                    setCurrentPage(3);
                                }}
                            >
                                {translate.next}
                            </button>
                        </div>
                    </div>}

                    {currentPage === 3 &&
                        <div>
                            <div className='full-width flex-col-left-start add-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.productVariants}</label>
                            </div>
                            <div>
                                <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="quantity">{translate.quantity} : <span className='red'>*</span></label>
                                <input className="pointer margin-12px-H gray add-product--input radius-10px" min='0' type="number" id="Quantity" value={enteredQuantity} onChange={quantityChangedHandler} onBlur={quantityBlurHandler} />
                                {quantityIsTouched && (<div className="error-message">{quantityError}</div>)}
                            </div>
                            {
                                materials && materials.length > 0 && (
                                    <div className='full-width flex-col-left-start add-product--input-container'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='material'>
                                            {translate.material} :<span className='red'>*</span>
                                        </label>
                                        <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input `}>
                                            <i className='bi bi-pin-map size-20px gray' />
                                            <Select
                                                className='add-product--select full-width gray margin-4px-H'
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
                                                    materialChangedHandler({ target: { id: "material", label: subCategory.title, value: subCategory.value } })
                                                }
                                                onBlur={materialBlurHandler}
                                            />
                                        </div>
                                        {materialIsTouched && (<div className="error-message">{materialError}</div>)}
                                    </div>
                                )
                            }

                            {colors && colors.length > 0 && (
                                <div className='full-width flex-col-left-start add-product--input-container'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='color'>
                                        {translate.colors} :<span className='red'>*</span>
                                    </label>
                                    <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input `}>
                                        <i className='bi bi-pin-map size-20px gray' />
                                        <Select
                                            multiple
                                            className='add-product--select full-width gray margin-4px-H'
                                            styles={{
                                                option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                menu: (provided) => ({
                                                    ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                                }),
                                            }}
                                            disabled={colors.length === 0}
                                            placeholder={translate.selectColors}
                                            options={colors.map((color) => ({
                                                label: color.title,
                                                value: { label: color.title, title: color.title, id: color._id, hexCode: color.hexCode },
                                            }))}
                                            onChange={(color) =>
                                                handleColorSelect({ target: { id: color.value.id, label: color.value.title, value: color.value.title, hexCode: color.value.hexCode } })
                                            }
                                        />
                                        {
                                            remainingQuantitiesOfColors !== 0 && (remainingQuantitiesOfColors >= 0 ? (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} mint-green-bg radius-10px padding-6px-H`}>{remainingQuantitiesOfColors}</span>) : (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} red-bg radius-10px padding-6px-H`}>{remainingQuantitiesOfColors}</span>))
                                        }
                                    </div>
                                    <div className="flex-row-between flex-wrap ">
                                        {selectedColors.map((color, index) => (
                                            <div key={index} style={{ background: color.hexCode }} className="add-product--selected-item shadow-2px radius-10px flex-row-between size-14px white">
                                                <span className={`margin-4px-H ${(mode === 'dark-mode') ? 'gray' : 'white'}`}>{color.color}:</span>
                                                <input className='add-product--input--number shadow-2px radius-10px gray' type="number" min="1" max="999" value={color.quantity} onChange={(event) => handleColorQuantityChange(index, event)} />
                                                <button className={`add-product--input--number--button bi bi-trash pointer size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'white'}`} type="button" onClick={() => handleColorDelete(index)}></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {
                                sizes && sizes.length && (
                                    <div className='full-width flex-col-left-start add-product--input-container'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='size'>
                                            {translate.sizes} :<span className='red'>*</span>
                                        </label>
                                        <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input `}>
                                            <i className='bi bi-pin-map size-20px gray' />
                                            <Select
                                                multiple
                                                className='add-product--select full-width gray margin-4px-H'
                                                styles={{
                                                    option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                    menu: (provided) => ({
                                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                                    }),
                                                }}
                                                disabled={sizes.length === 0}
                                                placeholder={translate.selectSizes}
                                                options={sizes.map((size) => ({
                                                    label: size.title,
                                                    value: { label: size.title, title: size.title, id: size._id },
                                                }))}
                                                onChange={(size) =>
                                                    handleSizeSelect({ target: { id: size.value.id, label: size.value.title, value: size.value.title } })
                                                }
                                            />
                                            {
                                                remainingQuantitiesOfSizes !== 0 && (remainingQuantitiesOfSizes >= 0 ? (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} mint-green-bg radius-10px padding-6px-H`}>{remainingQuantitiesOfSizes}</span>) : (<span className={`${mode === 'dark-mode' ? 'gray' : 'white'} red-bg radius-10px padding-6px-H`}>{remainingQuantitiesOfSizes}</span>))
                                            }

                                        </div>
                                        <div className="flex-row-between flex-wrap ">
                                            {selectedSizes.map((size, index) => (
                                                <div key={index} className="add-product--selected-item shadow-2px radius-10px flex-row-between size-14px white-bg gray">
                                                    <span className='margin-4px-H '>{size.size}:</span>
                                                    <input className='add-product--input--number shadow-2px radius-10px gray' type="number" min="1" max="999" value={size.quantity} onChange={(event) => handleSizeQuantityChange(index, event)} />
                                                    <button className='add-product--input--number--button bi bi-trash pointer size-20px pointer gray' type="button" onClick={() => handleSizeDelete(index)}></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }
                            {
                                tags && tags.length > 0 && (
                                    <div className='full-width flex-col-left-start add-product--input-container'>
                                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='tags'>
                                            {translate.tags} :<span className='red'>*</span>
                                        </label>
                                        <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product--input `}>
                                            <i className='bi bi-pin-map size-20px gray' />
                                            <Select
                                                multiple
                                                className='add-product--select full-width gray margin-4px-H'
                                                styles={{
                                                    option: (provided, state) => ({ ...provided, cursor: 'pointer', ":hover": { backgroundColor: `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` }, backgroundColor: (state.isFocused || state.isSelected) ? `${mode === 'dark-mode' ? '#163a4a' : '#7FBCD2'}` : 'inherit' }),
                                                    menu: (provided) => ({
                                                        ...provided, backgroundColor: `${mode === 'dark-mode' ? '#242526' : '#ffffff'}`
                                                    }),
                                                }}
                                                disabled={tags.length === 0}
                                                placeholder={translate.selectTags}
                                                options={tags.map((tag) => ({
                                                    label: tag.title,
                                                    value: { label: tag.title, title: tag.title, id: tag._id },
                                                }))}
                                                onChange={(tag) =>
                                                    handleTagSelect({ target: { id: tag.value.id, label: tag.value.title, value: tag.value.title } })
                                                }
                                            />
                                        </div>
                                        <div className="flex-row-between flex-wrap ">
                                            {selectedTags.map((tag, index) => (
                                                <div key={index} className="add-product--selected-item shadow-2px radius-15px flex-row-between size-14px lavender-bg text-shadow">
                                                    <span className={`margin-4px-H ${mode === 'dark-mode' ? 'white' : 'gray'}`}>{tag.tag}</span>
                                                    <button className={`add-product--input--number--button bi bi-trash pointer ${mode === 'dark-mode' ? 'white' : 'gray'} size-20px pointer `} type="button" onClick={() => handleTagDelete(tag._id)}></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            }

                            <div className="add-product--actions flex-row-between full-width">
                                <button
                                    className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        setCurrentPage(2);
                                    }}
                                >
                                    {translate.back}
                                </button>
                                <button
                                    className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                                    disabled={remainingQuantitiesOfColors !== 0 || (remainingQuantitiesOfSizes !== 0 )}
                                    onClick={() => {
                                        setCurrentPage(4);
                                    }}
                                >
                                    {translate.next}
                                </button>
                            </div>

                        </div>

                    }

                    {currentPage === 4 &&
                        <div>
                            <div className='full-width flex-col-left-start add-product--header'>
                                <label className='pointer full-width text-shadow gray font-bold size-26px'>{translate.productPricing}</label>
                            </div>
                            <div className="add-product--price full-width flex-col-left-start add-product--input-container">
                                <div>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor="price">{translate.price}:<span className='red'>*</span></label>
                                    <input className="pointer margin-12px-H gray add-product--input radius-10px" min='0' type="number" id="price" value={enteredPrice} onChange={priceChangedHandler} onBlur={priceBlurHandler} />
                                </div>
                                {priceIsTouched && (<div className="error-message">{priceError}</div>)}
                                <div className='full-width add-product--price--discount'>
                                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V'>Discount:<span className='red'>*</span></label>
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
                                                <label className='pointer text-shadow gray font-bold margin-6px-H' htmlFor="discount-value">{discountType === 'Percentage' ? 'Percentage' : 'Value'}:</label>
                                                <input className='gray add-product--input radius-10px' min='0' type="number" id="discount-value" value={discountValue} onChange={handleDiscountValueChange} />
                                            </div>
                                            <div className='flex-row-center'>
                                                <label className='text-shadow gray font-bold margin-6px-H'>{translate.newPrice}:</label>
                                                <div className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} font-bold size-26px`}>{calculateNewPrice()}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="add-product--actions flex-row-between full-width">
                                <button
                                    className="add-product--actions--button pointer radius-10px shadow-4px white text-shadow size-18px gray-bg"
                                    onClick={() => {
                                        setCurrentPage(3);
                                    }}
                                >
                                    {translate.back}
                                </button>
                                <button
                                    className={`add-product--actions--button pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                                    type="submit"
                                >
                                    {translate.confirm}
                                </button>
                            </div>
                        </div>}
                </div>

            </form>


        </div >
    );
}

export default AddProduct
