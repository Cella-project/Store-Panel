import React from "react";
import "./OrderControl.scss";
import { useDispatch, useSelector } from "react-redux";
import languages from "../global/languages";
import { orderActions } from "../../apis/actions";

const OrderControl = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const translate = languages[language];
  const orderData = useSelector((state) => state.order.orderData);

  const handleApprove = async () => {
    dispatch(orderActions.approveOrder(orderData._id))
  }

  const handleCancel = async () => {
    dispatch(orderActions.cancelOrder(orderData._id))
  }

  const handleReady = async () => {
    dispatch(orderActions.readyForPickup(orderData._id))
  }

  return (
    <div className="full-width flex-col-left-start order-control flex-wrap">
      {
        orderData.status === "Pending" ? (
          <div className="order-control flex-col-center">
            <div className="order-control--btn flex-row-center white green-bg radius-circular pointer" onClick={handleApprove}>
              <i className="bi bi-check-lg size-28px"></i>
              <div className="order-control--btn--tag flex-row-center white inter size-12px radius-5px shadow-5px">
                {translate.approveOrder}
              </div>
            </div>
            <div className="order-control--btn flex-row-center white red-bg radius-circular pointer" onClick={handleCancel}>
              <i className="bi bi-x-lg pointer size-28px"></i>
              <div className="order-control--btn--tag flex-row-center white inter size-12px radius-5px shadow-5px">
                {translate.cancelOrder}
              </div>
            </div>
          </div>
        ) : (
          <div className="order-control--btn flex-row-center white mint-green-bg radius-circular pointer" onClick={handleReady}>
            <i className="bi bi-truck size-28px"></i>
            <div className="order-control--btn--tag flex-row-center white inter size-12px radius-5px shadow-5px">
              {translate.readyForPickup}
            </div>
          </div>
        )
      }
    </div>
  );
};
export default OrderControl;
