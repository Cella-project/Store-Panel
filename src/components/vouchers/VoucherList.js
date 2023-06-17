import React from "react";
import "./VoucherList.scss";

const VoucherList = (props, { key }) => {
  return (
    <div key={key} className="flex-row-between margin-10px-V radius-15px shadow-5px full-width ">
      <i className={`bi bi-${props.type === "global" ? "globe" : "shop-window"} mint-green size-30px margin-2px-H`} />
      <div className="flex-col-left-start voucher-data">
        <div className="black inter">{props.title}</div>
        <div className="gray inter">{props.voucherId}</div>
      </div>

      <div className="mint-green font-bold voucher-value ">{props.value} </div>
    </div>
  );
};

export default VoucherList;
