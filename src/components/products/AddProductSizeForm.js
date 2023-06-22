import React ,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { productActions, specialityActions, specialityControlActions } from '../../apis/actions';
import { specialityMutations } from '../../redux/mutations';
import Loading from '../global/Loading';
import languages from '../global/languages';
import './AddProductSizeForm.scss';

const AddProductSizeForm = ({ popupToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);
    const sizes = useSelector(state => state.specialityControl.sizes);
    const category = useSelector(state => state.speciality.categoryData);
    const product = useSelector(state => state.product.productData);
    const language = useSelector(state => state.language.language);
    const translations = languages[language];

    // Handle size Select
    const handleSizeSelect = (size) => {
        const selectedSize = size;
        const index = product.sizes.findIndex((t) => t.size === selectedSize.target.label);
        if (index === -1) {
            dispatch(productActions.addProductSize({
                _id: product._id,
                size: selectedSize.target.label
            },translations.productSizeAddedSuccessfully,translations.someThingWentWrongPleaseTry));
        } else {
            dispatch(productActions.deleteProductSize({
                _id: product._id,
                sizeId: product.sizes[index]._id
            },translations.areYouSureDeleteProductSize,translations.productSizeDeletedSuccessfully,translations.someThingWentWrongPleaseTry));
        }
    };

    const handleSizeDelete = (sizeId) => {
        dispatch(productActions.deleteProductSize({
            _id: product._id,
            sizeId: sizeId
        },translations.areYouSureDeleteProductSize,translations.productSizeDeletedSuccessfully,translations.someThingWentWrongPleaseTry));
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
            dispatch(specialityControlActions.getSizes(category.parent._id));
        }

    }, [dispatch, category, product.category._id]);

    const formSubmissionHandler = (e) => {
        e.preventDefault();
        popupToggle(false);
        document.getElementById("dashboard-view").style.zIndex = 10;
        window.onscroll = function () { }
    };


    return (
        <form noValidate className="add-product-size" onSubmit={formSubmissionHandler}>
            {
                sizes && sizes.length > 0 ? (
                    <div className='full-width flex-col-left-start add-product-size--input-container'>
                        <label className='pointer full-width text-shadow gray font-bold margin-6px-V' htmlFor='sizes'>
                            {translations.sizes} :<span className='red'>*</span>
                        </label>
                        <div className={`full-width light-gray radius-10px white-bg flex-row-left-start add-product-size--input `}>
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
                                placeholder={translations.selectSizes}
                                options={sizes.map((size) => ({
                                    label: size.title,
                                    value: { label: size.title, title: size.title, id: size._id },
                                }))}
                                onChange={(size) =>
                                    handleSizeSelect({ target: { id: size.value.id, label: size.value.title, value: size.value.title } })
                                }
                            />
                        </div>
                        <div className="flex-row-between flex-wrap ">
                            {product.sizes.map((size, index) => (
                                <div key={index} className={`add-product-size--selected-item shadow-2px radius-15px flex-row-between size-14px ${mode === 'dark-mode' ? 'gray-bg' : 'white-bg'} text-shadow`}>
                                    <span className={`margin-4px-H ${mode === 'dark-mode' ? 'white' : 'gray'}`}>{size.size}</span>
                                    <button className={`add-product-size--input--number--button bi bi-trash pointer ${mode === 'dark-mode' ? 'white' : 'gray'} size-20px pointer `} type="button" onClick={() => handleSizeDelete(size._id)}></button>
                                </div>
                            ))}
                        </div>
                    </div>
                ): <Loading />
            }
            <div className="add-product--actions flex-row-between full-width">
                <button
                    className={`add-product--actions--button full-width pointer radius-10px shadow-4px ${mode === 'dark-mode' ? 'gray' : 'white'} text-shadow size-18px font-bold mint-green-bg`}
                    type="submit"
                >
                    {translations.confirm}
                </button>
            </div>
        </form >
    )
}

export default AddProductSizeForm;