import React from "react";
import Rating from "@mui/material/Rating";
import StarBorder from '@material-ui/icons/StarBorder';
import Canvas from "../common/Canvas";
import { useSelector } from "react-redux";

import "./StoreInfo.scss";

const StoreInfo = ({ store }) => {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className="store-info full-width shadow-2px inter radius-15px white-bg flex-row-between2col ">
      <div className="store-info--img flex-row-center">
        {store.logo === 'No Image' ?
          <Canvas name={store.storeName} width={130} height={130} fontSize={'100px'} />
          :
          <img src={store.logo} className='white-bg' alt="" />
        }
        <div className={`store-info--status ${(store.status === 'Active' || store.status === true) ? 'green-bg' : 'red-bg'} shadow-5px radius-circular`}></div>
      </div>
      <div className="store-info--info flex-row-top-between2col flex-wrap">
        <div className="store-info--name flex-col-left-start">
          <div className={`${mode === 'dark-mode' ? 'gray' : 'orange'} size-24px margin-8px-V font-bold`}>
            {store.storeName}
          </div>
          <div className="gray size-18px margin-12px-H">
            {store.slogan}
          </div>
        </div>
        {
          store.rating !== undefined &&
          <div className="store-info--rate flex-row-right-start margin-8px-V">
            <Rating
              name="rating"
              style={{ color: "#FDCC0D" }}
              emptyIcon={<StarBorder className="gray" fontSize='inherit' />}
              value={store.raing}
              precision={0.1}
              size={"medium"}
              readOnly
            />
            <div className="size-14px gray font-bold margin-4px-H">
              {store.rating}
            </div>
          </div>
        }
      </div>
    </div>
  );
};
export default StoreInfo;
