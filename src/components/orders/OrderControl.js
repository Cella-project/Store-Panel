import React from "react";
import "./OrderControl.scss";
import { useDispatch, useSelector } from "react-redux";
import languages from "../global/languages";
import { orderActions } from "../../apis/actions";

const OrderControl = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const translate = languages[language];
  const mode = useSelector((state) => state.theme.mode);
  const orderData = useSelector((state) => state.order.orderData);

  const handleApprove = async () => {
    dispatch(orderActions.approveOrder(orderData._id,translate.areYouSureApproveOrder,translate.orderApproved,translate.someThingWentWrongPleaseTry))
  }

  const handleCancel = async () => {
    dispatch(orderActions.cancelOrder(orderData._id,translate.areYouSureCancelOrder,translate.orderCanceled,translate.someThingWentWrongPleaseTry))
  }

  const handleReady = async () => {
    dispatch(orderActions.readyForPickup(orderData._id,translate.areYouSureReadyForPickup,translate.orderReadyForPickup,translate.someThingWentWrongPleaseTry))
  }

  return (
    <div className="full-width flex-col-left-start order-control flex-wrap">
      {
        orderData.status === "Pending" ? (
          <div className="order-control flex-col-center">
            <div className={`order-control--btn flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} green-bg radius-circular pointer`} onClick={handleApprove}>
              <i className="bi bi-check-lg size-28px"></i>
              <div className={`order-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
                {translate.approveOrder}
              </div>
            </div>
            <div className={`order-control--btn flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} red-bg radius-circular pointer`} onClick={handleCancel}>
              <i className="bi bi-x-lg pointer size-28px"></i>
              <div className={`order-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
                {translate.cancelOrder}
              </div>
            </div>
          </div>
        ) : orderData.status==="Approved" ? (
          <div className={`order-control--btn flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} mint-green-bg radius-circular pointer`} onClick={handleReady}>
            <i className="bi bi-truck size-28px"></i>
            <div className={`order-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
              {translate.approved}
            </div>
          </div>
        ) : orderData.status==="Ready" ? (
          <div className={`order-control--btn flex-row-center white gray-bg radius-circular`}>
            <i className="bi bi-check size-28px"></i>
            <div className={`order-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
              {translate.readyForPickup}
            </div>
          </div>
        ) : orderData.status==="Picked" ? (
          <div className={`order-control--btn flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} mint-green-bg radius-circular`} >
            <i className="bi bi-check-all size-28px"></i>
            <div className={`order-control--btn--tag${language === 'ar' ? '-arabic' : ''} flex-row-center ${mode === 'dark-mode' ? 'gray' : 'white'} inter size-12px radius-5px shadow-5px`}>
              {translate.picked}
            </div>
          </div>
        ) : (
          <>

          </>
        )

      }
    </div>
  );
};
export default OrderControl;
