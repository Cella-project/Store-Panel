import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";
import GreenCard from "../../../components/common/GreenCard";
import ProductCard from "../../../components/products/ProductCard";
import OrderCard from "../../../components/orders/OrderCard";
import { productActions, orderActions, orderHistoryActions } from "../../../apis/actions";
import OrderBarChart from "../../../components/orders/OrderBarChart";
import OrderLineChart from "../../../components/orders/OrderLineChart";
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
  const mode = useSelector(state => state.theme.mode);

  useEffect(() => {
    document.title = 'Home • Store Panel';
    dispatch(productActions.getProducts(storeData._id));
    dispatch(orderActions.getOrder(storeData._id))
    dispatch(orderHistoryActions.getOrderHistory(storeData._id));
  }, [dispatch, storeData._id]);

  let cards = [
    { title: translations.sales, content: 0, icon: "bi bi-currency-dollar" },
    { title: translations.products, content: 0, icon: "bi bi-box-seam" },
    { title: translations.orderHistory, content: 0, icon: "bi bi-receipt" },
    { title: translations.pendingOrders, content: 0, icon: "bi bi-people" },
  ]

  if (products !== null && orderHistory !== null && order !== null) {
    const sales = order.filter(order => order.status === 'Delivered').reduce((total, order) => total + order.total, 0);

    cards = [
      { title: translations.sales, content: sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") },
      { title: translations.products, content: products.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-box-seam" },
      { title: translations.orderHistory, content: orderHistory.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-receipt" },
      { title: translations.pendingOrders, content: order.length.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), icon: "bi bi-people" },
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
            cards.map((card, index) => {
              return (
                <GreenCard title={card.title} key={index}>
                  <div className="full-width flex-row-center">
                    <p className="gray inter size-28px margin-12px-H text-shadow">{card.content}</p>
                    {card.title === translations.sales ? <p className={`size-30px ${mode === 'dark-mode' ? 'gray' : 'mint-green'} no-margin text-shadow inter`}>{translations.EGP}</p> :
                      <i className={`${card.icon} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-30px`} />
                    }
                  </div>
                </GreenCard>
              );
            })
          }

        </div>
        <div className="full-width flex-row2col">
          <div className="full-width flex-row-top-between2col">
            <OrderBarChart />
            <OrderLineChart />
          </div>
        </div>
        <div className="full-width flex-row2col home">
          <div className="full-width flex-row-top-between2col">
            <GreenCard title={translations.newProducts}>
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
              <Link to={`/store-panel/Products`} className="pointer lists-card--link">
                <i className={`bi bi-arrow-${language === 'ar' ? 'left' : 'right'} flex-row-right-start`}></i>
              </Link>
            </GreenCard>
            <GreenCard title={translations.orderHistory}>
              {orderHistory && orderHistory !== null ? (
                <PerfectScrollbar className="home--scroll--cont full-width flex-col-top-start">
                  {orderHistory.length === 0 ? <p className="gray inter size-16px">{translations.foundNoOrders}</p> :
                    orderHistory
                      .slice()
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .slice(0, 5)
                      .map((orderHistory) => (
                        <OrderCard key={orderHistory._id} order={orderHistory} type="history" />
                      ))}
                </PerfectScrollbar>
              ) : <Loading />
              }
              <Link to={`/store-panel/OrdersHistory`} className="pointer lists-card--link">
                <i className={`bi bi-arrow-${language === 'ar' ? 'left' : 'right'} flex-row-right-start`}></i>
              </Link>
            </GreenCard>
          </div>
        </div>
        {/* <GreenCard title={translations.reviews}>

        </GreenCard> */}
      </div >
    </div>
  );
}

export default Home;