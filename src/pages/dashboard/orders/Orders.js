import React from "react";
import { Outlet } from "react-router-dom"; 

import './Orders.scss';

const Orders = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default Orders;