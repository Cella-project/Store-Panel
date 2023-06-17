import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { storeActions } from '../../apis/actions';
import router from "../../router/router";
import Popup from "../common/PopupForm";

import "./StoreControl.scss";

const StoreControl = ({ id }) => {
  const dispatch = useDispatch();
  const [popupShown, setPopupShown] = useState(false);
  const mode = useSelector(state => state.theme.mode);

  //handle change state
  const handleChangeState = async () => {
    dispatch(storeActions.changeStoreState(id))
  };

  //handle delete 
  const handleDelete = () => {
    dispatch(storeActions.deleteStore(id, () => {
      router.navigate("/stores");
    }))
  }

  //handle edit (under construction)
  const handleEdit = () => {
    setPopupShown(true)
    document.getElementById('dashboard-view').style.zIndex = 60;

    const TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    const LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = () => {
      window.scrollTo(LeftScroll, TopScroll);
    };
  }

  return (
    <div className="full-width flex-col-left-start store-control flex-wrap">
      {popupShown &&
        <Popup popupToggle={setPopupShown} header={'Edit Store'} />
      }
      <div
        className={`store-control--btn flex-row-center white mint-green-bg radius-circular pointer }`}
        onClick={handleChangeState}>
        <i className={`bi bi-arrow-clockwise size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`} />
        <div className={`store-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Change State
        </div>
      </div>
      <div className="store-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleDelete}>
        <i className={`bi bi-trash pointer size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`} />
        <div className={`store-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Delete
        </div>
      </div>
      <div className="store-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleEdit}>
        <i className={`bi bi-pencil-square size-28px ${mode === 'dark-mode' ? 'gray' : 'white'}`} />
        <div className={`store-control--btn--tag flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
          Edit
        </div>
      </div>
    </div>
  );
};

export default StoreControl;
