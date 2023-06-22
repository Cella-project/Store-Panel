import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { productActions, specialityActions, specialityControlActions } from '../../apis/actions';
import { specialityMutations } from '../../redux/mutations';
import Loading from '../global/Loading';
import languages from '../global/languages';
import './AddProductColorForm.scss';

const AddProductColorForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);
    const colors = useSelector(state => state.specialityControl.colors);
    const category = useSelector(state => state.speciality.categoryData);
    const product = useSelector(state => state.product.productData);
    const language = useSelector(state => state.language.language);
    const translations = languages[language];

    // Handle color Select
    const handleColorSelect = (color) => {
        const selectedColor = color;
        const index = product.colors.findIndex((t) => t.color === selectedColor.target.label);
        if (index === -1) {
            dispatch(productActions.addProductColor({
                _id: product._id,
                color: {
                    color: selectedColor.target.label,
                    hexCode: selectedColor.target.hexCode
                }
            },translations.productColorAddedSuccessfully,translations.someThingWentWrongPleaseTry));
        } else {
            dispatch(productActions.deleteProductColor({
                _id: product._id,
                colorId: product.colors[index]._id
            },translations.areYouSureDeleteProductColor,translations.productColorDeletedSuccessfully,translations.someThingWentWrongPleaseTry));
        }
    };

    const handleColorDelete = (colorId) => {
        dispatch(productActions.deleteProductColor({
            _id: product._id,
            colorId: colorId
        },translations.areYouSureDeleteProductColor,translations.productColorDeletedSuccessfully,translations.someThingWentWrongPleaseTry));
    };
    useEffect(() => {
        if (category === null) {
            dispatch(specialityActions.getCategoryData(product.category._id));
            dispatch(specialityMutations.setCategoryData(product.category._id));
        }
        else if (category.type === 'Sub') {
            dispatch(specialityActions.getCategoryData(category.parent._id));
            dispatch(specialityMutations.setCategoryData(category.parent._id));
        }
        else if (category.type === 'Main') {
            dispatch(specialityActions.getspecialityData(category.parent._id));
            dispatch(specialityMutations.setspecialityData(category.parent._id));
            dispatch(specialityControlActions.getColors(category.parent._id));
        }

    }, [dispatch, category, product.category._id]);




    const formSubmissionHandler = (e) => {
        e.preventDefault();
        popupToggle(false);
        document.getElementById("dashboard-view").style.zIndex = 10;
        window.onscroll = function () { }
    };


    return (
        <form noValidate className="add-product-color" onSubmit={formSubmissionHandler}>
            {colors && colors.length > 0 ? (
                <div className='full-width flex-col-left-start add-product--input-container'>
                    <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='color'>
                        {translations.colors} :<span className='red'>*</span>
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
                            placeholder={translations.selectColors}
                            options={colors.map((color) => ({
                                label: color.title,
                                value: { label: color.title, title: color.title, id: color._id, hexCode: color.hexCode },
                            }))}
                            onChange={(color) =>
                                handleColorSelect({ target: { id: color.value.id, label: color.value.title, value: color.value.title, hexCode: color.value.hexCode } })
                            }
                        />
                    </div>
                    <div className="flex-row-between flex-wrap ">
                        {product.colors.map((color, index) => (
                            <div key={index} style={{ background: color.hexCode }} className="add-product--selected-item shadow-2px radius-10px flex-row-between size-14px white">
                                <span className={`margin-4px-H ${(mode === 'dark-mode') ? 'gray' : 'white'}`}>{color.color}</span>
                                <button className={`add-product--input--number--button bi bi-trash pointer size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'white'}`} type="button" onClick={() => handleColorDelete(color._id)}></button>
                            </div>
                        ))}
                    </div>
                </div>
            ): <Loading />
            }
            <div className="add-product-color--actions flex-row-between full-width">
                <button
                    className={`add-product-color--actions--button full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                    type="submit"
                >
                    {translations.confirm}
                </button>
            </div>
        </form >
    )
}

export default AddProductColorForm;