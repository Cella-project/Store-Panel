import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import GreenCard from "../../../components/common/GreenCard";
import ProductCard from "../../../components/products/ProductCard";
import OrderCard from "../../../components/orders/OrderCard";
import { productActions, orderHistoryActions } from "../../../apis/actions";
import BarChart from "../../../components/common/BarChart";
import { useDispatch, useSelector } from "react-redux";
import languages from '../../../components/global/languages';
import Loading from "../../../components/global/Loading";

import './Home.scss';


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const order = useSelector((state) => state.order.orders);
  const orderHistory = useSelector((state) => state.orderHistory.ordersHistory);
  const language = useSelector(state => state.language.language);
  const translations = languages[language];
  const storeData = useSelector(state => state.auth.userData);

  useEffect(() => {
    document.title = 'Home • Store Panel';
    dispatch(productActions.getProducts(storeData._id));
    dispatch(orderHistoryActions.getOrderHistory(storeData._id));
  }, [dispatch, storeData._id]);

  let cards = [
    { title: 'Sales', content: 0, icon: "bi bi-currency-dollar" },
    { title: 'Products', content: 0, icon: "bi bi-box-seam" },
    { title: 'Orders History', content: 0, icon: "bi bi-receipt" },
    { title: 'Pending Orders', content: 0, icon: "bi bi-people" },
  ]

  if (products !== null && orderHistory !== null && order !== null) {
    const sales = order.reduce((total, order) => total + order.total, 0);

    cards = [
      { title: 'Sales', content: sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") },
      { title: 'Products', content: products.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-box-seam" },
      { title: 'Orders History', content: orderHistory.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-receipt" },
      { title: 'Pending Orders', content: order.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-people" },
    ]
  }

  return (
    <div className="home full-width" >
      <div className="home--braud-cramb inter gray size-16px font-bold">
        {translations.home}
      </div>
      <div className="full-width">
        <div className="full-width flex-row2col">
          {
            cards.map((card) => {
              return (
                <GreenCard title={card.title} key={Math.random().toString()}>
                  <div className="full-width flex-row-center">
                    <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                    {card.title === 'Sales' ? <p className="size-30px mint-green no-margin text-shadow inter">EGP</p> :
                      <i className={`${card.icon} mint-green size-30px`} />
                    }
                  </div>
                </GreenCard>
              );
            })
          }

        </div>
        <div className="full-width flex-row2col">
          <div className="full-width flex-row-top-between2col">
            <BarChart />
            <GreenCard title="Orders History">
              {orderHistory && orderHistory !== null ?
                <PerfectScrollbar className="home--scroll--cont full-width flex-col-top-start">
                  {orderHistory
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 5)
                    .map((orderHistory) => (
                      <OrderCard key={orderHistory._id} order={orderHistory} />
                    ))}
                </PerfectScrollbar> : <Loading />
              }
              <Link to={`/OrdersHistory`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </GreenCard>
          </div>
        </div>
        <div className="full-width flex-row2col home">
          <div className="full-width flex-row-top-between2col">
            <GreenCard title="New Products">
              {products && products !== null ?
                <PerfectScrollbar className="home--scroll--cont full-width flex-col-top-start">
                  {products
                    .slice()
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
                    .map((product) => (
                      <ProductCard key={product._id} productCard={product} />
                    ))
                  }
                </PerfectScrollbar>
                : <Loading />
              }
              <Link to={`/Products`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </GreenCard>
            <GreenCard title="Reviews">

            </GreenCard>
          </div>
        </div>
      </div >
    </div>
  );
}

export default Home;