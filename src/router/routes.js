import App from '../App';

import AutoGuard from "./guards/AuthGuard";

import Auth from '../pages/Auth';

import Login from '../pages/auth/Login';
import ForgetPassword from '../pages/auth/ForgetPassword';
import VerifyCode from '../pages/auth/VerifyCode';
import ResetPassword from '../pages/auth/ResetPassword';

import Dashboard from '../pages/Dashboard';

import Home from "../pages/dashboard/home/Home";
import Profile from '../pages/dashboard/profile/Profile';
import Products from "../pages/dashboard/products/Products";
import ProductList from "../pages/dashboard/products/ProductList"
import ProductDetails from "../pages/dashboard/products/ProductDetails";
import AddProduct from "../pages/dashboard/products/AddProduct";
import EditProduct from "../pages/dashboard/products/EditProduct";
import Orders from "../pages/dashboard/orders/Orders";
import OrderList from "../pages/dashboard/orders/OrderList";
import OrderDetails from "../pages/dashboard/orders/OrderDetails";
import OrdersHistory from "../pages/dashboard/orders/OrdersHistory";
import OrderHistoryList from "../pages/dashboard/orders/OrderHistoryList";
import OrderHistoryDetails from "../pages/dashboard/orders/OrderHistoryDetails";
import Reviews from "../pages/dashboard/reviews/Reviews";
import LogActivity from "../pages/dashboard/logActivity/LogActivity";
import NotFound from "../components/global/NotFound";


export const routes = [
    {
        path: '/store-panel',
        element: <App />,
        children: [
            {
                path: 'auth',
                element: <Auth />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'forget-password',
                        element: <ForgetPassword />
                    },
                    {
                        path: 'verify-code',
                        element: <VerifyCode />
                    },
                    {
                        path: 'reset-password',
                        element: <ResetPassword />
                    }
                ],
            },
            {
                path: '',
                element: <AutoGuard component={Dashboard} />,
                children: [
                    {
                        path: "",
                        element: <Home />
                    },
                    {
                        path: "products",
                        element: <Products />,
                        children: [
                            {
                                path: "",
                                element: <ProductList />,
                            },
                            {
                                path: ":id",
                                element: <ProductDetails />,
                            },
                            {
                                path: "editProduct/:id",
                                element: <EditProduct />,
                            },
                            {
                                path: "AddProduct",
                                element: <AddProduct />
                            }
                        ],
                    },
                    {
                        path: "orders",
                        element: <Orders />,
                        children: [
                            {
                                path: "",
                                element: <OrderList />,
                            },
                            {
                                path: ":id",
                                element: <OrderDetails />,
                            }
                        ],
                    },
                    {
                        path: "ordersHistory",
                        element: <OrdersHistory />,
                        children: [
                            {
                                path: "",
                                element: <OrderHistoryList />,
                            },
                            {
                                path: ":id",
                                element: <OrderHistoryDetails />,
                            }
                        ],
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "reviews",
                        element: <Reviews />,
                    },
                    {
                        path: "logActivities",
                        element: <LogActivity />,
                    },
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
];
