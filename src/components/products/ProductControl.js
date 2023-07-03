import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../apis/actions";
import router from "../../router/router";
import { useNavigate } from 'react-router-dom';
import Popup from "../common/PopupForm";
import languages from "../global/languages";
import "./ProductControl.scss";

const ProductControl = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const language = useSelector((state) => state.language.language);
  const translate = languages[language];
  const [popupShown, setPopupShown] = React.useState(false);

  //handle change state
  const handleChangeState = async () => {
    dispatch(productActions.changeProductState(id, translate.areYouSureYouWantChangeStateOfThisProduct, translate.productStateChangedSuccessfully, translate.someThingWentWrongPleaseTry));
  };

  //handle delete
  const handleDelete = () => {
    dispatch(
      productActions.deleteProduct(id, () => {
        router.navigate("/store-panel/products");
      }, translate.areYouSureDeleteProduct, translate.productDeletedSuccessfully, translate.someThingWentWrongPleaseTry)
    );
  };
  const handleRefill = () => {
    setPopupShown(true);
    document.getElementById('dashboard-view').style.zIndex = 60;
    const TopScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  const handleEdit = () => {
    navigate(`/store-panel/products/editProduct/${id}`);
  }

  return (
    <div className="full-width flex-col-left-start product-control flex-wrap">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={translate.refillProduct} />
      }
      <div onClick={handleChangeState} className="product-control--btn flex-row-center white mint-green-bg radius-circular pointer">
        <i className={`bi bi-arrow-clockwise size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`}></i>
        <div className={`product-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          {translate.changeState}
        </div>
      </div>
      <div className="product-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleDelete}>
        <i className={`bi bi-trash pointer size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`}></i>
        <div className={`product-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          {translate.delete}
        </div>
      </div>
      <div className="product-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleEdit}>
        <i className={`bi bi-pencil-square size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`}></i>
        <div className={`product-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          {translate.edit}
        </div>
      </div>
      <div className="product-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleRefill}>
        <i className={`bi bi-arrow-repeat size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`}></i>
        <div className={`product-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          {translate.refill}
        </div>
      </div>
    </div>
  );
};
export default ProductControl;
