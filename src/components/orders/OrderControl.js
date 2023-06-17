import React from "react";
import "./OrderControl.scss";

const OrderControl = () => {
  return (
    <div className="full-width flex-col-left-start order-control flex-wrap">
      <div className="order-control--btn flex-row-center white mint-green-bg radius-circular pointer">
        <i className="bi bi-arrow-clockwise size-28px"></i>
        <div className="order-control--btn--tag flex-row-center white inter size-12px radius-5px shadow-5px">
          Change State
        </div>
      </div>
      <div className="order-control--btn flex-row-center white mint-green-bg radius-circular pointer">
        <i className="bi bi-trash pointer size-28px"></i>
        <div className="order-control--btn--tag flex-row-center white inter size-12px radius-5px shadow-5px">
          Delete
        </div>
      </div>
      <div className="order-control--btn flex-row-center white mint-green-bg radius-circular pointer">
        <i className="bi bi-pencil-square size-28px"></i>
        <div className="order-control--btn--tag flex-row-center white inter size-12px radius-5px shadow-5px">
          Edit
        </div>
      </div>
    </div>
  );
};
export default OrderControl;
