import React from "react";
import { Outlet } from "react-router-dom"; 

import './OrdersHistory.scss';

const OrdersHistory = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default OrdersHistory;