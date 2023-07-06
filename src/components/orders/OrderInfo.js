import React from "react";
import { useSelector } from "react-redux";
import languages from "../global/languages";
import "./OrderInfo.scss";

const OrderInfo = ({ order }) => {
  const language = useSelector(state => state.language.language);
  const translate = languages[language]
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className="order-info white-bg full-width shadow-2px margin-10px-V inter radius-15px" >
      <div className="flex-col-left-start gray font-bold size-26px padding-10px-V">
        {order.code}
      </div>
      <div className="full-width flex-row-between2col">
        <div className="flex-col-center">
          <span className="gray size-20px">{translate.paymentMethod}:
            <span className={`${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px margin-6px-H`}>{order.paymentMethod}</span>
          </span>
        </div>
        <div className="flex-row-left-start gray ">
          <div className="flex-col-center ">
            <div className="flex-row-center ">
              {translate.subtotal} :
              <div className={`flex-row-center ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-18px margin-2px-H`}>{order.subTotal} {translate.EGP}</div>
            </div>
            <div className="flex-row-center order-info-money">
              {translate.deliveryFee} :
              <div className={`flex-row-center ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-18px margin-2px-H`}> {order.deliveryFee} {translate.EGP}</div>
            </div>
            <div className="flex-row-center">
              {translate.total} :
              <div className={`flex-row-center ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-24px margin-2px-H`}> {order.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {translate.EGP}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderInfo;
