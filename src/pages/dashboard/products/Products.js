import React from "react";
import { Outlet } from "react-router-dom"; 

import './Products.scss';

const Products = () => {
    return (
        <div className="full-width">
            <Outlet/>
        </div>
    );
};

export default Products;