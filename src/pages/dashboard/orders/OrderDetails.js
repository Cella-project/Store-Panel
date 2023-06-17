import React from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import GreenCard from "../../../components/common/GreenCard";
// import OrderInfo from "../../../components/orders/OrderInfo";
import OrderControl from "../../../components/orders/OrderControl";
// import VoucherCard from "../../../components/vouchers/VoucherCard";
// import ProductCard from "../../../components/products/ProductCard";
// import ListsCard from "../../../components/common/ListsCard";
// import StoreInfo from "../../../components/stores/StoreInfo";
// import DeliveryInfo from '../../../components/delivery/DeliveryInfo';
// import CustomerInfo from '../../../components/customers/CustomerInfo'

// import { storeCards } from "../stores/StoreList";
// import { productCards } from "../products/ProductList";
// import { voucherCards } from "../vouchers/Vouchers";
// import { orderCards } from "./OrderList";
// import { deliveryCards } from "../delivery/DeliveryList";
// import { customerCards } from "../customers/CustomerList";

import "./OrderDetails.scss";
const OrderDetails = () => {
  // const params = useParams();
  // const order = orderCards.find((order) => order.id === params.id);

  return (
    <div className="order-details--container full-width flex-col-left-start2col">
      <div className="flex-row-left-start2col order-details full-width">
        <div className="width-90-100 order-details">
          {/* <OrderInfo order={order} /> */}
        </div>
        <div className="flex-row-between order-details width-10-100">
          <OrderControl />
        </div>
      </div>
      <div className="order-details--card-cont flex-col-top-start full-width">
        <GreenCard title="Order History"></GreenCard>
      </div>
      <div className="flex-row-left-start2col order-details--control full-width">

        <div className="flex-col-center full-width">
          <div className="flex-col-left-start full-width">
            <div className="flex-row-left-start2col order-details--card-cont full-width">
              <GreenCard title="Store">
                {/* {
                  storeCards.map((store) => {
                    return (
                      store.name === order.store &&
                      <Link to={`/stores/${store.id}`} className="pointer lists-card--link">
                        <StoreInfo store={store} />
                      </Link>
                    );
                  })
                } */}
              </GreenCard>
              <GreenCard title="Customer">
                {/* {
                  customerCards.map((customer) => {
                    return (
                      customer.fullName === order.customerName &&
                      <Link to={`/customers/${customer.id}`} className="pointer lists-card--link">
                        <CustomerInfo customer={customer} />
                      </Link>
                    );
                  })
                } */}
              </GreenCard>
            </div>
            <div className="flex-row-left-start2col  order-details--card-cont full-width">
              <GreenCard title="Delivery">
                {/* {
                  deliveryCards.map((delivery) => {
                    return (
                      delivery.name === order.driver &&
                      <Link to={`/delivery/${delivery.id}`} className="pointer lists-card--link">
                        <DeliveryInfo delivery={delivery} />
                      </Link>

                    );
                  })
                } */}
              </GreenCard>
              <GreenCard title="Voucher">
                {/* {
                  voucherCards.map((voucher) => {
                    return (
                      voucher.id === order.voucher &&
                      <VoucherCard type={voucher.type}
                        status={voucher.status}
                        store={voucher.store}
                        value={voucher.value}
                        code={voucher.code}
                        img={voucher.img} />
                    );
                  })
                } */}
                <Link to={`/Vouchers`} className="pointer lists-card--link">
                  <i className="bi bi-arrow-right flex-row-right-start"></i>
                </Link>
              </GreenCard>
            </div>
          </div>
          <div className="flex-col-center order-details--card-cont full-width">
            <GreenCard title="Products">
              <PerfectScrollbar className="review-scroll--cont full-width">
                {/* {productCards
                  .filter((productCard) =>
                    order.product.includes(productCard.id)
                  )
                  .map((productCard) => {
                    return (
                      <ListsCard width="full-width">
                        <div
                          key={Math.random().toString()}
                          className="flex-row-left-start full-width"
                        >
                          <ProductCard
                            id={productCard.id}
                            img={productCard.img[0]}
                            description={productCard.description}
                            rate={productCard.rate}
                            specialty={productCard.specialty}
                            quantity={productCard.quantity}
                            oldPrice={productCard.oldPrice}
                            newPrice={productCard.newPrice}
                            imgWidth={"100px"}
                            width={"full-width"}
                          />
                        </div>
                      </ListsCard>
                    );
                  })} */}
              </PerfectScrollbar>
              <Link to={`/Products`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </GreenCard>

            <GreenCard title="Review">
              <PerfectScrollbar className="review-scroll--cont full-width"></PerfectScrollbar>
              <Link to={`/Reviews`} className="pointer lists-card--link">
                <i className="bi bi-arrow-right flex-row-right-start"></i>
              </Link>
            </GreenCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
